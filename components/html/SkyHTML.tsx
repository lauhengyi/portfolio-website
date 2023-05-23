import styles from '../../styles/Sky.module.css';
import { motion, useTransform } from 'framer-motion';
import getPhaseProgress from '../webGL/utils/getPhaseProgress';
import SkyText from './sky/SkyText';
import SkyCaption from './sky/SkyCaption';

export default function SkyHTML() {
  const { landToSky, sky, skyToSpace } = getPhaseProgress();
  const entranceOpacity = useTransform(landToSky, [0.8, 1], [0, 1]);
  const exitOpacityText = useTransform(skyToSpace, [0, 0.2], [1, 0]);

  return (
    <div className="section-wrapper">
      <motion.section
        style={{ opacity: entranceOpacity }}
        className={styles.sky}
      >
        <motion.div
          style={{ opacity: exitOpacityText }}
          className={styles.textContainer}
        >
          <SkyText skyProgress={sky}>
            Hi, I am currently a undergrad in NUS Com Sci, and I have a passion
            for building amazing web applications that inspire. On the side, I
            like to make music.
          </SkyText>
        </motion.div>
        <div className={styles.captionContainer}>
          <SkyCaption skyProgress={sky}>
            Who says that 'The sky's the limit'?
          </SkyCaption>
        </div>
      </motion.section>
    </div>
  );
}
