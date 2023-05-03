import styles from '../../../styles/Sky.module.css';

type props = {
  children: string;
};

export default function SkyText(props: props) {
  const text = props.children;
  return <p className={styles.text}>{text}</p>;
}
