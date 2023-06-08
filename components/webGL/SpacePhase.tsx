import { forwardRef } from 'react';
import MyWorkText from './spacePhase/MyWorkText';
import Astronaut from './spacePhase/Astronauts';
import Earth from './spacePhase/Earth';

const SpacePhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <MyWorkText />
        <Astronaut />
        <Earth />
        <directionalLight intensity={0.5} />
      </group>
    );
  },
);

export default SpacePhase;
