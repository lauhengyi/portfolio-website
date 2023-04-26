import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface IPhases {
  land: MotionValue<number>;
  sky: MotionValue<number>;
  space: MotionValue<number>;
}

export default function getPhasePositions(): IPhases {
  const phasePoints = [0, 1500, 3000, 4500];
  const { scrollY } = useScroll();

  const land = useTransform(scrollY, [phasePoints[0], phasePoints[1]], [0, 1]);
  const sky = useTransform(scrollY, [phasePoints[1], phasePoints[2]], [0, 1]);
  const space = useTransform(scrollY, [phasePoints[2], phasePoints[3]], [0, 1]);

  return { land, sky, space };
}
