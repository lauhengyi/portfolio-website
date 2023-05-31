import styles from '../../styles/Sky.module.css';
import { motion, useTransform } from 'framer-motion';
import getPhaseProgress from '../utils/getPhaseProgress';
import SkyText from './sky/SkyText';
import SkyCaption from './sky/SkyCaption';

export default function SkyHTML() {
  const { landToSky, sky, skyToSpace } = getPhaseProgress();
  const entranceOpacity = useTransform(landToSky, [0.8, 1], [0, 1]);
  const exitOpacityCaption = useTransform(skyToSpace, [0.8, 1], [1, 0]);

  return (
    <div className="section-wrapper">
      <motion.section className={styles.sky}>
        <SkyText>
          Hi, I am currently a undergrad in NUS Com Sci, and I have a passion
          for building amazing web applications that inspire. On the side, I
          like to make music.
        </SkyText>
        <motion.div
          style={{ opacity: exitOpacityCaption }}
          className={styles.captionContainer}
        >
          <SkyCaption skyProgress={sky}>
            Who says that 'The sky's the limit'?
          </SkyCaption>
        </motion.div>
      </motion.section>
    </div>
  );
}
