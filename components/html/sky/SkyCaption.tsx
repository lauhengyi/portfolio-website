import styles from '../../../styles/Sky.module.css';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';

type props = {
  children: string;
  skyProgress: MotionValue<number>;
};

export default function SkyCaption({ children, skyProgress }: props) {
  const opacity = useSpring(useTransform(skyProgress, [0.8, 1], [0, 1]), {
    bounce: 0,
  });
  return (
    <motion.p style={{ opacity: opacity }} className={styles.caption}>
      {children}
    </motion.p>
  );
}
