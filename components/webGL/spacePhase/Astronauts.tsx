/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.SkinnedMesh;
    bones: THREE.Bone;
  };
  materials: {
    ['AstroMat.002']: THREE.MeshStandardMaterial;
  };
};

export default function Astronaut(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const skinnedMesh = useRef<THREE.SkinnedMesh>(null);
  const { nodes, animations } = useGLTF('/models/astronaut.glb') as GLTFResult;
  const astronautTexture = useTexture('/textures/astronaut.jpg');
  astronautTexture.flipY = false;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[
      'Armature|Armature|Armature|Armature|Armature|mixamo.com|Lay'
    ]?.play();
  }, []);
  return (
    <group position={[0, -2, -20]} rotation={[0.3, 0, 0]}>
      <group ref={group} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.bones} />
        <skinnedMesh
          ref={skinnedMesh}
          geometry={nodes.body.geometry}
          skeleton={nodes.body.skeleton}
        >
          <meshStandardMaterial map={astronautTexture} />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/astronaut.glb');