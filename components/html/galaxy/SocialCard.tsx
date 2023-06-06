import styles from '../../../styles/Galaxy.module.css';
import Image from 'next/image';
import getPhaseProgress from '../../utils/getPhaseProgress';
import { CursorType } from '../cursor/useCursorStore';
import { motion, useTransform, easeOut } from 'framer-motion';
import useHover from '../../utils/useHover';

type SocialCardProps = {
  order: number;
  href: string;
  icon: string;
  name: CursorType;
};

export default function SocialCard(props: SocialCardProps) {
  const { spaceToGalaxy } = getPhaseProgress();
  const transformY = useTransform(
    spaceToGalaxy,
    [0.7 + 0.1 * props.order, 1.0],
    ['200%', '0%'],
    {
      ease: easeOut,
    },
  );
  const { handleOnMouseEnter, handleOnMouseLeave } = useHover(props.name);

  const imageVariants = {
    default: {
      scale: 1,
      rotate: 0,
    },

    hover: {
      scale: 0.8,
      rotate: 180,
    },
  };

  const titleVariants = {
    default: {
      scale: 1,
    },

    hover: {
      scale: 1.5,
    },
  };

  return (
    <motion.a
      style={{ y: transformY }}
      className={styles.socialCard}
      href={props.href}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      whileHover="hover"
      whileTap="tap"
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.span
        style={{ width: '100%', height: '100%', position: 'relative' }}
        variants={imageVariants}
      >
        <Image
          objectFit="contain"
          layout="fill"
          src={props.icon}
          alt={props.name}
        />
      </motion.span>
      <motion.span variants={titleVariants} className={styles.socialTitle}>
        {props.name}
      </motion.span>
    </motion.a>
  );
}
