import { CSSProperties } from 'react';
import styles from '../../../styles/Sky.module.css';
import {
  motion,
  MotionValue,
  useTransform,
  easeIn,
  easeOut,
} from 'framer-motion';

type props = {
  children: string;
  interval: [number, number];
  entranceProgress: MotionValue<number>;
  readProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
};

type style = CSSProperties & {
  '--progress': MotionValue<string>;
};
export default function SkyWord(props: props) {
  const { children, interval, entranceProgress, readProgress, exitProgress } =
    props;
  const extendedInterval = [interval[0], Math.min(interval[1] + 0.5, 1)];

  // Entrance
  const entranceWordProgress = useTransform(
    entranceProgress,
    extendedInterval,
    [0, 1],
    { ease: easeOut },
  );
  const yEntrance = useTransform(entranceWordProgress, [0, 1], ['-100%', '0%']);
  const rotateXEntrance = useTransform(
    entranceWordProgress,
    [0.5, 1],
    ['90deg', '0deg'],
  );

  // Reading
  const progress = useTransform(readProgress, interval, ['0%', '100%']);

  // Exit
  const exitWordProgress = useTransform(
    exitProgress,
    extendedInterval,
    [0, 1],
    { ease: easeIn },
  );
  const yExit = useTransform(exitWordProgress, [0, 1], ['0%', '100%']);
  const rotateXExit = useTransform(
    exitWordProgress,
    [0, 0.5],
    ['0deg', '90deg'],
  );

  return (
    <span className="mask">
      <motion.span
        style={{ y: yExit, rotateX: rotateXExit }}
        className={styles.textWrapper}
      >
        <motion.span
          style={
            {
              '--progress': progress,
              y: yEntrance,
              rotateX: rotateXEntrance,
            } as style
          }
          data-text={children}
          className={styles.text}
        >
          {children}
        </motion.span>
      </motion.span>
    </span>
  );
}
