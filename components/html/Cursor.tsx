import { useEffect, useState } from 'react';
import styles from '../../styles/Cursor.module.css';
import { Variants, motion } from 'framer-motion';
import useCursorStore from './cursor/useCursorStore';

export default function Cursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const cursorType = useCursorStore((s) => s.cursorType);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    addEventListener('mousemove', handleMouseMove);

    return () => {
      removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const mainCursorVariants: Variants = {
    default: {
      x: cursor.x,
      y: cursor.y,
      height: 30,
      width: 30,
      backgroundColor: '#000',
      opacity: 0.4,
    },

    pointer: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 120,
      width: 120,
      backgroundColor: '#fff',
      opacity: 1,
    },
  };

  const cursorText = {
    default: '',
    Home: 'Go back down',
    About: 'Learn about me',
    Work: 'See my work',
    Contact: 'Get in touch!',
    Email: '',
    LinkedIn: '',
    Github: '',
    Resume: '',
    External: '',
  };

  return (
    <>
      <motion.div
        variants={mainCursorVariants}
        animate={cursorType === 'default' ? 'default' : 'pointer'}
        transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.2 }}
        className={styles.cursor}
      >
        <span className={styles.cursorText}>{cursorText[cursorType]}</span>
      </motion.div>
      <motion.div
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.4 }}
        className={styles.cursor2}
      ></motion.div>
    </>
  );
}
