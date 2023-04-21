import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function HTML() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lau Heng Yi</title>
        <meta name="description" content="Lau Heng Yi's portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>Hi</h1>
      </main>
    </div>
  );
}
