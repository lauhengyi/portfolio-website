import { forwardRef } from 'react';
import Galaxy from './galaxyPhase/Galaxy';

const GalaxyPhase = forwardRef<THREE.Group>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    return (
      <group {...props} ref={ref}>
        <Galaxy />
      </group>
    );
  },
);

export default GalaxyPhase;
