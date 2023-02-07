import { OrbitControls, Sky } from '@react-three/drei';
export default function Experience() {
  return (
    <>
      <OrbitControls />
      <Sky />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  );
}
