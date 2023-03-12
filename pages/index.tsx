import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import Experience from '../components/webGL/Experience';
import styles from '../styles/Home.module.css';
import { Perf } from 'r3f-perf';

const Home: NextPage = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
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
