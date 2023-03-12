import * as THREE from 'three';
import { useEffect } from 'react';
import { Size, useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';

export default class CameraHandler {
  camera: THREE.Camera;
  aspect: number;
  neutralPosition: THREE.Vector3;
  neutralDistanceFromOrigin: number;
  lookAtPoint: THREE.Vector3;
  oldLookAtPoint: THREE.Vector3;

  constructor(camera: THREE.Camera, size: Size) {
    this.camera = camera;
    this.aspect = size.width / size.height;

    // Setting up default camera position and orientation
    this.neutralPosition = new THREE.Vector3(2.44, 6.46, 11.4);
    this.lookAtPoint = new THREE.Vector3(0, 0, 0);
    this.oldLookAtPoint = new THREE.Vector3(0, 0, 0);
    this.neutralDistanceFromOrigin = 5;
  }

  // Update neutral camera position and orientation to ensure that the whole scene is in view
  handleResize() {
    const multiplier = 13;
    // The vector that the default camera is from the origin with length 1
    const normalizedVector = new THREE.Vector3(0.183, 0.485, 0.855);

    // As the aspect ratio gets bigger, the camera needs to be moved closer to the origin
    this.neutralDistanceFromOrigin = Math.max(multiplier / this.aspect, 7);

    const newPosition = normalizedVector.multiplyScalar(
      this.neutralDistanceFromOrigin,
    );

    this.neutralPosition.set(newPosition.x, newPosition.y, newPosition.z);
    this.lookAtPoint.set(this.aspect * 0.2, 0, 0);
  }

  handleOrbit() {
    useFrame((state, delta) => {
      const { pointer } = state;

      const newPosition = this.neutralPosition.clone();
      const newLookAtPoint = this.lookAtPoint.clone();

      const multiplier = this.neutralDistanceFromOrigin * 0.1;
      // For pointerX
      const amountX = (pointer.x * 2 - Math.abs(pointer.x)) * 3 * multiplier;
      const amountZ =
        (Math.abs(pointer.x) * 18 - pointer.x) * 0.15 * multiplier;
      newPosition.x += amountX;
      newPosition.z -= amountZ;

      // For pointerY
      newPosition.y += pointer.y * multiplier * 2;
      newPosition.z -= Math.abs(pointer.y) * multiplier * 0.5;

      // Update look at point
      newLookAtPoint.x += pointer.x;

      this.camera.position.lerp(newPosition, delta * 3);

      // Update looking location
      this.camera.lookAt(this.oldLookAtPoint.lerp(newLookAtPoint, delta * 3));
    });
  }
}
