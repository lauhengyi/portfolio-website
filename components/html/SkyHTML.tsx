import styles from '../../styles/Sky.module.css';
import { motion, useSpring, useTransform } from 'framer-motion';
import getPhaseProgress from '../webGL/utils/getPhaseProgress';
import SkyText from './sky/SkyText';

export default function SkyHTML() {
  const { landToSky } = getPhaseProgress();
  const opacity = useSpring(useTransform(landToSky, [0.8, 1], [0, 1]), {
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
        {/* <p className={styles.text}>
          Hi, I am currently a undergraduate in NUS Com Sci, and I am passionate
          about building amazing web applications that inspire. On the side, I
          like to make music.
        </p> */}
      </motion.article>
    </div>
  );
}
