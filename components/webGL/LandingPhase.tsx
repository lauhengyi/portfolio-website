import { RefObject, forwardRef } from 'react';
import Cars from './landingPhase/Cars';
import Floor from './landingPhase/Floor';
import Name3D from './landingPhase/Name3D';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <>
        <fog attach={'fog'} near={30} far={50} color="#f3fdff" />
        <group {...props} ref={ref}>
          <Floor />
          <Name3D />
          <Cars />
        </group>
      </>
    );
  },
);

export default LandingPhase;
