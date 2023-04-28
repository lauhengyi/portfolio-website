import { OrbitControls, Sky } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import CameraHandler from './handlers/CameraHandler';
import VisibilityHandler from './handlers/VisibilityHandler';
import LandingPhase from './LandingPhase';
import Clouds from './Clouds';

export default function Experience() {
  const landingRef = useRef<THREE.Group>(null!);
  const sceneRefs = {
    landing: landingRef,
  };

  const cameraHandler = new CameraHandler();
  const visibilityHandler = new VisibilityHandler(sceneRefs);

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
