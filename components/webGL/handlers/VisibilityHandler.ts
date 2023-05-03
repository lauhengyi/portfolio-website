import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhaseProgress from '../utils/getPhaseProgress';

interface ISceneRefs {
  land: MutableRefObject<THREE.Group>;
}

export default class VisibilityHandler {
  sceneRefs: ISceneRefs;
  constructor(sceneRefs: ISceneRefs) {
    this.sceneRefs = sceneRefs;
  }

  handleVisibility() {
    const phases = getPhaseProgress();
    useFrame(() => {
      const progress =
        phases.landToSky.get() + phases.sky.get() + phases.space.get();
      if (progress < 1) {
        this.sceneRefs.land.current.visible = true;
      } else if (progress < 2) {
        this.sceneRefs.land.current.visible = false;
      }
    });
  }
}
