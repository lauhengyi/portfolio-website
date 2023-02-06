import { OrbitControls } from '@react-three/drei';

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  );
}
