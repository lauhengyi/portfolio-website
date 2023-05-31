import Head from 'next/head';
import LandHTML from './LandHTML';
import SkyHTML from './SkyHTML';
import SpaceHTML from './SpaceHTML';
import GalaxyHTML from './GalaxyHTML';
import Loading from './Loading';
import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function HTML() {
  const { progress } = useProgress();
  const [currentProgress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress);
  }, [progress]);
  console.log(currentProgress);
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
          {currentProgress !== 100 ? (
            <Loading key="Loading" progress={currentProgress} />
          ) : (
            <>
              {/* <NavBar /> */}
              <LandHTML />
              <SkyHTML />
              <SpaceHTML />
              <GalaxyHTML />
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
