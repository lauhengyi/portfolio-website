/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { RefObject, useEffect } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useTransform } from 'framer-motion';
import { useFrame } from '@react-three/fiber';

import resizeText from '../utils/resizeText';
import getPhaseProgress from '../utils/getPhaseProgress';

type GLTFResult = GLTF & {
  nodes: {
    my: THREE.Mesh;
    work: THREE.Mesh;
  };
};

export default function MyWorkText(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/models/myWork.glb') as GLTFResult;
  const textRef = React.useRef<THREE.Group>(null);
  const myRef = React.useRef<THREE.Mesh>(null);
  const workRef = React.useRef<THREE.Mesh>(null);

  useEffect(() => {
    resizeText(textRef);
    addEventListener('resize', () => {
      resizeText(textRef);
    });
  }, []);

  const { space } = getPhaseProgress();
  const myRotation = useTransform(space, [0, 1], [0, Math.PI * 0.5]);
  const workRotation = useTransform(space, [0, 1], [0, -Math.PI * 0.2]);
  const myInitPosition = new THREE.Vector3(0.28, 0, -0.34);
  const myFinalPosition = new THREE.Vector3(-1, 0, -2);
  const workInitPosition = new THREE.Vector3(1.24, 0, -0.32);
  const workFinalPosition = new THREE.Vector3(3, 0, -1);

  useFrame(() => {
    if (myRef.current === null || workRef.current === null) return;
    myRef.current.rotation.y = myRotation.get();
    workRef.current.rotation.y = workRotation.get();
    myRef.current.position.lerpVectors(
      myInitPosition,
      myFinalPosition,
      space.get(),
    );
    workRef.current.position.lerpVectors(
      workInitPosition,
      workFinalPosition,
      space.get(),
    );
  });

  return (
    <Center
      ref={textRef}
      position={[0, 0, -50]}
      rotation-x={Math.PI * 0.5}
      scale={20}
    >
      <group {...props} dispose={null}>
        <mesh
          ref={myRef}
          geometry={nodes.my.geometry}
          position={myInitPosition}
        >
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh
          ref={workRef}
          geometry={nodes.work.geometry}
          position={workInitPosition}
        >
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </Center>
  );
}

useGLTF.preload('/models/myWork.glb');