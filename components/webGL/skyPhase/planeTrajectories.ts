interface IPlaneTrajectory {
  rotateY: number;
  rotateZ: number;
  startX: number;
  startZ: number;
  endX: number;
}

const planeTrajectories: IPlaneTrajectory[] = [
  {
    rotateY: 0,
    rotateZ: 0,
    startX: -35,
    startZ: -10,
    endX: 35,
  },
  {
    rotateZ: 0,
    rotateY: Math.PI,
    startX: 35,
    startZ: -15,
    endX: -35,
  },
];

export default planeTrajectories;
