import styles from '../../../styles/Sky.module.css';
import SkyWord from './SkyWord';
import { useTransform, useSpring, easeOut, easeIn } from 'framer-motion';
import getPhaseProgress from '../../utils/getPhaseProgress';

type props = {
  children: string;
};
export default function SkyText({ children }: props) {
  const { landToSky, sky, skyToSpace } = getPhaseProgress();
  const entranceProgress = useTransform(landToSky, [0.7, 1], [0, 1], {
    ease: easeOut,
  });
  const readProgress = useSpring(useTransform(sky, [0.1, 0.7], [0, 1]), {
    damping: 10,
    stiffness: 100,
    restSpeed: 0.001,
    mass: 0.5,
  });
  const exitProgress = useTransform(skyToSpace, [0, 0.3], [0, 1], {
    ease: easeIn,
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
    <p className={styles.textContainer}>
      {text.split(' ').map((word, i) => (
        <SkyWord
          key={i}
          interval={textIntervals[i]}
          entranceProgress={entranceProgress}
          readProgress={readProgress}
          exitProgress={exitProgress}
        >
          {word}
        </SkyWord>
      ))}
    </p>
  );
}
