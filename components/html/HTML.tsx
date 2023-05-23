import Head from 'next/head';
import LandHTML from './LandHTML';
import SkyHTML from './SkyHTML';
import SpaceHTML from './SpaceHTML';

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
        <LandHTML />
        <SkyHTML />
        <SpaceHTML />
      </main>
    </div>
  );
}
