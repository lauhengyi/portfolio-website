import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import Experience from '../components/webGL/Experience';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      shadows
    >
      <Experience />
    </Canvas>
  );
};

export default Home;
