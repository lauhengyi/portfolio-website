import styles from '../../styles/Sky.module.css';
import { motion, useTransform } from 'framer-motion';
import getPhaseProgress from '../utils/getPhaseProgress';
import SkyText from './sky/SkyText';
import SkyCaption from './sky/SkyCaption';

export default function SkyHTML() {
  const { sky, skyToSpace } = getPhaseProgress();
  const exitOpacityCaption = useTransform(skyToSpace, [0.8, 1], [1, 0]);

  return (
    <div className="section-wrapper">
      <motion.section className={styles.sky}>
        <SkyText>
          Hi! I’m a final-year Com Sci student at NUS. I'm passionate about
          building thoughtful, high-impact software. On the side, I like to make
          music.
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
