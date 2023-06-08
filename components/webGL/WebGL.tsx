import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Perf } from 'r3f-perf';

export default function WebGL() {
  return (
    <Canvas
      camera={{
        fov: 45,
        far: 1000000,
      }}
      flat
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        background: 'black',
      }}
    >
      {/* <Perf position={'bottom-right'} /> */}
      <Experience />
    </Canvas>
  );
}
