import { forwardRef } from 'react';
import { Stars } from '@react-three/drei';
import MyWorkText from './spacePhase/MyWorkText';

const SpacePhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Stars speed={1} saturation={0.6} count={3000} />
        <MyWorkText />
      </group>
    );
  },
);

export default SpacePhase;
