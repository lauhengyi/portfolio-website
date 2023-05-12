import { useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';

interface IPhases {
  landToSky: MotionValue<number>;
  sky: MotionValue<number>;
  skyToSpace: MotionValue<number>;
  space: MotionValue<number>;
}

export default function getPhaseProgress(): IPhases {
  const phasePos = [0, 0.16, 0.45, 0.7, 1];
  const { scrollYProgress } = useScroll();

  const dampedScroll = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 600,
    restDelta: 0.001,
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

  return { landToSky, sky, skyToSpace, space };
}
