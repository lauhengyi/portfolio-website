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
        company="Razer Inc."
        duration="Jan 2025 - Present"
        position="Systems Development Intern"
        href="https://www.razer.com/"
      >
        <li>
          Researched and familiarised with existing private/enterprise cloud
          management and accounting platforms.
        </li>
        <li>
          Document development process, decisions and their rationales, working
          configurations.
        </li>
        <li>
          Wrote customisation to interface with APIs of different backends.
        </li>
        <li>
          Developed and deployed working demos to cater to different use cases.
        </li>
        <li>
          Present the demo to internal stakeholders, fixing bugs or enhancing
          based on feedback.
        </li>
      </WorkCard>
      <WorkCard
        company="KairosWealth"
        duration="Jul 2024 - Jan 2025"
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
          Engineered and optimised a gamified personality quiz that attracted
          12.8K+ respondents, achieving a 25% newsletter signup rate (vs. 1-2%
          industry avg).
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
        company="21Chess app"
        duration="Jun 2021 - Nov 2021"
        position="Full Stack Developer"
      >
        <li>
          Created and published a game on the Google Play store, featuring 21
          original chess variations.
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
