import { RefObject, forwardRef } from 'react';
import Cars from './landingPhase/Cars';
import Floor from './landingPhase/Floor';
import Name3D from './landingPhase/Name3D';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Floor />
        <Name3D />
        <Cars />
      </group>
    );
  },
);

export default LandingPhase;
