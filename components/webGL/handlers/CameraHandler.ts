import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierCurve3 } from 'three';
import getPhaseProgress from '../utils/getPhaseProgress';

export default class CameraHandler {
  // Camera position variables
  aspect: number;
  pointer: { x: number; y: number };
  oldLookAtPoint: THREE.Vector3;
  cameraPosition: THREE.Vector3;
  cameraLookAtPoint: THREE.Vector3;

  // Land variables
  landNeutralLookAtPoint: THREE.Vector3;
  landPosition: THREE.Vector3;
  landLookAtPoint: THREE.Vector3;
  landNeutalDistFromOrigin: number;
  landQuadCurve: QuadraticBezierCurve3;

  // Sky variables
  skyNeutralPosition: THREE.Vector3;
  skyNeutralLookAtPoint: THREE.Vector3;
  skyPosition: THREE.Vector3;
  skyLookAtPoint: THREE.Vector3;

  // Space transition variables
  spacePosition1: THREE.Vector3;
  spaceLookAtPoint1: THREE.Vector3;
  spacePosition2: THREE.Vector3;
  spaceLookAtPoint2: THREE.Vector3;

  // Space variables
  spaceNeutralPosition: THREE.Vector3;
  spaceNeutralLookAtPoint: THREE.Vector3;
  spacePosition: THREE.Vector3;
  spaceLookAtPoint: THREE.Vector3;

  constructor() {
    // Setting up camera position variables
    this.aspect = window.innerWidth / window.innerHeight;
    this.pointer = { x: 0, y: 0 };
    this.cameraPosition = new THREE.Vector3(0, 0, 0);
    this.cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.oldLookAtPoint = new THREE.Vector3(0, 0, 0);

    // Setting up land variables
    this.landNeutralLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.landPosition = new THREE.Vector3(0, 0, 0);
    this.landLookAtPoint = this.landNeutralLookAtPoint.clone();
    this.landNeutalDistFromOrigin = 5;
    this.landQuadCurve = new QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );

    // Setting up sky variables
    this.skyNeutralPosition = new THREE.Vector3(0, 30, 15);
    this.skyNeutralLookAtPoint = new THREE.Vector3(0, 35, -30);
    this.skyPosition = this.skyNeutralPosition.clone();
    this.skyLookAtPoint = this.skyNeutralLookAtPoint.clone();

    // Setting up Space transition variables
    this.spacePosition1 = new THREE.Vector3(0, 60, 15);
    this.spaceLookAtPoint1 = new THREE.Vector3(0, 90, 14);
    this.spacePosition2 = new THREE.Vector3(0, -15, 0);
    this.spaceLookAtPoint2 = new THREE.Vector3(0, -30, -10);

    // Setting up space variables
    this.spaceNeutralPosition = new THREE.Vector3(0, 0, 0);
    this.spaceNeutralLookAtPoint = new THREE.Vector3(0, 0, -10);
    this.spacePosition = this.spaceNeutralPosition.clone();
    this.spaceLookAtPoint = this.spaceNeutralLookAtPoint.clone();
  }

  // Update neutral camera position and orientation to ensure that the whole scene is in view
  private handleResize() {
    const multiplier = 13;
    // The vector that the default camera is from the origin with length 1
    const normCenter = new THREE.Vector3(0.183, 0.485, 1.5);
    const normRight = new THREE.Vector3(0.65, 0.2, 0.5);
    const normLeft = new THREE.Vector3(-normRight.x, normRight.y, normRight.z);

    // As the aspect ratio gets bigger, the camera needs to be moved closer to the origin
    this.aspect = window.innerWidth / window.innerHeight;
    this.landNeutalDistFromOrigin = Math.max(multiplier / this.aspect, 7);

    const center = normCenter.multiplyScalar(this.landNeutalDistFromOrigin);
    const right = normRight.multiplyScalar(this.landNeutalDistFromOrigin);
    const left = normLeft.multiplyScalar(this.landNeutalDistFromOrigin);

    this.landQuadCurve.v0 = left;
    this.landQuadCurve.v1 = center;
    this.landQuadCurve.v2 = right;
  }

  private handleLandPhase() {
    const newLookAtPoint = this.landNeutralLookAtPoint.clone();

    const multiplier = this.landNeutalDistFromOrigin * 0.1;

    // For pointerX
    const newPosition = this.landQuadCurve.getPoint(this.pointer.x / 2 + 0.5);

    // For pointerY
    newPosition.y += this.pointer.y * multiplier * 2;
    newPosition.z -= Math.abs(this.pointer.y) * multiplier * 1;

    // Update look at point
    newLookAtPoint.x += this.pointer.x * 1.5;

    this.landPosition.set(newPosition.x, newPosition.y, newPosition.z);
    this.landLookAtPoint.set(
      newLookAtPoint.x,
      newLookAtPoint.y,
      newLookAtPoint.z,
    );
  }

  private handleSkyPhase(progress: number) {
    const newPosition = this.skyNeutralPosition.clone();

    const multiplier = 5;

    // For pointerX
    newPosition.x += this.pointer.x * multiplier;
    // For pointerY
    newPosition.y += this.pointer.y * multiplier;

    // Slowly pan up based on progress
    newPosition.y += progress * 8 * Math.min(this.aspect, 1.8);

    this.skyPosition.set(newPosition.x, newPosition.y, newPosition.z);
  }

  private handleSpaceTransition(progress: number, camera: THREE.Camera) {
    const points = [0.5, 0.55, 0.6, 1];
    if (progress < points[0]) {
      // Move camera upwards to tempSky
      const mix = progress / points[0];
      this.updateCameraVariables(
        this.skyPosition,
        this.skyLookAtPoint,
        this.spacePosition1,
        this.spaceLookAtPoint1,
        mix,
      );
    } else if (progress < points[1]) {
      // Lock camera to first space position
      this.cameraPosition.copy(this.spacePosition1);
      this.cameraLookAtPoint.copy(this.spaceLookAtPoint1);
      this.oldLookAtPoint.copy(this.spaceLookAtPoint1);
      camera.position.copy(this.spacePosition1);
      camera.lookAt(this.spaceLookAtPoint1);
    } else if (progress < points[2]) {
      // lock camera to second space position
      this.cameraPosition.copy(this.spacePosition2);
      this.cameraLookAtPoint.copy(this.spaceLookAtPoint2);
      this.oldLookAtPoint.copy(this.spaceLookAtPoint2);
      camera.position.copy(this.spacePosition2);
      camera.lookAt(this.spaceLookAtPoint2);
    } else {
      const mix = (progress - points[2]) / (points[3] - points[2]);
      this.updateCameraVariables(
        this.spacePosition2,
        this.spaceLookAtPoint2,
        this.spacePosition,
        this.spaceLookAtPoint,
        mix,
      );
    }
  }

  private handleSpacePhase(progress: number) {}

  private mixCameraPositionVariables(
    target: THREE.Vector3,
    start: THREE.Vector3,
    end: THREE.Vector3,
    mix: number,
  ) {
    target.set(
      start.x * (1 - mix) + end.x * mix,
      start.y * (1 - mix) + end.y * mix,
      start.z * (1 - mix) + end.z * mix,
    );
  }

  private updateCameraVariables(
    startPosition: THREE.Vector3,
    startLookAt: THREE.Vector3,
    endPosition: THREE.Vector3,
    endLookAt: THREE.Vector3,
    mix: number,
  ) {
    this.mixCameraPositionVariables(
      this.cameraPosition,
      startPosition,
      endPosition,
      mix,
    );
    this.mixCameraPositionVariables(
      this.cameraLookAtPoint,
      startLookAt,
      endLookAt,
      mix,
    );
  }

  handleCameraMove() {
    // Initialize camera position
    this.handleResize();

    addEventListener('mousemove', (e) => {
      this.pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    addEventListener('resize', () => {
      this.handleResize();
    });

    const { landToSky, sky, skyToSpace, space } = getPhaseProgress();

    useFrame(({ camera }, delta) => {
      // This is to prevent delta from becoming enormous when useFrame is paused when client is on a different tab
      const clampDelta = Math.min(delta, 0.1);

      if (sky.get() === 0) {
        // When transitioning from land to sky
        this.handleLandPhase();
        this.handleSkyPhase(sky.get());

        const mix = landToSky.get();
        this.updateCameraVariables(
          this.landPosition,
          this.landLookAtPoint,
          this.skyPosition,
          this.skyLookAtPoint,
          mix,
        );
      } else if (skyToSpace.get() === 0) {
        // When just in sky
        this.handleSkyPhase(sky.get());
        // Handle sky
        this.cameraPosition.copy(this.skyPosition);
        this.cameraLookAtPoint.copy(this.skyLookAtPoint);
      } else if (space.get() === 0) {
        // When transitioning from sky to space
        this.handleSkyPhase(sky.get());
        this.handleSpacePhase(space.get());
        this.handleSpaceTransition(skyToSpace.get(), camera);
      }

      // Update camera position
      camera.position.lerp(this.cameraPosition, clampDelta * 3);

      // Update looking location
      camera.lookAt(
        this.oldLookAtPoint.lerp(this.cameraLookAtPoint, clampDelta * 3),
      );
    });
  }
}
