import styles from '../../styles/NavBar.module.css';
import NavLink from './navbar/NavLink';

export default function NavBar() {
  return (
    <ul className={styles.navContainer}>
      <NavLink>Home</NavLink>
      <NavLink>About</NavLink>
      <NavLink>Work</NavLink>
      <NavLink>Contact</NavLink>
    </ul>
  );
}
