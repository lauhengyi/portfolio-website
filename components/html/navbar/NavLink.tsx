import styles from '../../../styles/NavBar.module.css';

type props = {
  children: string;
  scrollLocation?: number;
  href?: string;
};

export default function NavLink({ children, scrollLocation, href }: props) {
  const handleOnClick = () => {
    if (scrollLocation !== undefined) {
      window.scrollTo({
        top:
          (1 - scrollLocation) * document.body.scrollHeight -
          window.innerHeight,
        behavior: 'smooth',
      });
    }
  };
  return (
    <li className={styles.link}>
      <a onClick={handleOnClick}>{children}</a>
    </li>
  );
}
