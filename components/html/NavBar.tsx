import styles from '../../styles/NavBar.module.css';
import { motion, useTransform } from 'framer-motion';
import NavLink from './navbar/NavLink';
import getPhaseProgress from '../utils/getPhaseProgress';

export default function NavBar() {
  const { skyToSpace } = getPhaseProgress();
  const color = useTransform(skyToSpace, [0.8, 1], ['#000000', '#ffffff']);
  return (
    <motion.ul style={{ color }} className={styles.navContainer}>
      <NavLink>Home</NavLink>
      <NavLink>About</NavLink>
      <NavLink>Work</NavLink>
      <NavLink>Contact</NavLink>
    </motion.ul>
  );
}
