import styles from '../../styles/NavBar.module.css';
import { motion, useTransform } from 'framer-motion';
import NavLink from './navbar/NavLink';
import getPhaseProgress from '../utils/getPhaseProgress';
import phasePos from '../utils/phasePositions';

export default function NavBar() {
  const { skyToSpace } = getPhaseProgress();
  const color = useTransform(skyToSpace, [0.8, 1], ['#000000', '#ffffff']);
  return (
    <motion.ul style={{ color }} className={styles.navContainer}>
      <NavLink scrollLocation={phasePos[0]} name="Home" />
      <NavLink scrollLocation={phasePos[1]} name="About" />
      <NavLink scrollLocation={phasePos[3]} name="Work" />
      <NavLink scrollLocation={phasePos[5]} name="Contact" />
    </motion.ul>
  );
}
