import { useFrame } from '@react-three/fiber';
import getPhaseProgress from '../utils/getPhaseProgress';
import { useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

export default function TempSky() {
  const tempSkyRef = useRef<THREE.Sprite>(null!);
  const { skyToSpace } = getPhaseProgress();
  const opacity = useSpring(
    useTransform(skyToSpace, [0.4, 0.7, 0.9, 1], [0, 1, 1, 0]),
    {
      bounce: 0,
    },
  );
  const vector = new THREE.Vector3();
  useFrame(({ camera }) => {
    camera.getWorldDirection(vector);
    tempSkyRef.current.material.opacity = opacity.get();
    tempSkyRef.current.position.set(
      camera.position.x + vector.x * 2,
      camera.position.y + vector.y * 2,
      camera.position.z + vector.z * 2,
    );
  });

  return (
    <>
      <sprite ref={tempSkyRef} scale={[50, 30, 1]}>
        <spriteMaterial color={'#A7D1F6'} transparent />
      </sprite>
    </>
  );
}
