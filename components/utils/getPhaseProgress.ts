import { useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';

interface IPhases {
  totalProgress: MotionValue<number>;
  landToSky: MotionValue<number>;
  sky: MotionValue<number>;
  skyToSpace: MotionValue<number>;
  space: MotionValue<number>;
  spaceToGalaxy: MotionValue<number>;
}

export default function getPhaseProgress(): IPhases {
  const phasePos = [0, 0.16, 0.35, 0.45, 0.85, 1];
  const { scrollYProgress } = useScroll();
  const inverseScrollYProgress = useTransform(scrollYProgress, (p) => 1 - p);

  const dampedScroll = useSpring(inverseScrollYProgress, {
    damping: 100,
    stiffness: 600,
    restDelta: 0.00001,
  });
  const landToSky = useTransform(
    dampedScroll,
    [phasePos[0], phasePos[1]],
    [0, 1],
  );
  const sky = useTransform(dampedScroll, [phasePos[1], phasePos[2]], [0, 1]);
  const skyToSpace = useTransform(
    dampedScroll,
    [phasePos[2], phasePos[3]],
    [0, 1],
  );
  const space = useTransform(dampedScroll, [phasePos[3], phasePos[4]], [0, 1]);

  const spaceToGalaxy = useTransform(
    dampedScroll,
    [phasePos[4], phasePos[5]],
    [0, 1],
  );

  return {
    totalProgress: dampedScroll,
    landToSky,
    sky,
    skyToSpace,
    space,
    spaceToGalaxy,
  };
}
