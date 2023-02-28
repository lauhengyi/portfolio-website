import { OrbitControls, Sky } from '@react-three/drei';
import Name3D from './Name3D';
export default function Experience() {
  return (
    <>
      <OrbitControls />
      <Sky />
      <Name3D />
    </>
  );
}
