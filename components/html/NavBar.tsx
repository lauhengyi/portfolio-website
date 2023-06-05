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
      <NavLink scrollLocation={phasePos[0]} type={'home'}>
        Home
      </NavLink>
      <NavLink scrollLocation={phasePos[1]} type={'about'}>
        About
      </NavLink>
      <NavLink scrollLocation={phasePos[3]} type={'work'}>
        Work
      </NavLink>
      <NavLink scrollLocation={phasePos[5]} type={'contact'}>
        Contact
      </NavLink>
    </motion.ul>
  );
}
