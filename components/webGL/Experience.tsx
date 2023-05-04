import { OrbitControls, Sky, Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import CameraHandler from './handlers/CameraHandler';
import VisibilityHandler from './handlers/VisibilityHandler';
import LandPhase from './LandPhase';
import SkyPhase from './SkyPhase';
import Clouds from './Clouds';
import FogHandler from './handlers/FogHandler';

export default function Experience() {
  const fogRef = useRef<THREE.Fog>(null!);
  const landRef = useRef<THREE.Group>(null!);
  const skyRef = useRef<THREE.Group>(null!);
  const sceneRefs = {
    land: landRef,
  };

  const cameraHandler = new CameraHandler();
  const visibilityHandler = new VisibilityHandler(sceneRefs);
  const fogHandler = new FogHandler(fogRef);

  cameraHandler.handleCameraMove();
  visibilityHandler.handleVisibility();
  fogHandler.handleFog();

  return (
    <>
      {/* <OrbitControls /> */}
      <fog ref={fogRef} attach={'fog'} near={30} far={50} color="#f3fdff" />
      <Sky sunPosition={[10, 5, 10]} rayleigh={1.5} />
      <LandPhase ref={landRef} />
      <Clouds />
      <SkyPhase ref={skyRef} />
    </>
  );
}
