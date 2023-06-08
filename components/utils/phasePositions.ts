import { isMobile } from 'react-device-detect';

const phasePos: number[] = [0, 0.1, 0.3, 0.4, 0.9, isMobile ? 0.98 : 1];

export default phasePos;
