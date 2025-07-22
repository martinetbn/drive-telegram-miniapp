import { atomWithReset } from 'jotai/utils';

interface Obstacle {
  id: number;
  speed: number;
  xPosition: number;
  yPosition: number;
}

export const hasGameStartedAtom = atomWithReset<boolean>(false);
export const obstaclesAtom = atomWithReset<Obstacle[]>([]);
export const carXPositionAtom = atomWithReset<number>(1);
export const scoreAtom = atomWithReset<number>(0);