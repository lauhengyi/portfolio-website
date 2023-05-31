import {
  OrbitControls,
  Plane,
  Sky,
  Stars,
  Text,
  useProgress,
} from '@react-three/drei';
import { useEffect, useRef } from 'react';
import CameraHandler from './handlers/CameraHandler';
import VisibilityHandler from './handlers/VisibilityHandler';
import LandPhase from './LandPhase';
import SkyPhase from './SkyPhase';
import TempSky from './TempSky';
import FogHandler from './handlers/FogHandler';
import SpacePhase from './SpacePhase';
import GalaxyPhase from './GalaxyPhase';
import LoadingOverlay from './LoadingOverlay';

export default function Experience() {
  const fogRef = useRef<THREE.Fog>(null!);
  const skyBackgroundRef = useRef<THREE.Group>(null!);
  const landRef = useRef<THREE.Group>(null!);
  const skyRef = useRef<THREE.Group>(null!);
  const tempSkyRef = useRef<THREE.Sprite>(null!);
  const spaceRef = useRef<THREE.Group>(null!);
  const galaxyRef = useRef<THREE.Group>(null!);

  const sceneRefs = {
    skyBackground: skyBackgroundRef,
    land: landRef,
    sky: skyRef,
    tempSky: tempSkyRef,
    space: spaceRef,
    galaxy: galaxyRef,
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
      <LoadingOverlay />
      <fog ref={fogRef} attach={'fog'} near={30} far={50} color="#f3fdff" />
      <Sky ref={skyBackgroundRef} sunPosition={[10, 5, 10]} rayleigh={1.5} />
      <LandPhase ref={landRef} />
      <SkyPhase ref={skyRef} />
      <TempSky ref={tempSkyRef} />
      <SpacePhase ref={spaceRef} />
      <GalaxyPhase ref={galaxyRef} />
    </>
  );
}
