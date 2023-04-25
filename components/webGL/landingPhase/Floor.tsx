export default function Floor() {
  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, -0.01, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={'#c7d774'} />
    </mesh>
  );
}
