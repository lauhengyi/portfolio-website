import styles from '../../styles/Loading.module.css';
import { motion, TargetAndTransition, Transition } from 'framer-motion';

type props = {
  progress: number;
};

export default function Loading({ progress }: props) {
  const progressExit: TargetAndTransition = {
    translateY: '100%',
    translateX: '10%',
    rotateZ: '10deg',
  };
  const titleExit: TargetAndTransition = {
    translateY: '-100%',
    translateX: '-10%',
    rotateZ: '10deg',
  };
  const wordsTransition: Transition = {
    duration: 0.8,
  };

  const lineExit: TargetAndTransition = {
    width: '0%',
  };
  const lineTransition: Transition = {
    delay: 0.5,
    duration: 1,
  };

  return (
    <section className={styles.background}>
      <div className={styles.stats}>
        <span className="mask">
          <motion.h2
            exit={progressExit}
            transition={wordsTransition}
            className={styles.progress}
          >
            {progress}%
          </motion.h2>
        </span>
        <motion.span
          exit={lineExit}
          transition={lineTransition}
          className={styles.line}
        />
        <span className="mask">
          <motion.h3
            exit={titleExit}
            transition={wordsTransition}
            className={styles.title}
          >
            LOADING...
          </motion.h3>
        </span>
      </div>
    </section>
  );
}