import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhasePositions from '../utils/getPhasePositions';

interface ISceneRefs {
  land: MutableRefObject<THREE.Group>;
}

export default class VisibilityHandler {
  sceneRefs: ISceneRefs;
  constructor(sceneRefs: ISceneRefs) {
    this.sceneRefs = sceneRefs;
  }

  handleVisibility() {
    const phases = getPhasePositions();
    useFrame(() => {
      const progress =
        phases.land.get() + phases.sky.get() + phases.space.get();
      if (progress < 1) {
        this.sceneRefs.land.current.visible = true;
      } else if (progress < 2) {
        this.sceneRefs.land.current.visible = false;
      }
    });
  }
}
