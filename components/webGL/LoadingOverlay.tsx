import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useMotionValue, animate, cubicBezier } from 'framer-motion';
import {
  loadingOverlayVertexShader,
  loadingOverlayFragmentShader,
} from './shaders/loadingOverlayShaders';
import useLoad from '../utils/useLoad';

const LoadingOverlay = () => {
  const ref = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(
    null!,
  );
  const { isLoad } = useLoad();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#e4e3d0').convertLinearToSRGB() },
      uProgress: { value: 0 },
      uAspect: { value: window.innerWidth / window.innerHeight },
    }),
    [],
  );

  // Resizing
  useEffect(() => {
    const handleResize = () => {
      uniforms.uAspect.value = window.innerWidth / window.innerHeight;
      ref.current.material.needsUpdate = true;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progress = useMotionValue(0);
  useEffect(() => {
    if (!isLoad) return;
    const controls = animate(progress, [0, 0.25, 1], {
      times: [0, 0.2, 1],
      delay: 1,
      duration: 5,
      ease: cubicBezier(0.25, 1, 0.3, 1),
      onUpdate: (v) => {
        ref.current.material.uniforms.uProgress.value = v;
        ref.current.material.needsUpdate = true;
        ref.current.material.uniformsNeedUpdate = true;
      },
      onComplete: () => {
        ref.current.visible = false;
      },
    });

    return controls.stop;
  }, [isLoad]);

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
