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

    Home: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 130,
      backgroundColor: '#CAE7B9',
      opacity: 1,
    },

    About: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 130,
      backgroundColor: '#F3DE8A',
      opacity: 1,
    },

    Work: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 130,
      backgroundColor: '#EB9486',
      opacity: 1,
    },

    Contact: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 130,
      backgroundColor: '#97A7B3',
      opacity: 1,
    },

    Email: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 90,
      width: 300,
      backgroundColor: '#444',
      opacity: 1,
    },

    LinkedIn: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 250,
      backgroundColor: '#0077B5',
      opacity: 1,
    },

    Github: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 250,
      backgroundColor: '#6e5494',
      opacity: 1,
    },

    external: {
      x: cursor.x - 15,
      y: cursor.y - 15,
      height: 130,
      width: 250,
      backgroundColor: '#333',
      opacity: 1,
    },
  };

  const cursorText = {
    default: '',
    Home: 'Go back down',
    About: 'Learn about me',
    Work: 'See my work',
    Contact: 'Get in touch!',
    Email: 'lauhengyi@gmail.com',
    LinkedIn: 'Join my network!',
    Github: 'Check out my code!',
    Resume: '',
    external: 'Click Me!',
  };

  const cursorTextVariants: Variants = {
    default: {
      opacity: 0,
      color: 'transparent',
    },
    Home: {
      opacity: 1,
      color: '#414239',
    },
    About: {
      opacity: 1,
      color: '#414239',
    },
    Work: {
      opacity: 1,
      color: '#414239',
    },
    Contact: {
      opacity: 1,
      color: '#414239',
    },
    Email: {
      opacity: 1,
      color: '#ffffff',
    },
    LinkedIn: {
      opacity: 1,
      color: '#ffffff',
    },
    Github: {
      opacity: 1,
      color: '#ffffff',
    },
    Resume: {
      opacity: 1,
      color: '#414239',
    },
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
        animate={cursorType}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
          mass: 0.2,
        }}
        className={styles.cursor}
      >
        <motion.span
          variants={cursorTextVariants}
          className={styles.cursorText}
        >
          {cursorText[cursorType]}
        </motion.span>
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
