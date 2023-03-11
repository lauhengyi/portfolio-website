import { PointerEvent } from 'react';

export default function handleOrbit(e: PointerEvent<HTMLDivElement>) {
  const amountX = (e.clientX / window.innerWidth) * 2 - 1;
  const amountY = -(e.clientY / window.innerHeight) * 2 + 1;
  //   console.log(amountX, amountY);
}
