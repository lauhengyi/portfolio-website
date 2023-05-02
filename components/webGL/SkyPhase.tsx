import { forwardRef } from 'react';
import AboutMeText from './skyPhase/AboutMeText';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <AboutMeText />
      </group>
    );
  },
);

export default LandingPhase;
