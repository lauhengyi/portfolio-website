import styles from '../../../styles/Galaxy.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

type SocialCardProps = {
  href: string;
  icon: string;
  name: string;
};

export default function SocialCard(props: SocialCardProps) {
  return (
    <motion.a className={styles.socialCard}>
      <span style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          objectFit="contain"
          layout="fill"
          src={props.icon}
          alt={props.name}
        />
      </span>
      <span>{props.name}</span>
    </motion.a>
  );
}
