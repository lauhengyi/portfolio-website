import { motion, useTransform, MotionValue, easeOut } from 'framer-motion';
type props = {
  children: string;
  progress: MotionValue<number>;
};

export default function HeaderAnimated({ children, progress }: props) {
  const y = useTransform(progress, [0, 1], ['100%', '0%'], {
    ease: easeOut,
  });
  const rotateX = useTransform(progress, [0.5, 1], [90, 0], {
    ease: easeOut,
  });
  const rotateZ = useTransform(progress, [0, 1], [40, 0], {
    ease: easeOut,
  });
  return (
    <span style={{ overflow: 'hidden', display: 'block' }}>
      <motion.span
        style={{
          y,
          rotateX,
          rotateZ,
          display: 'block',
          transformOrigin: 'bottom left',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
