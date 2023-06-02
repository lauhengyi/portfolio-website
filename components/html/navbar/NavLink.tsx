import styles from '../../../styles/NavBar.module.css';

type props = {
  children: string;
  scrollLocation?: number;
  href?: string;
};

export default function NavLink({ children, scrollLocation, href }: props) {
  return (
    <li className={styles.link}>
      <a>{children}</a>
    </li>
  );
}
