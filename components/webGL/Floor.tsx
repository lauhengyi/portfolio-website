export default function Floor() {
  return (
    <mesh rotation-x={-Math.PI * 0.5} position-y={-0.01}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={'#c7d774'} />
    </mesh>
  );
}
