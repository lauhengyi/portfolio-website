import styles from '../../../styles/Space.module.css';
import { motion, useTransform } from 'framer-motion';
import WorkCard from './WorkCard';
import getPhaseProgress from '../../utils/getPhaseProgress';

export default function Works() {
  const { space } = getPhaseProgress();
  const x = useTransform(space, [0, 1], ['100%', '-100%']);
  return (
    <motion.section style={{ x }} className={styles.cardHolder}>
      {/* <WorkCard
        company="Portfolio Website"
        duration='Feb 2023 - Jun 2023'
        position="Front-end Developer"
        href='https://www.lauhengyi.com/'
      >
        <li>Designed and constructed a website to showcase portfolio achievements in an engaging and interactive manner,
consisting of 4 different 3D scenes.</li>
        <li>Leveraged webGL and ThreeJS in order to create a performant 3D website.</li>
        <li>
        Enforced best practices of building a website, and maintained a core web vital score of above 90 for performance,
SEO and Acessibility.
        </li>
      </WorkCard> */}
      <WorkCard
        company="Swerve Website"
        duration="Nov 2022 - Dec 2022"
        position="Front-end Developer"
        href="https://theswerveapp.com/"
      >
        <li>Designed a mock up for complete website UI for a start up in Figma.</li>
        <li>Implemented front-end design in code using Next.js framework and GSAP animations taking 1 month to build.</li>
        <li>Incorporated complex on-scroll animations packaged in a modern UI using the GSAP and CSS.</li>
      </WorkCard>
      <WorkCard
        company="Swerve Server"
        duration="Jun 2022 - Sept 2022"
        position="Back-end Developer"
      >
        <li>Architected and built a back-end server for a start-up to fit business requirements for 3 months.</li>
        <li>Developed REST APIs with Node.js, Express.js and deployed a MongoDB database.</li>
        <li>
          Executed common features, interfacing with a MongoDB database, JWT authentication, and password hashing.
        </li>
        <li>
          Established a strong test-driven development process allowing for a test coverage of all api endpoints of over 90%.
        </li>
      </WorkCard>
      <WorkCard
        company="21Chess app"
        duration="Jun 2021 - Nov 2021"
        position="Full Stack Developer"
        href="https://play.google.com/store/apps/details?id=com.hengyi.twentyonechess&hl=en&gl=US"
      >
        <li>
          Created and published a game on the Google Play store, taking of 5 months, featuring 21 original chess variations.
        </li>
        <li>Implemented AI opponents for each of the 21 Chess variations.</li>
        <li>
          Made a UI, enabling different colour themes and has extensive in-game customizability.
        </li>
        <li>Leveraged React Native, Javascript, HTML, CSS and Git to develop and deploy application.</li>
      </WorkCard>
    </motion.section>
  );
}
