import { OrbitControls, Sky } from '@react-three/drei';
import Floor from './Floor';
import handleResize from './handleResize';
import Name3D from './Name3D';
export default function Experience() {
  handleResize();
  return (
    <>
      {/* <OrbitControls /> */}
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
