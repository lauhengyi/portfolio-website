import { Environment, OrbitControls, Sky } from '@react-three/drei';
import CameraHandler from './handlers/CameraHandler';
import { useThree } from '@react-three/fiber';
import LandingPhase from './LandingPhase';

export default function Experience() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const cameraHandler = new CameraHandler(camera, size);

  cameraHandler.handleResize();
  cameraHandler.handleCameraMove();

  return (
    <>
      {/* <OrbitControls /> */}
      <Sky sunPosition={[10, 5, 10]} rayleigh={1.5} />
      <LandingPhase />
    </>
  );
}
