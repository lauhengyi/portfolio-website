import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from '../../styles/Land.module.css';

export default function LandHTML() {
  const { scrollY } = useScroll();
  const opacity = useSpring(useTransform(scrollY, [0, 400], [1, 0]), {
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
