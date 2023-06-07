interface IPlaneTrajectory {
  rotateY: number;
  rotateZ: number;
  startX: number;
  startZ: number;
  endX: number;
}

const planeTrajectories: IPlaneTrajectory[] = [
  /*
  Going from left to right
  */
  // Straight
  {
    rotateY: 0,
    rotateZ: 0,
    startX: -35,
    startZ: -10,
    endX: 35,
  },
  // Outwards going up
  {
    rotateY: Math.PI * 0.1,
    rotateZ: Math.PI * 0.05,
    startX: -35,
    startZ: -20,
    endX: 35,
  },
  // // Outwards going down
  // {
  //   rotateY: Math.PI * 0.12,
  //   rotateZ: Math.PI * -0.04,
  //   startX: -35,
  //   startZ: -25,
  //   endX: 35,
  // },
  // // Inwards going up
  // {
  //   rotateY: Math.PI * 1.13,
  //   rotateZ: Math.PI * 0.06,
  //   startX: -35,
  //   startZ: -30,
  //   endX: 35,
  // },
  // // Inwards going down
  // {
  //   rotateY: Math.PI * 1.11,
  //   rotateZ: Math.PI * -0.02,
  //   startX: -35,
  //   startZ: -35,
  //   endX: 35,
  // },
  /*
  Going from right to left
  */
  // // Straight
  // {
  //   rotateY: Math.PI,
  //   rotateZ: 0,
  //   startX: 35,
  //   startZ: -15,
  //   endX: -35,
  // },
  // Inwards going down
  {
    rotateY: Math.PI * 1.1,
    rotateZ: Math.PI * -0.03,
    startX: 35,
    startZ: -20,
    endX: -35,
  },
  // // Outwards going down
  // {
  //   rotateY: Math.PI * 0.9,
  //   rotateZ: Math.PI * -0.03,
  //   startX: 35,
  //   startZ: -25,
  //   endX: -35,
  // },
  // Inwards going up
  {
    rotateY: Math.PI * 1.08,
    rotateZ: Math.PI * 0.03,
    startX: 35,
    startZ: -30,
    endX: -35,
  },
  // // Outwards going up
  // {
  //   rotateY: Math.PI * 0.85,
  //   rotateZ: Math.PI * 0.04,
  //   startX: 35,
  //   startZ: -30,
  //   endX: -35,
  // },
];

export default planeTrajectories;
