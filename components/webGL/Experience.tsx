import { OrbitControls, Sky } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import CameraHandler from './handlers/CameraHandler';
import VisibilityHandler from './handlers/VisibilityHandler';
import { useThree } from '@react-three/fiber';
import LandingPhase from './LandingPhase';
import Clouds from './Clouds';

export default function Experience() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const landingRef = useRef<THREE.Group>(null!);
  const sceneRefs = {
    landing: landingRef,
  };

  const cameraHandler = new CameraHandler(camera, size);
  const visibilityHandler = new VisibilityHandler(sceneRefs);

  cameraHandler.handleResize();
  cameraHandler.handleCameraMove();

  visibilityHandler.handleVisibility();

  return (
    <>
      <Sky sunPosition={[10, 5, 10]} rayleigh={1.5} />
      <LandingPhase ref={landingRef} />
      <Clouds />
    </>
  );
}
