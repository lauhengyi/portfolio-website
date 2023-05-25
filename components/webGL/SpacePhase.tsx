import { forwardRef } from 'react';
import { Stars } from '@react-three/drei';
import MyWorkText from './spacePhase/MyWorkText';
import Astronaut from './spacePhase/Astronauts';
import Earth from './spacePhase/Earth';

const SpacePhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Stars
          speed={1}
          factor={40}
          saturation={1}
          depth={40}
          count={3000}
          radius={1000}
        />
        <MyWorkText />
        <Astronaut />
        <Earth />
        <directionalLight intensity={0.5} />
      </group>
    );
  },
);

export default SpacePhase;
