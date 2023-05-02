import { OrbitControls, Sky, Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import CameraHandler from './handlers/CameraHandler';
import VisibilityHandler from './handlers/VisibilityHandler';
import LandPhase from './LandPhase';
import SkyPhase from './SkyPhase';
import Clouds from './Clouds';

export default function Experience() {
  const landRef = useRef<THREE.Group>(null!);
  const skyRef = useRef<THREE.Group>(null!);
  const sceneRefs = {
    land: landRef,
  };

  const cameraHandler = new CameraHandler();
  const visibilityHandler = new VisibilityHandler(sceneRefs);

  cameraHandler.handleCameraMove();

  visibilityHandler.handleVisibility();

  return (
    <>
      <Sky sunPosition={[10, 5, 10]} rayleigh={1.5} />
      <LandPhase ref={landRef} />
      <Clouds />
      <SkyPhase ref={skyRef} />
      {/* <Text
        fontSize={10}
        position={[0, 32, -30]}
        fillOpacity={0.6}
        color={'#CFE6F1'}
      >
        About
      </Text> */}
    </>
  );
}
