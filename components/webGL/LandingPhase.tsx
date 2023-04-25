import Cars from './landingPhase/Cars';
import Floor from './landingPhase/Floor';
import Name3D from './landingPhase/Name3D';

export default function LandingPhase(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <Floor />
      <Name3D />
      <Cars />
    </group>
  );
}
