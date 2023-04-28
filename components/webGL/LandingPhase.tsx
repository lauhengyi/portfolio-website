import { forwardRef } from 'react';
import Cars from './landingPhase/Cars';
import Floor from './landingPhase/Floor';
import Buildings from './landingPhase/Buildings';

const LandingPhase = forwardRef<THREE.Group>(
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

export default LandingPhase;
