import {
  galaxyFragmentShader,
  galaxyVertexShader,
} from '../shaders/galaxyShaders';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhaseProgress from '../utils/getPhaseProgress';

export default function Galaxy() {
  const galaxyRef =
    useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const uniforms = {
    uTime: { value: 50 },
    uSize: { value: 30.0 },
    uOrigin: { value: new THREE.Vector3(50000, -5000, 0) },
  };

  // Parameters
  const count = 5000;
  const branches = 4;
  const radius = 1.5;
  const colorPalette = ['#eab8ff', '#cac6f7', '#fcedbb'];

  const geometry = new THREE.BufferGeometry();

  // Attributes
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const frequency = new Float32Array(count * 3);
  const amplitude = new Float32Array(count * 3);

  // Populate attributes
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const originDist = Math.random() * radius;

    const randomX = (Math.random() - 0.5) * originDist * 0.6;
    const randomY =
      Math.pow(Math.random(), 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      originDist *
      0.3;
    const randomZ = (Math.random() - 0.5) * originDist * 0.6;
    const positionX = Math.cos(branchAngle) * originDist + randomX;
    const positionY = randomY;
    const positionZ = Math.sin(branchAngle) * originDist + randomZ;

    positions.set([positionX, positionY, positionZ], i3);

    const color = new THREE.Color(colorPalette[Math.floor(Math.random() * 3)]);
    colors.set([color.r, color.g, color.b], i3);

    scale[i] = Math.random();
    frequency.set([Math.random(), Math.random(), Math.random()], i3);
    amplitude.set([Math.random(), Math.random(), Math.random()], i3);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
  geometry.setAttribute('aFrequency', new THREE.BufferAttribute(frequency, 3));
  geometry.setAttribute('aAmplitude', new THREE.BufferAttribute(amplitude, 3));

  const { spaceToGalaxy } = getPhaseProgress();
  useFrame((_, delta) => {
    // Time speeds up as we zoom out to whole galaxy
    if (galaxyRef.current) {
      galaxyRef.current.material.uniforms.uTime.value +=
        delta * Math.pow(spaceToGalaxy.get(), 3);
    }
  });

  return (
    <points
      ref={galaxyRef}
      geometry={geometry}
      scale={[100000, 100000, 100000]}
      position={uniforms.uOrigin.value}
    >
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={galaxyVertexShader}
        fragmentShader={galaxyFragmentShader}
        depthWrite={false}
        // depthTest={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}
