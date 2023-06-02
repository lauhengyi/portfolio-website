import { useEffect, useState } from 'react';
import styles from '../../styles/Cursor.module.css';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    addEventListener('mousemove', handleMouseMove);

    return () => {
      removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.2 }}
        className={styles.cursor}
      ></motion.div>
      <motion.div
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.4 }}
        className={styles.cursor2}
      ></motion.div>
    </>
  );
}
