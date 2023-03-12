import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function handleOrbit() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
  });
}
