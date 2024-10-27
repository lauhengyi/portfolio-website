import styles from '../../../styles/Space.module.css';
import { motion, useTransform } from 'framer-motion';
import WorkCard from './WorkCard';
import getPhaseProgress from '../../utils/getPhaseProgress';

export default function Works() {
  const { space } = getPhaseProgress();
  const x = useTransform(space, [0, 1], ['100%', '-100%']);
  return (
    <motion.section style={{ x }} className={styles.cardHolder}>
      <WorkCard
        company="KairosWealth"
        duration="Jan 2024 - Mar 2024"
        position="Software Engineer"
        href="https://www.kairoswealth.com/"
      >
        <li>
          Designed and developed UI/UX for responsive and intuitive user
          interfaces.
        </li>
        <li>
          Refactored code for clarity, maintainability, and extensibility,
          improving application performance.
        </li>
        <li>
          Contributed to scalable and efficient software solutions, enhancing
          overall user experience.
        </li>
      </WorkCard>
      <WorkCard
        company="Spaceytales"
        duration="Jan 2024 - Mar 2024"
        position="Full Stack Freelance Developer"
        href="https://spaceytales.com/pages/what-planet-are-you"
      >
        <li>
          SpaceyTales contracted me to build a personality quiz for an
          exhibition held by Science Centre Singapore and OSTIn.
        </li>
        <li>
          Built the front-end of the quiz using Next.js and Framer motion.
        </li>
        <li>
          Designed and built back-end to store quiz results, email and
          statistics.
        </li>
      </WorkCard>
      <WorkCard
        company="Swerve Website"
        duration="Nov 2022 - Dec 2022"
        position="Front-end Developer"
        href="https://theswerveapp.com/"
      >
        <li>
          Designed a mock up for complete website UI for a start up in Figma.
        </li>
        <li>
          Implemented front-end design in code using Next.js framework and GSAP
          animations taking 1 month to build.
        </li>
        <li>
          Incorporated complex on-scroll animations packaged in a modern UI
          using the GSAP and CSS.
        </li>
      </WorkCard>
      <WorkCard
        company="21Chess app"
        duration="Jun 2021 - Nov 2021"
        position="Full Stack Developer"
        href="https://play.google.com/store/apps/details?id=com.hengyi.twentyonechess&hl=en&gl=US"
      >
        <li>
          Created and published a game on the Google Play store, taking of 5
          months, featuring 21 original chess variations.
        </li>
        <li>Implemented AI opponents for each of the 21 Chess variations.</li>
        <li>
          Made a UI, enabling different colour themes and has extensive in-game
          customizability.
        </li>
        <li>
          Leveraged React Native, Javascript, HTML, CSS and Git to develop and
          deploy application.
        </li>
      </WorkCard>
    </motion.section>
  );
}
