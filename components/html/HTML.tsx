import Head from 'next/head';
import LandHTML from './LandHTML';
import SkyHTML from './SkyHTML';
import SpaceHTML from './SpaceHTML';
import GalaxyHTML from './GalaxyHTML';
import Loading from './Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect } from 'react';
import useLoad from '../utils/useLoad';

export default function HTML() {
  const { isLoad, progress } = useLoad();
  useLayoutEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [isLoad]);

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="scrollContainer"
            >
              {/* <NavBar /> */}
              <LandHTML />
              <SkyHTML />
              <SpaceHTML />
              <GalaxyHTML />
            </motion.div>
          ) : (
            <Loading key="Loading" progress={progress} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
