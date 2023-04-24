import * as THREE from 'three';
import { Size, useFrame } from '@react-three/fiber';
import { QuadraticBezierCurve3 } from 'three';
import { useScroll, useTransform } from 'framer-motion';

export default class CameraHandler {
  camera: THREE.Camera;
  size: Size;
  aspect: number;
  pointer: { x: number; y: number };
  neutralDistanceFromOrigin: number;
  lookAtPoint: THREE.Vector3;
  oldLookAtPoint: THREE.Vector3;
  quadCurve: QuadraticBezierCurve3;

  constructor(camera: THREE.Camera, size: Size) {
    this.camera = camera;
    this.size = size;
    this.aspect = size.width / size.height;

    // Setting up default camera position and orientation
    this.pointer = { x: 0, y: 0 };
    this.lookAtPoint = new THREE.Vector3(0, 0, 0);
    this.oldLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.neutralDistanceFromOrigin = 5;
    this.quadCurve = new QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );
  }

  // Update neutral camera position and orientation to ensure that the whole scene is in view
  handleResize() {
    const multiplier = 13;
    // The vector that the default camera is from the origin with length 1
    const normCenter = new THREE.Vector3(0.183, 0.485, 1.5);
    const normRight = new THREE.Vector3(0.65, 0.2, 0.5);
    const normLeft = new THREE.Vector3(-normRight.x, normRight.y, normRight.z);

    // As the aspect ratio gets bigger, the camera needs to be moved closer to the origin
    this.neutralDistanceFromOrigin = Math.max(multiplier / this.aspect, 7);

    const center = normCenter.multiplyScalar(this.neutralDistanceFromOrigin);
    const right = normRight.multiplyScalar(this.neutralDistanceFromOrigin);
    const left = normLeft.multiplyScalar(this.neutralDistanceFromOrigin);

    this.quadCurve.v0 = left;
    this.quadCurve.v1 = center;
    this.quadCurve.v2 = right;

    // this.lookAtPoint.set(this.aspect * 0.2, 0, 0);
  }

  private handleLandingPhase(delta: number, position: number) {
    const newLookAtPoint = this.lookAtPoint.clone();

    const multiplier = this.neutralDistanceFromOrigin * 0.1;

    // For pointerX
    const newPosition = this.quadCurve.getPoint(this.pointer.x / 2 + 0.5);

    // For pointerY
    newPosition.y += this.pointer.y * multiplier * 2;
    newPosition.z -= Math.abs(this.pointer.y) * multiplier * 1;

    // Update look at point
    newLookAtPoint.x += this.pointer.x * 1.5;

    // Transition to sky
    const upAmount = multiplier * position * 10;
    const lookUpAmount = multiplier * position * 20;
    newPosition.y += upAmount;
    newLookAtPoint.y += lookUpAmount;

    // Update camera position
    this.camera.position.lerp(newPosition, delta * 3);

    // Update looking location
    this.camera.lookAt(this.oldLookAtPoint.lerp(newLookAtPoint, delta * 3));
  }

  handleCameraMove() {
    addEventListener('mousemove', (e) => {
      this.pointer.x = (e.clientX / this.size.width - 0.5) * 2;
      this.pointer.y = -(e.clientY / this.size.height - 0.5) * 2;
    });
    const { scrollY } = useScroll();
    const landingPhase = useTransform(scrollY, [0, 1500], [0, 1]);
    useFrame((_, delta) => {
      // This is to prevent delta from becoming enormous when useFrame is paused when client is on a different tab
      const clampDelta = Math.min(delta, 0.1);
      console.log(landingPhase.get());
      this.handleLandingPhase(clampDelta, landingPhase.get());
    });
  }
}
