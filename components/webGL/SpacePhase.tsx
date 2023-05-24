import { forwardRef } from 'react';
import { Stars } from '@react-three/drei';
import MyWorkText from './spacePhase/MyWorkText';
import Astronaut from './spacePhase/Astronauts';

const SpacePhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Stars speed={1} saturation={0.6} count={3000} />
        <MyWorkText />
        <Astronaut />
        <directionalLight intensity={0.5} />
      </group>
    );
  },
);

export default SpacePhase;
