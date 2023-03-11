import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function handleResize() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const aspect = size.width / size.height;

  const multiplier = 13;
  // The vector that the default camera is from the origin with length 1
  const normalizedVector = new THREE.Vector3(0.183, 0.485, 0.855);

  useEffect(() => {
    // As the aspect ratio gets bigger, the camera needs to be moved closer to the origin
    const scaleAmount = Math.max(multiplier / aspect, 7);

    const newPosition = normalizedVector.multiplyScalar(scaleAmount);
    camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    camera.lookAt(0.3, 0, 0);
  }, [aspect]);
}
