import styles from '../../../styles/Galaxy.module.css';
import Image from 'next/image';
import getPhaseProgress from '../../webGL/utils/getPhaseProgress';
import { motion, useTransform, easeOut } from 'framer-motion';

type SocialCardProps = {
  order: number;
  href: string;
  icon: string;
  name: string;
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

  return (
    <motion.a
      style={{ y: transformY }}
      className={styles.socialCard}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          objectFit="contain"
          layout="fill"
          src={props.icon}
          alt={props.name}
        />
      </span>
      <span className={styles.socialTitle}>{props.name}</span>
    </motion.a>
  );
}
