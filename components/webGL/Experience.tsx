import { OrbitControls, Sky } from '@react-three/drei';
import Floor from './Floor';
import handleResize from './handleResize';
import handleOrbit from './handleOrbit';
import Name3D from './Name3D';
import CameraHandler from './handlers/CameraHandler';
import { useThree } from '@react-three/fiber';

export default function Experience() {
  // handleResize();
  // handleOrbit();
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const cameraHandler = new CameraHandler(camera, size);

  cameraHandler.handleResize();
  cameraHandler.handleOrbit();

  return (
    <>
      {/* <OrbitConstrols /> */}
      <Sky />
      <Name3D />
      <Floor />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'blue'} />
      </mesh>
    </>
  );
}
