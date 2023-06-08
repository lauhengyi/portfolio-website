import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function useLoad() {
  const { progress } = useProgress();
  const [currentProgress, setProgress] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setProgress(progress);
    if (progress === 100) {
      setTimeout(() => {
        setIsLoad(true);
      }, 10);
    }
  }, [progress]);

  return { progress: currentProgress, isLoad };
}
