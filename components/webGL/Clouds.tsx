import { useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { cloudVertexShader, cloudFragmentShader } from './shaders/cloudShaders';
import * as THREE from 'three';

export default function Clouds() {
  const cloudsRef = useRef<THREE.InstancedMesh>(null!);
  const texture = useTexture('/cloud10.png');
  var fog = new THREE.Fog(0x4584b4, -100, 3000);

  const uniforms = {
    map: { value: texture },
    fogColor: { value: fog.color },
    fogNear: { value: fog.near },
    fogFar: { value: fog.far },
  };

  const count = 100;

  useEffect(() => {
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = Math.random() * 10 - 5;
      const y = -Math.random() * Math.random() * 20 - 1.5;
      const z = i / 10;
      const rot = Math.random() * Math.PI;
      const scale = Math.random() * Math.random() * 1.5 + 0.5;

      dummy.position.set(x, y, z);
      dummy.rotation.z = rot;
      dummy.scale.set(scale, scale, 1);
      dummy.updateMatrix();
      cloudsRef.current.setMatrixAt(i, dummy.matrix);
    }
  }, []);

  return (
    <instancedMesh ref={cloudsRef} args={[undefined, undefined, count]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={cloudVertexShader}
        fragmentShader={cloudFragmentShader}
        depthWrite={false}
        depthTest={false}
        transparent
      />
      <planeGeometry args={[6.4, 6.4]} />
    </instancedMesh>
  );
}