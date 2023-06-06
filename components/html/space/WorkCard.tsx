import styles from '../../../styles/Space.module.css';
import Link from '../utilComponents/Link';

type props = {
  company: string;
  duration: string;
  position: string;
  href?: string;
  children: JSX.Element[] | JSX.Element;
};

export default function WorkCard(props: props) {
  return (
    <article className={styles.card}>
      <div className={styles.topContainer}>
        <h2>
          {props.href ? (
            <Link href={props.href}>{props.company}</Link>
          ) : (
            <>{props.company}</>
          )}
        </h2>
        <h3>{props.duration}</h3>
      </div>
      <hr />
      <h4>{props.position}</h4>
      <ul className={styles.list}>{props.children}</ul>
    </article>
  );
}
