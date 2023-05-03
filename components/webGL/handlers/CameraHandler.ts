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
  landPosition: THREE.Vector3;
  landLookAtPoint: THREE.Vector3;
  landNeutralLookAtPoint: THREE.Vector3;
  landNeutalDistFromOrigin: number;
  landQuadCurve: QuadraticBezierCurve3;

  // Sky variables
  skyPosition: THREE.Vector3;
  skyLookAtPoint: THREE.Vector3;
  skyNeutralPosition: THREE.Vector3;
  skyNeutralLookAtPoint: THREE.Vector3;

  constructor() {
    // Setting up camera position variables
    this.aspect = window.innerWidth / window.innerHeight;
    this.pointer = { x: 0, y: 0 };
    this.cameraPosition = new THREE.Vector3(0, 0, 0);
    this.cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.oldLookAtPoint = new THREE.Vector3(0, 0, 0);

    // Setting up land variables
    this.landPosition = new THREE.Vector3(0, 0, 0);
    this.landLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.landNeutralLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.landNeutalDistFromOrigin = 5;
    this.landQuadCurve = new QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );

    // Setting up sky variables
    this.skyPosition = new THREE.Vector3(0, 30, 15);
    this.skyLookAtPoint = new THREE.Vector3(0, 35, -30);
    this.skyNeutralPosition = new THREE.Vector3(0, 30, 15);
    this.skyNeutralLookAtPoint = new THREE.Vector3(0, 35, -30);
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

    const phases = getPhaseProgress();

    useFrame(({ camera }, delta) => {
      // This is to prevent delta from becoming enormous when useFrame is paused when client is on a different tab
      const clampDelta = Math.min(delta, 0.1);
      this.handleLandPhase();
      this.handleSkyPhase(phases.sky.get());

      const mix = phases.landToSky.get();

      this.updateCameraVariables(
        this.landPosition,
        this.landLookAtPoint,
        this.skyPosition,
        this.skyLookAtPoint,
        mix,
      );

      // Update camera position
      camera.position.lerp(this.cameraPosition, clampDelta * 3);

      // Update looking location
      camera.lookAt(
        this.oldLookAtPoint.lerp(this.cameraLookAtPoint, clampDelta * 3),
      );
    });
  }
}
