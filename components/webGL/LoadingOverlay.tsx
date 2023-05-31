import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  loadingOverlayVertexShader,
  loadingOverlayFragmentShader,
} from './shaders/loadingOverlayShaders';

const LoadingOverlay = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const uniforms = {
    uColor: { value: new THREE.Color('#e4e3d0').convertLinearToSRGB() },
    uProgress: { value: 0 },
    uAspect: { value: window.innerWidth / window.innerHeight },
  };

  useEffect(() => {
    const handleResize = () => {
      uniforms.uAspect.value = window.innerWidth / window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <mesh ref={ref} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={loadingOverlayVertexShader}
        fragmentShader={loadingOverlayFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export default LoadingOverlay;
