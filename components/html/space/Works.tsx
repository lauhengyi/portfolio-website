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
        company="Swerve Website"
        duration="Nov 2022 - Dec 2022"
        position="Personal Project"
        href="https://theswerveapp.com/"
      >
        <li>Designed a modern website for a mock start-up idea in Figma.</li>
        <li>Implemented the design in code using Next.js.</li>
        <li>
          Includes complex on-scroll animations packaged in a modern UI using
          the GSAP and CSS.
        </li>
        <li>
          This shows my ability to design and build creative front-end
          experiences.
        </li>
      </WorkCard>
      <WorkCard
        company="Swerve Server"
        duration="Jun 2022 - Sept 2022"
        position="Personal Project"
      >
        <li>Built a back-end server for a mock start-up idea.</li>
        <li>Implemented REST APIs with Node.js and Express.js.</li>
        <li>
          Implemented many common features like interfacing with a MongoDB
          database, JWT authentication, and password hashing.
        </li>
        <li>All API endpoints are vigorously tested with Jest.js.</li>
        <li>
          This shows my experience with back-end and it's relevant technologies.
        </li>
      </WorkCard>
      <WorkCard
        company="21Chess app"
        duration="Jun 2021 - Nov 2021"
        position="Personal Project"
        href="https://play.google.com/store/apps/details?id=com.hengyi.twentyonechess&hl=en&gl=US"
      >
        <li>
          Created and published a game on the Google Play store which features
          21 original chess variations.
        </li>
        <li>Implemented AI opponents for each of the 21 Chess variations.</li>
        <li>
          Made a UI which enabled different color themes and has extensive
          in-game customizability.
        </li>
        <li>This shows my experience in mobile development and UI design.</li>
      </WorkCard>
    </motion.section>
  );
}
