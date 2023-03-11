export default function Floor() {
  return (
    <mesh rotation-x={-Math.PI * 0.5} position-y={-0.01}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={'#afce59'} />
    </mesh>
  );
}
