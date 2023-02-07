import LEDScreenVertexShader from './shaders/LEDScreen/vertex';
import LEDScreenFragmentShader from './shaders/LEDScreen/fragment';

export default function LEDScreen() {
  const width = 5;
  const height = 3;
  return (
    <group position={[0, 0, -5]}>
      <rectAreaLight
        rotation-y={Math.PI}
        width={width}
        height={height}
        intensity={20}
      />
      <mesh>
        <planeGeometry args={[width, height]} />
        <shaderMaterial
          vertexShader={LEDScreenVertexShader}
          fragmentShader={LEDScreenFragmentShader}
        />
      </mesh>
    </group>
  );
}
