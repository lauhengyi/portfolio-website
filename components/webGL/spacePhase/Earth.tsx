import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  atmosFragmentShader,
  atmosVertexShader,
} from '../shaders/atmosphereShaders';
import * as THREE from 'three';
import getPhaseProgress from '../../utils/getPhaseProgress';

export default function Earth() {
  const earthTexture = useTexture('/textures/earth.jpg');
  const cloudTexture = useTexture('/textures/clouds.jpg');
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef =
    useRef<THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>>(null);

  const uniforms = useMemo(() => ({ progress: { value: 0.0 } }), []);

  const { space } = getPhaseProgress();
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01 * delta;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.015 * delta;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.material.uniforms.progress.value = space.get();
    }
  });
  return (
    <group position={[0, -800, -600]} rotation={[-0.4, 2.5, 0]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[500, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[510, 32, 32]} />
        <meshStandardMaterial transparent alphaMap={cloudTexture} />
      </mesh>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[550, 32, 32]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={atmosVertexShader}
          fragmentShader={atmosFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
