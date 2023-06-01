import Head from 'next/head';
import LandHTML from './LandHTML';
import SkyHTML from './SkyHTML';
import SpaceHTML from './SpaceHTML';
import GalaxyHTML from './GalaxyHTML';
import Loading from './Loading';
import { AnimatePresence } from 'framer-motion';
import useLoad from '../utils/useLoad';

export default function HTML() {
  const { isLoad, progress } = useLoad();

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
        <AnimatePresence>
          {isLoad ? (
            <>
              {/* <NavBar /> */}
              <LandHTML />
              <SkyHTML />
              <SpaceHTML />
              <GalaxyHTML />
            </>
          ) : (
            <Loading key="Loading" progress={progress} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
