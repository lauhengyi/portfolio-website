export default function getRandomAtlasUV(
  size: number,
  isFrontLane: boolean,
): [number, number] {
  let u = Math.floor(Math.random() * size);
  let v = Math.floor(Math.random() * (size / 2));
  if (!isFrontLane) {
    v += size / 2;
  }

  return [u / size, v / size];
}
