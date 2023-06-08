import styles from '../../../styles/Galaxy.module.css';
import { useTransform } from 'framer-motion';
import getPhaseProgress from '../../utils/getPhaseProgress';
import HeaderAnimated from '../utilComponents/HeaderAnimated';

export default function GalaxyTitle() {
  const { spaceToGalaxy } = getPhaseProgress();
  const progress = useTransform(spaceToGalaxy, [0.6, 1], [0, 1]);
  return (
    <h2 className={styles.title}>
      <HeaderAnimated progress={progress}>Let's make something</HeaderAnimated>
      <HeaderAnimated progress={progress}>out of this world!</HeaderAnimated>
    </h2>
  );
}
