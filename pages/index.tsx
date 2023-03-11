import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import Experience from '../components/webGL/Experience';
import styles from '../styles/Home.module.css';
import { Perf } from 'r3f-perf';
import handleOrbit from '../components/webGL/handleOrbit';
import * as THREE from 'three';

const Home: NextPage = () => {
  return (
    <Canvas
      onPointerMove={handleOrbit}
      camera={{
        fov: 45,
        position: [1.39, 3.69, 6.51],
        rotation: [-0.516, 0.144, 0.081],
      }}
      flat
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Perf position={'top-right'} />
      <Experience />
    </Canvas>
  );
};

export default Home;
