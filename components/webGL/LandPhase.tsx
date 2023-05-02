import { forwardRef } from 'react';
import Cars from './landPhase/Cars';
import Floor from './landPhase/Floor';
import Buildings from './landPhase/Buildings';

const LandPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <>
        <fog attach={'fog'} near={30} far={50} color="#f3fdff" />
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
