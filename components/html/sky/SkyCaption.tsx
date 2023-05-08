import styles from '../../../styles/Sky.module.css';
import { motion, MotionValue, useTransform } from 'framer-motion';

type props = {
  children: string;
  skyProgress: MotionValue<number>;
};

export default function SkyCaption({ children, skyProgress }: props) {
  const opacity = useTransform(skyProgress, [0.8, 1], [0, 1]);
  return (
    <motion.p style={{ opacity: opacity }} className={styles.caption}>
      {children}
    </motion.p>
  );
}
