import { forwardRef } from 'react';
import AboutMeText from './skyPhase/AboutMeText';
import Planes from './skyPhase/Planes';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <AboutMeText />
        <Planes />
      </group>
    );
  },
);

export default LandingPhase;
