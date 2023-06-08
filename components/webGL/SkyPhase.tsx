import { forwardRef } from 'react';
import AboutMeText from './skyPhase/AboutMeText';
import Planes from './skyPhase/Planes';
import Clouds from './skyPhase/Clouds';

const LandingPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <AboutMeText />
        <Planes />
        <Clouds />
      </group>
    );
  },
);

export default LandingPhase;
