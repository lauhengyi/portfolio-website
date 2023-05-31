import { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../../styles/Loading.module.css';
import { useProgress } from '@react-three/drei';

export default function Loading() {
  const { progress } = useProgress();
  const [currentProgress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress);
  }, [progress]);
  return (
    <section className={styles.background}>
      <div className={styles.stats}>
        <h2 className={styles.progress}>{currentProgress}%</h2>
        <span className={styles.line} />
        <h3 className={styles.title}>LOADING...</h3>
      </div>
    </section>
  );
}
