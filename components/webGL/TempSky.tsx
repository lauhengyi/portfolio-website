import { forwardRef } from 'react';
import * as THREE from 'three';

const TempSky = forwardRef<THREE.Sprite>((props, ref) => {
  return (
    <sprite {...props} ref={ref} scale={[10, 10, 1]}>
      <spriteMaterial color={'#A7D1F6'} transparent />
    </sprite>
  );
});

export default TempSky;
