import styles from '../../styles/Sky.module.css';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import SkyText from './sky/SkyText';

export default function SkyHTML() {
  const { scrollY } = useScroll();
  const opacity = useSpring(useTransform(scrollY, [1000, 1500], [0, 1]), {
    bounce: 0,
  });
  return (
    <div className="article-wrapper">
      <motion.article style={{ opacity: opacity }} className={styles.sky}>
        <SkyText>
          Hi, I am currently a undergraduate in NUS Com Sci, and I am passionate
          about building amazing web applications that inspire. On the side, I
          like to make music.
        </SkyText>
        {/* <p className={styles.text}>{text}</p> */}
      </motion.article>
    </div>
  );
}
