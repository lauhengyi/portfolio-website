import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import getPhasePositions from '../utils/getPhasePositions';

interface ISceneRefs {
  landing: MutableRefObject<THREE.Group>;
}

export default class VisibilityHandler {
  sceneRefs: ISceneRefs;
  constructor(sceneRefs: ISceneRefs) {
    this.sceneRefs = sceneRefs;
  }

  handleVisibility() {
    console.log('handleVisibility');
    const phases = getPhasePositions();
    useFrame(() => {
      const progress =
        phases.landing.get() + phases.sky.get() + phases.space.get();
      if (progress < 1) {
        console.log(this.sceneRefs.landing.current);
        this.sceneRefs.landing.current.visible = true;
      } else if (progress < 2) {
        this.sceneRefs.landing.current.visible = false;
      }
    });
  }
}
