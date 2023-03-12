import * as THREE from 'three';
import { useEffect } from 'react';
import { Size, useFrame } from '@react-three/fiber';

export default class CameraHandler {
  camera: THREE.Camera;
  aspect: number;
  neutralPosition: THREE.Vector3;
  neutralDistanceFromOrigin: number;
  lookAtPoint: THREE.Vector3;

  constructor(camera: THREE.Camera, size: Size) {
    this.camera = camera;
    this.aspect = size.width / size.height;

    // Setting up default camera position and orientation
    this.neutralPosition = new THREE.Vector3(2.44, 6.46, 11.4);
    this.lookAtPoint = new THREE.Vector3(0, 0, 0);
    this.neutralDistanceFromOrigin = 5;
  }

  // Update neutral camera position and orientation to ensure that the whole scene is in view
  handleResize() {
    const multiplier = 13;
    // The vector that the default camera is from the origin with length 1
    const normalizedVector = new THREE.Vector3(0.183, 0.485, 0.855);

    useEffect(() => {
      // As the aspect ratio gets bigger, the camera needs to be moved closer to the origin
      this.neutralDistanceFromOrigin = Math.max(multiplier / this.aspect, 7);

      const newPosition = normalizedVector.multiplyScalar(
        this.neutralDistanceFromOrigin,
      );
      this.neutralPosition.set(newPosition.x, newPosition.y, newPosition.z);
      this.lookAtPoint.set(this.aspect * 0.2, 0, 0);
    }, [this.aspect]);
  }

  handleOrbit() {
    useFrame((state, delta) => {
      const { pointer } = state;

      const newPosition = this.neutralPosition.clone();
      const newLookAtPoint = this.lookAtPoint.clone();

      // Update camera position
      const multiplier = this.neutralDistanceFromOrigin * 0.1;

      const amountX = (pointer.x * 6 - Math.abs(pointer.x)) * multiplier;
      const amountZ = (Math.abs(pointer.x) * 8 - pointer.x) * 0.5 * multiplier;

      newPosition.x += amountX;
      newPosition.z -= amountZ;
      newPosition.y += pointer.y * multiplier * 2;

      // Update look at point
      newLookAtPoint.x += pointer.x * 2;

      this.camera.position.lerp(newPosition, delta * 3);

      // Update looking location
      this.camera.lookAt(newLookAtPoint);
    });
  }
}
