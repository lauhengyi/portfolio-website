import {
  galaxyFragmentShader,
  galaxyVertexShader,
} from '../shaders/galaxyShaders';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhaseProgress from '../utils/getPhaseProgress';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { clamp } from 'three/src/math/MathUtils';

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.Mesh;
  };
};

export default function Galaxy() {
  const galaxyRef =
    useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);

  // Parameters
  const count = 5000;
  const branches = 4;
  const radius = 1.5;
  const colorPalette = ['#eab8ff', '#cac6f7', '#fcedbb'];
  const timeOffset = 40;
  const galaxyDuration = 10;
  const headDuration = 7;
  const transitionDuration = 3;

  const uniforms = {
    uTime: { value: 0 },
    uTimeOffset: { value: timeOffset },
    uSize: { value: 30 },
    uProgress: { value: 0 },
  };

  const geometry = new THREE.BufferGeometry();

  // Attributes
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const frequencies = new Float32Array(count * 3);
  const amplitudes = new Float32Array(count * 3);

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

    scales[i] = Math.random();
    frequencies.set([Math.random(), Math.random(), Math.random()], i3);
    amplitudes.set([Math.random(), Math.random(), Math.random()], i3);
  }

  /*
   * Creating head positions
   */
  // Import head
  const { nodes } = useGLTF('/models/head.glb') as GLTFResult;
  const headPositionAttribute = nodes.head.geometry.attributes
    .position as THREE.BufferAttribute;
  const headPoints = headPositionAttribute.array;

  const headPositions = new Float32Array(count * 3);
  const headSize = 10;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const headIndex = i3 % headPoints.length;
    const positionX = headPoints[headIndex] * headSize;
    const positionY = headPoints[headIndex + 1] * headSize;
    const positionZ = headPoints[headIndex + 2] * headSize;
    headPositions.set([positionX, positionY, positionZ], i3);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute(
    'aFrequency',
    new THREE.BufferAttribute(frequencies, 3),
  );
  geometry.setAttribute('aAmplitude', new THREE.BufferAttribute(amplitudes, 3));
  geometry.setAttribute(
    'aHeadPosition',
    new THREE.BufferAttribute(headPositions, 3),
  );

  const { spaceToGalaxy } = getPhaseProgress();

  let totalTime = 0;
  useFrame((_, delta) => {
    // Time speeds up as we zoom out to whole galaxy
    if (galaxyRef.current) {
      const uTime = galaxyRef.current?.material.uniforms.uTime;
      const uProgress = galaxyRef.current?.material.uniforms.uProgress;

      // Update time
      const timeSpeed = Math.pow(spaceToGalaxy.get(), 3);
      totalTime += delta * timeSpeed;
      uTime.value += delta * timeSpeed;

      // Animate cycle
      const cycleDuration =
        galaxyDuration + headDuration + transitionDuration * 2;
      const cycleTime = totalTime % cycleDuration;
      uProgress.value = clamp(uProgress.value, 0, 1);

      if (
        cycleTime > galaxyDuration &&
        cycleTime < galaxyDuration + transitionDuration
      ) {
        uProgress.value += (delta / transitionDuration) * timeSpeed;
      } else if (
        cycleTime >
        galaxyDuration + headDuration + transitionDuration
      ) {
        uProgress.value -= (delta / transitionDuration) * timeSpeed;
        uTime.value = 0;
      }
    }
  });

  return (
    <points
      ref={galaxyRef}
      geometry={geometry}
      scale={[100000, 100000, 100000]}
      position={[50000, -5000, 0]}
      rotation={[0, 0, 0]}
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

useGLTF.preload('/models/head.glb');
