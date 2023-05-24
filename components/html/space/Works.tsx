import styles from '../../../styles/Space.module.css';
import { motion, useTransform } from 'framer-motion';
import WorkCard from './WorkCard';
import getPhaseProgress from '../../webGL/utils/getPhaseProgress';

export default function Works() {
  const { space } = getPhaseProgress();
  const x = useTransform(space, [0, 1], ['100%', '-110%']);
  return (
    <motion.section style={{ x }} className={styles.cardHolder}>
      <WorkCard
        company="Techno Innovators Inc"
        duration="Jan 2023 - present"
        position="Senior Software Engineerr"
      >
        <li>
          Developed scalable web applications using Python, Django, and
          JavaScript frameworks.
        </li>
        <li>
          Led a team in designing and implementing a robust API architecture for
          seamless integration.
        </li>
        <li>
          Collaborated with cross-functional teams, gathering requirements and
          proposing innovative solutions.
        </li>
        <li>
          Mentored junior developers, fostering a collaborative work
          environment.
        </li>
      </WorkCard>
      <WorkCard
        company="AlphaTech Solutions"
        duration="Jan 2022 - Dec 2022"
        position="Software Developer"
      >
        <li>
          Designed responsive user interfaces using HTML5, CSS3, and JavaScript.
        </li>
        <li>
          Developed custom WordPress themes and plugins to meet client
          requirements.
        </li>
        <li>Integrated third-party APIs to enhance website functionality.</li>
        <li>
          Resolved technical issues and provided timely support to clients.
        </li>
      </WorkCard>
      <WorkCard
        company="StellarSoft Corporation"
        duration="Apr 2021 - Sept 2021"
        position="Full Stack Software Engineer"
      >
        <li>
          Developed and maintained scalable web applications using Java, Spring,
          and Angular frameworks.
        </li>
        <li>
          Implemented RESTful APIs to facilitate seamless communication between
          front-end and back-end systems.
        </li>
        <li>
          Collaborated with UX designers to create intuitive user interfaces and
          enhance user experience.
        </li>
        <li>
          Conducted thorough testing and debugging to ensure high-quality and
          error-free code.
        </li>
      </WorkCard>
      <WorkCard
        company="CodeGenius Ltd"
        duration="Jun 2020 - Dec 2020"
        position="Software Developer"
      >
        <li>
          Collaborated with a team of developers to design and implement a
          cloud-based SaaS platform.
        </li>
        <li>
          Developed and maintained microservices using Node.js, Express, and
          MongoDB for efficient data management.
        </li>
        <li>
          Integrated machine learning algorithms into the platform to provide
          intelligent data analysis and insights.
        </li>
        <li>
          Participated in code reviews and implemented best practices to ensure
          code quality and maintainability.
        </li>
      </WorkCard>
    </motion.section>
  );
}
