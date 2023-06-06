import { useEffect, useState } from 'react';
import styles from '../../styles/Cursor.module.css';
import { Variants, motion, useTransform } from 'framer-motion';
import getPhaseProgress from '../utils/getPhaseProgress';
import useCursorStore from './cursor/useCursorStore';

export default function Cursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const cursorType = useCursorStore((s) => s.cursorType);
  const { skyToSpace } = getPhaseProgress();
  const color = useTransform(skyToSpace, [0.8, 1], ['#414239', '#fffcea']);

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
      backgroundColor: color.get(),
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

  const secondaryCursorVariants: Variants = {
    default: {
      x: cursor.x,
      y: cursor.y,
      borderColor: color.get(),
      scale: 1,
      opacity: 1,
    },

    pointer: {
      x: cursor.x,
      y: cursor.y,
      scale: 2,
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        variants={mainCursorVariants}
        animate={cursorType === 'default' ? 'default' : 'pointer'}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
          mass: 0.2,
        }}
        className={styles.cursor}
      >
        <span className={styles.cursorText}>{cursorText[cursorType]}</span>
      </motion.div>
      <motion.div
        variants={secondaryCursorVariants}
        animate={cursorType === 'default' ? 'default' : 'pointer'}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
          mass: 0.4,
        }}
        className={styles.cursor2}
      ></motion.div>
    </>
  );
}
