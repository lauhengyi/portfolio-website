import SkyWord from './SkyWord';
import { useTransform, useSpring, MotionValue } from 'framer-motion';

type props = {
  children: string;
  skyProgress: MotionValue<number>;
};
export default function SkyText({ children, skyProgress }: props) {
  const totalProgress = useSpring(
    useTransform(skyProgress, [0.1, 0.7], [0, 1]),
    {
      damping: 10,
      stiffness: 100,
      restSpeed: 0.001,
      mass: 0.5,
    },
  );
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
