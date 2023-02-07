import { OrbitControls, Text3D, Center } from '@react-three/drei';
import LEDScreen from './LEDScreen';

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <color attach="background" args={['black']} />
      {/* <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <ambientLight intensity={0.3} /> */}
      <LEDScreen />
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Center position={[0, 0, 0]}>
        <Text3D font={'./Bebas_Neue_Regular.json'} castShadow>
          HELLO world
          <meshStandardMaterial color="blue" />
        </Text3D>
      </Center>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}
