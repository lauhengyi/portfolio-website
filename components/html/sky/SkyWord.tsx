import { CSSProperties } from 'react';
import styles from '../../../styles/Sky.module.css';
import { motion, MotionValue, useTransform, easeIn } from 'framer-motion';

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

  const y = useTransform(
    entranceProgress,
    [interval[0], Math.min(interval[1] + 0.5, 1)],
    ['-100%', '0%'],
    {
      ease: easeIn,
    },
  );
  const progress = useTransform(readProgress, interval, ['0%', '100%']);

  return (
    <span style={{ overflow: 'hidden' }}>
      <motion.span
        style={{ '--progress': progress, y } as style}
        data-text={children}
        className={styles.text}
      >
        {children}
      </motion.span>
    </span>
  );
}
