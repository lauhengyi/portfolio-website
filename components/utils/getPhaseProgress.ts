import { useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';
import phasePos from './phasePositions';

interface IPhases {
  totalProgress: MotionValue<number>;
  landToSky: MotionValue<number>;
  sky: MotionValue<number>;
  skyToSpace: MotionValue<number>;
  space: MotionValue<number>;
  spaceToGalaxy: MotionValue<number>;
}

export default function getPhaseProgress(): IPhases {
  const { scrollYProgress } = useScroll();

  scrollYProgress.jump(0);
  const dampedScroll = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 600,
    restDelta: 0.00001,
  });

  const scroll = dampedScroll;

  const landToSky = useTransform(scroll, [phasePos[0], phasePos[1]], [0, 1]);
  const sky = useTransform(scroll, [phasePos[1], phasePos[2]], [0, 1]);
  const skyToSpace = useTransform(scroll, [phasePos[2], phasePos[3]], [0, 1]);
  const space = useTransform(scroll, [phasePos[3], phasePos[4]], [0, 1]);

  const spaceToGalaxy = useTransform(
    scroll,
    [phasePos[4], phasePos[5]],
    [0, 1],
  );

  return {
    totalProgress: scroll,
    landToSky,
    sky,
    skyToSpace,
    space,
    spaceToGalaxy,
  };
}
