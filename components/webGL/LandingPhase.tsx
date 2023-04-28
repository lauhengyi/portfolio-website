import { RefObject, forwardRef } from 'react';
import Cars from './landingPhase/Cars';
import LandStatic from './landingPhase/LandStatic';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <>
        <fog attach={'fog'} near={30} far={50} color="#f3fdff" />
        <group {...props} ref={ref}>
          <LandStatic />
          <Cars />
        </group>
      </>
    );
  },
);

export default LandingPhase;
