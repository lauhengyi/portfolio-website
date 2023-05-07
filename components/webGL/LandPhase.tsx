import { forwardRef } from 'react';
import Cars from './landPhase/Cars';
import Floor from './landPhase/Floor';
import Buildings from './landPhase/Buildings';

const LandPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <>
        <group {...props} ref={ref}>
          <Buildings />
          <Cars />
          <Floor />
        </group>
      </>
    );
  },
);

export default LandPhase;
