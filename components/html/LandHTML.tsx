import { motion, useTransform } from 'framer-motion';
import styles from '../../styles/Land.module.css';
import getPhaseProgress from '../utils/getPhaseProgress';
import HeaderAnimated from './utilComponents/HeaderAnimated';

export default function LandHTML() {
  const { landToSky } = getPhaseProgress();
  const opacity = useTransform(landToSky, [0, 0.2], [1, 0]);

  return (
    <div className="section-wrapper">
      <section className={styles.land}>
        <h1 className={styles.title}>
          <HeaderAnimated progress={opacity}>Web Developer</HeaderAnimated>
        </h1>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.p className={styles.caption} style={{ opacity }}>
            I like to build nice things.
          </motion.p>
        </motion.span>
      </section>
    </div>
  );
}
