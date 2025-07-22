import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  obstaclesAtom,
  carXPositionAtom,
  hasGameStartedAtom,
  scoreAtom,
} from '../atoms/gameAtoms';
import { RESET } from 'jotai/utils';
import obstacle from '../assets/images/obstacle.png';
import {
  cloudStorage,
  shareMessage,
} from '@telegram-apps/sdk-react';

interface ObstacleProps {
  id: number;
  xPosition: number;
  speed: number;
}

export default function Obstacle({ id, xPosition, speed }: ObstacleProps) {
  const [, setObstacles] = useAtom(obstaclesAtom);
  const [carXPosition] = useAtom(carXPositionAtom);
  const [, setCarXPosition] = useAtom(carXPositionAtom);
  const [, setHasGameStarted] = useAtom(hasGameStartedAtom);
  const [yPosition, setYPosition] = useState(-10);
  const positions = ['left-1/16', 'left-5/16', 'left-9/16', 'left-13/16'];
  const [score, setScore] = useAtom(scoreAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setYPosition((prev) => {
        const newYPosition = prev + 1;

        // Update the obstacle's position in the global state
        setObstacles((prevObstacles) =>
          prevObstacles.map((obstacle) =>
            obstacle.id === id
              ? { ...obstacle, yPosition: newYPosition }
              : obstacle,
          ),
        );

        return newYPosition;
      });
    }, speed);

    // Cleanup interval to remove obstacles when they go off screen
    const cleanupInterval = setInterval(() => {
      setObstacles((prev) => {
        return prev.filter(
          (obstacle) => !(obstacle.id === id && obstacle.yPosition > 110),
        );
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [id, speed, setObstacles]);

  useEffect(() => {
    // if user crashes into obstacle
    if (yPosition >= 66 && yPosition <= 90 && xPosition === carXPosition) {
      const highScore = cloudStorage.getItem('highScore');
      if (score > Number(highScore)) {
        // send message on telegram
        const message = `consegui nuevo record chavales: ${score}!`;
        shareMessage(message);
        cloudStorage.setItem('highScore', score.toString());
      }
      setTimeout(() => {
        setHasGameStarted(false);
        setObstacles(RESET);
        setCarXPosition(RESET);
        setScore(RESET);
      }, 50);
    }
  }, [yPosition]);

  return (
    <img
      src={obstacle}
      className={`fixed h-24 rotate-180 ${positions[xPosition]}`}
      style={{ top: `${yPosition}%` }}
    />
  );
}
