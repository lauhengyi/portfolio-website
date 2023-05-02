import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function HTML() {
  return (
    <div>
      <Head>
        <title>Lau Heng Yi</title>
        <meta name="description" content="Lau Heng Yi's portfolio website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Kannada&family=Bebas+Neue&family=DM+Serif+Text&family=Dongle&family=Kurale&family=Lily+Script+One&family=Oswald&family=Pattaya&family=Playfair+Display&family=Rampart+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="container">
        {/* <NavBar /> */}
        <div className="wrapper">
          <article className={styles.landing}>
            <h1 className={styles.title}>Web Developer</h1>
            <p className={styles.caption}>I like to build nice things.</p>
          </article>
        </div>
      </main>
    </div>
  );
}
