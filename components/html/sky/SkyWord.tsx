import { CSSProperties } from 'react';
import styles from '../../../styles/Sky.module.css';
import { motion, MotionValue, useTransform } from 'framer-motion';

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

  const transform = useTransform(readProgress, interval, ['0%', '100%']);
  const progress = useTransform(readProgress, interval, ['0%', '100%']);

  return (
    <motion.span
      style={{ '--progress': progress } as style}
      data-text={children}
      className={styles.text}
    >
      {children}
    </motion.span>
  );
}
