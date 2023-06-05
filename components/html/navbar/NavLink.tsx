import styles from '../../../styles/NavBar.module.css';
import useCursorStore, { CursorType } from '../cursor/useCursorStore';

type props = {
  children: string;
  scrollLocation?: number;
  type: CursorType;
};

export default function NavLink({ children, scrollLocation, type }: props) {
  const setCursorType = useCursorStore((s) => s.setCursorType);

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

  const handleOnMouseEnter = () => {
    setCursorType(type);
  };

  const handleOnMouseLeave = () => {
    setCursorType('default');
  };

  return (
    <li className={styles.link}>
      <a
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {children}
      </a>
    </li>
  );
}
