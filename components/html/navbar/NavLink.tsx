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
      top:
        (1 - scrollLocation) * document.body.scrollHeight -
        window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  const { handleOnMouseEnter, handleOnMouseLeave } = useHover(name);

  return (
    <motion.li
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 600, damping: 10 }}
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
