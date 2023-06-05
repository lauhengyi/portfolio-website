import styles from '../../../styles/NavBar.module.css';
import useHover from '../../utils/useHover';
import useCursorStore, { CursorType } from '../cursor/useCursorStore';

type props = {
  name: CursorType;
  scrollLocation: number;
};

export default function NavLink({ name, scrollLocation }: props) {
  const handleOnClick = () => {
    window.scrollTo({
      top:
        (1 - scrollLocation) * document.body.scrollHeight - window.innerHeight,
      behavior: 'smooth',
    });
  };

  const { handleOnMouseEnter, handleOnMouseLeave } = useHover(name);

  return (
    <li className={styles.link}>
      <a
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {name}
      </a>
    </li>
  );
}
