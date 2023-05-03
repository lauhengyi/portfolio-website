import SkyWord from './SkyWord';
import { useTransform, useSpring } from 'framer-motion';
import getPhaseProgress from '../../webGL/utils/getPhaseProgress';

type props = {
  children: string;
};
export default function SkyText({ children }: props) {
  const { sky } = getPhaseProgress();
  const totalProgress = useSpring(sky, {
    damping: 10,
    stiffness: 100,
    restSpeed: 0.001,
    mass: 0.5,
  });
  const text = children;

  // Calculating appropriate intervals for each word
  const textIntervals: [number, number][] = [];
  let currentCount = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      const startIndex = i - currentCount;
      const endIndex = i - 1;
      const gap = (endIndex - startIndex + 1) / text.length;
      const start = startIndex / text.length;
      textIntervals.push([start, start + gap]);
      currentCount = 0;
    }
    currentCount++;
  }
  const startIndex = text.length - currentCount;
  const endIndex = text.length - 1;
  const gap = (endIndex - startIndex + 1) / text.length;
  const start = startIndex / text.length;
  textIntervals.push([start, start + gap]);

  return (
    <>
      {text.split(' ').map((word, i) => (
        <SkyWord
          key={i}
          interval={textIntervals[i]}
          totalProgress={totalProgress}
        >
          {word}
        </SkyWord>
      ))}
    </>
  );
}
