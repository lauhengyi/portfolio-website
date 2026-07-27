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
        company="Stripe Inc"
        duration="May 2026 - Jul 2026"
        position="Software Engineer Intern"
        href="https://stripe.com/en-sg"
      >
        <li>
          Shipped 5 production features across React, Ruby, GraphQL, and
          Elasticsearch, cutting dispute-list p99 latency by 65% and export
          times by 30%.
        </li>
        <li>
          Delivered 2 P0 requirements for a major enterprise platform within an
          escalated 2-month deadline.
        </li>
        <li>
          Migrated dispute queries from MongoDB to Elasticsearch via a
          200M-document backfill across 13 parallel migrations.
        </li>
        <li>
          Built shadow-traffic validation that caught data-parity issues before
          cutover, preventing user impact.
        </li>
      </WorkCard>
      <WorkCard
        company="Thales Group"
        duration="Jul 2025 - Oct 2025"
        position="Software Engineer Intern"
        href="https://www.thalesgroup.com/en/"
      >
        <li>
          Designed, developed, and deployed a locally hosted AI assistant
          leveraging LLMs to support software engineers in writing test cases on
          air-gapped development environments.
        </li>
        <li>
          Drove widespread adoption across the team, significantly accelerating
          coding and testing workflows.
        </li>
        <li>
          Iterated on the solution based on feedback, improving usability,
          reliability, and performance over time.
        </li>
        <li>
          Authored comprehensive documentation to ensure smooth handover and
          long-term maintainability.
        </li>
      </WorkCard>
      <WorkCard
        company="Razer Inc."
        duration="Jan 2025 - May 2025"
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
    </motion.section>
  );
}
