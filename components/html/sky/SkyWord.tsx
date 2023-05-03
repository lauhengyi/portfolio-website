import { CSSProperties } from 'react';
import styles from '../../../styles/Sky.module.css';
import { motion, MotionValue, useTransform } from 'framer-motion';

type props = {
  children: string;
  interval: [number, number];
  totalProgress: MotionValue<number>;
};

type style = CSSProperties & {
  '--progress': MotionValue<string>;
};
export default function SkyWord({ children, interval, totalProgress }: props) {
  const progress = useTransform(totalProgress, interval, ['0%', '100%']);

  return (
    <motion.p
      style={{ '--progress': progress } as style}
      data-text={children}
      className={styles.text}
    >
      {children}
    </motion.p>
  );
}
