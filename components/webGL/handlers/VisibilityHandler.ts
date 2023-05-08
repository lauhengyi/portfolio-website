import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTransform } from 'framer-motion';
import getPhaseProgress from '../utils/getPhaseProgress';
import * as THREE from 'three';

interface ISceneRefs {
  skyBackground: MutableRefObject<THREE.Group>;
  land: MutableRefObject<THREE.Group>;
  sky: MutableRefObject<THREE.Group>;
  tempSky: MutableRefObject<THREE.Sprite>;
  space: MutableRefObject<THREE.Group>;
}

export default class VisibilityHandler {
  sceneRefs: ISceneRefs;
  directionVector: THREE.Vector3;

  constructor(sceneRefs: ISceneRefs) {
    this.sceneRefs = sceneRefs;

    this.directionVector = new THREE.Vector3();
  }

  private positionTempSky(camera: THREE.Camera) {
    camera.getWorldDirection(this.directionVector);
    this.sceneRefs.tempSky.current.position.set(
      camera.position.x + this.directionVector.x * 2,
      camera.position.y + this.directionVector.y * 2,
      camera.position.z + this.directionVector.z * 2,
    );
  }

  handleVisibility() {
    const { landToSky, sky, skyToSpace, space } = getPhaseProgress();

    const tempSkyOpacity = useTransform(
      skyToSpace,
      [0.3, 0.5, 0.6, 1],
      [0, 1, 1, 0],
    );

    useFrame(({ camera }) => {
      if (landToSky.get() !== 1) {
        this.sceneRefs.skyBackground.current.visible = true;
        this.sceneRefs.land.current.visible = true;
        this.sceneRefs.sky.current.visible = true;
        this.sceneRefs.tempSky.current.visible = false;
        this.sceneRefs.space.current.visible = false;
      } else if (sky.get() !== 1) {
        this.sceneRefs.skyBackground.current.visible = true;
        this.sceneRefs.land.current.visible = false;
        this.sceneRefs.sky.current.visible = true;
        this.sceneRefs.tempSky.current.visible = false;
        this.sceneRefs.space.current.visible = false;
      } else if (skyToSpace.get() !== 1) {
        this.sceneRefs.land.current.visible = false;
        this.sceneRefs.tempSky.current.visible = true;

        this.positionTempSky(camera);
        this.sceneRefs.tempSky.current.material.opacity = tempSkyOpacity.get();

        if (skyToSpace.get() > 0.6) {
          this.sceneRefs.skyBackground.current.visible = false;
          this.sceneRefs.sky.current.visible = false;
          this.sceneRefs.space.current.visible = true;
        } else {
          this.sceneRefs.skyBackground.current.visible = true;
          this.sceneRefs.sky.current.visible = true;
          this.sceneRefs.space.current.visible = false;
        }
      } else if (space.get() !== 1) {
        this.sceneRefs.skyBackground.current.visible = false;
        this.sceneRefs.land.current.visible = false;
        this.sceneRefs.sky.current.visible = false;
        this.sceneRefs.tempSky.current.visible = false;
        this.sceneRefs.space.current.visible = true;
      }
    });
  }
}
