import styles from '../../../styles/Space.module.css';

type props = {
  company: string;
  duration: string;
  position: string;
  children: JSX.Element[] | JSX.Element;
};

export default function WorkCard(props: props) {
  return (
    <article className={styles.card}>
      <div className={styles.topContainer}>
        <h2>{props.company}</h2>
        <h3>{props.duration}</h3>
      </div>
      <hr />
      <h4>{props.position}</h4>
      {props.children}
    </article>
  );
}
