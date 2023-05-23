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
        <p>
          Developed scalable web applications using Python, Django, and
          JavaScript frameworks.
        </p>
        <p>
          Led a team in designing and implementing a robust API architecture for
          seamless integration.
        </p>
        <p>
          Collaborated with cross-functional teams, gathering requirements and
          proposing innovative solutions.
        </p>
        <p>
          Mentored junior developers, fostering a collaborative work
          environment.
        </p>
      </WorkCard>
      <WorkCard
        company="AlphaTech Solutions"
        duration="Jan 2022 - Dec 2022"
        position="Software Developer"
      >
        <p>
          Designed responsive user interfaces using HTML5, CSS3, and JavaScript.
        </p>
        <p>
          Developed custom WordPress themes and plugins to meet client
          requirements.
        </p>
        <p>Integrated third-party APIs to enhance website functionality.</p>
        <p>Resolved technical issues and provided timely support to clients.</p>
      </WorkCard>
      <WorkCard
        company="StellarSoft Corporation"
        duration="Apr 2021 - Sept 2021"
        position="Full Stack Software Engineer"
      >
        <p>
          Developed and maintained scalable web applications using Java, Spring,
          and Angular frameworks.
        </p>
        <p>
          Implemented RESTful APIs to facilitate seamless communication between
          front-end and back-end systems.
        </p>
        <p>
          Collaborated with UX designers to create intuitive user interfaces and
          enhance user experience.
        </p>
        <p>
          Conducted thorough testing and debugging to ensure high-quality and
          error-free code.
        </p>
      </WorkCard>
      <WorkCard
        company="CodeGenius Ltd"
        duration="Jun 2020 - Dec 2020"
        position="Software Developer"
      >
        <p>
          Collaborated with a team of developers to design and implement a
          cloud-based SaaS platform.
        </p>
        <p>
          Developed and maintained microservices using Node.js, Express, and
          MongoDB for efficient data management.
        </p>
        <p>
          Integrated machine learning algorithms into the platform to provide
          intelligent data analysis and insights.
        </p>
        <p>
          Participated in code reviews and implemented best practices to ensure
          code quality and maintainability.
        </p>
      </WorkCard>
    </motion.section>
  );
}
