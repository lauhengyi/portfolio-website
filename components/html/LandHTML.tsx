import { motion, useTransform, useSpring } from 'framer-motion';
import styles from '../../styles/Land.module.css';
import getPhaseProgress from '../webGL/utils/getPhaseProgress';

export default function LandHTML() {
  const { landToSky } = getPhaseProgress();
  const opacity = useSpring(useTransform(landToSky, [0, 0.2], [1, 0]), {
    bounce: 0,
  });
  return (
    <div className="article-wrapper">
      <motion.article style={{ opacity: opacity }} className={styles.land}>
        <h1 className={styles.title}>Web Developer</h1>
        <p className={styles.caption}>I like to build nice things.</p>
      </motion.article>
    </div>
  );
}
