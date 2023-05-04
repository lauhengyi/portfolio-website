import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhaseProgress from '../utils/getPhaseProgress';
import { useTransform } from 'framer-motion';

export default class FogHandler {
  fog: MutableRefObject<THREE.Fog>;
  constructor(fog: MutableRefObject<THREE.Fog>) {
    this.fog = fog;
  }

  handleFog() {
    const landFog = {
      near: 30,
      far: 50,
    };
    const skyFog = {
      near: 45,
      far: 75,
    };
    const phases = getPhaseProgress();
    const progress = useTransform(phases.landToSky, [0.6, 1], [0, 1]);
    useFrame(() => {
      const mix = progress.get();
      this.fog.current.near = landFog.near * (1 - mix) + skyFog.near * mix;
      this.fog.current.far = landFog.far * (1 - mix) + skyFog.far * mix;
    });
  }
}
