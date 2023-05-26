import {
  galaxyFragmentShader,
  galaxyVertexShader,
} from '../shaders/galaxyShaders';
import * as THREE from 'three';

export default function Galaxy() {
  const count = 5000;
  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: 30.0 },
  };

  const geometry = new THREE.BufferGeometry();

  // Attributes
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scale = new Float32Array(count);

  // Populate attributes
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const randomX = (Math.random() - 0.5) * 100000;
    const randomY = (Math.random() - 0.5) * 100000;
    const randomZ = (Math.random() - 0.5) * 100000;

    positions.set([randomX, randomY, randomZ], i3);

    const color = new THREE.Color('#00ff00');
    colors.set([color.r, color.g, color.b], i3);

    scale[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));

  return (
    <points geometry={geometry}>
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
