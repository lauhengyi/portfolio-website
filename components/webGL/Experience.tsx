import { OrbitControls, Sky } from '@react-three/drei';
import Floor from './Floor';
import Name3D from './Name3D';
import CameraHandler from './handlers/CameraHandler';
import { useThree } from '@react-three/fiber';
import Cars from './Cars';

export default function Experience() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const cameraHandler = new CameraHandler(camera, size);

  cameraHandler.handleResize();
  cameraHandler.handleOrbit();

  return (
    <>
      {/* <OrbitControls /> */}
      <Sky />
      <Name3D />
      <Cars />
      <Floor />
    </>
  );
}
