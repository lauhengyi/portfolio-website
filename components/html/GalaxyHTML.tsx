import styles from '../../styles/Galaxy.module.css';
import SocialCard from './galaxy/SocialCard';

export default function GalaxyHTML() {
  return (
    <div className="section-wrapper">
      <section className={styles.galaxy}>
        <h2 className={styles.title}>
          Lets make something
          <br /> out of this world!
        </h2>
        <div className={styles.socialsContainer}>
          <SocialCard
            name="Email"
            icon="/icons/email.svg"
            href="mailto: lauhengyi@gmail.com"
          />
          <SocialCard
            name="LinkedIn"
            icon="/icons/linkedIn.svg"
            href="https://www.linkedin.com/in/lauhengyi/"
          />
          <SocialCard
            name="Github"
            icon="/icons/github.svg"
            href="https://github.com/lauhengyi"
          />
        </div>
      </section>
    </div>
  );
}
