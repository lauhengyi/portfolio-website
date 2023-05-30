import { RefObject } from 'react';
import * as THREE from 'three';

export default function resizeText(textRef: RefObject<THREE.Group>) {
  if (!textRef.current) return;
  const aspect = window.innerWidth / window.innerHeight;
  const clampedAspect = Math.min(aspect, 1.8);
  const multiplier = 18;
  const scale = clampedAspect * multiplier;
  textRef.current.scale.set(scale, 1, scale);
}
