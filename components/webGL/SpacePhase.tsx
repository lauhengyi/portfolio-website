import { forwardRef } from 'react';
import { Stars } from '@react-three/drei';

const SpacePhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Stars />
      </group>
    );
  },
);

export default SpacePhase;
