import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface IPhases {
  landToSky: MotionValue<number>;
  sky: MotionValue<number>;
  skyToSpace: MotionValue<number>;
  space: MotionValue<number>;
}

export default function getPhaseProgress(): IPhases {
  const phasePos = [0, 1500, 5000, 6500, 8000];
  const { scrollY } = useScroll();

  const landToSky = useTransform(scrollY, [phasePos[0], phasePos[1]], [0, 1]);
  const sky = useTransform(scrollY, [phasePos[1], phasePos[2]], [0, 1]);
  const skyToSpace = useTransform(scrollY, [phasePos[2], phasePos[3]], [0, 1]);
  const space = useTransform(scrollY, [phasePos[3], phasePos[4]], [0, 1]);

  return { landToSky, sky, skyToSpace, space };
}
