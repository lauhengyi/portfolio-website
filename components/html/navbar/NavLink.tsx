import styles from '../../../styles/NavBar.module.css';
import useHover from '../../utils/useHover';
import { motion } from 'framer-motion';
import { CursorType } from '../cursor/useCursorStore';

type props = {
  name: CursorType;
  scrollLocation: number;
};

export default function NavLink({ name, scrollLocation }: props) {
  const handleOnClick = () => {
    window.scrollTo({
      top: scrollLocation * document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const { handleOnMouseEnter, handleOnMouseLeave } = useHover(name);

  return (
    <motion.li
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={styles.link}
    >
      <a
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {name}
      </a>
    </motion.li>
  );
}
