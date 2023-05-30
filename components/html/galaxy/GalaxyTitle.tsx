import styles from '../../../styles/Galaxy.module.css';
import getPhaseProgress from '../../utils/getPhaseProgress';
import { motion, useTransform, easeOut } from 'framer-motion';

export default function GalaxyTitle() {
  const { spaceToGalaxy } = getPhaseProgress();
  const y = useTransform(spaceToGalaxy, [0.7, 1.0], ['100%', '0%'], {
    ease: easeOut,
  });
  const rotateX = useTransform(spaceToGalaxy, [0.85, 1.0], [90, 0], {
    ease: easeOut,
  });
  const rotateZ = useTransform(spaceToGalaxy, [0.7, 1.0], [40, 0], {
    ease: easeOut,
  });
  return (
    <h2 className={styles.title}>
      <span>
        <motion.span style={{ y, rotateX, rotateZ }}>
          Lets make something
        </motion.span>
      </span>
      <span>
        <motion.span style={{ y, rotateX, rotateZ }}>
          out of this world!
        </motion.span>
      </span>
    </h2>
  );
}
