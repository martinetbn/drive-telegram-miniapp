import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  obstaclesAtom,
  carXPositionAtom,
  hasGameStartedAtom,
  scoreAtom,
} from '../atoms/gameAtoms';
import { RESET } from 'jotai/utils';
import obstacle from '../assets/images/obstacle.png';
import { cloudStorage } from '@telegram-apps/sdk-react';

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
  const isOffScreen = useRef(false);
  const hasCollided = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setYPosition((prev) => {
        const newYPosition = prev + 1;

        // Check if obstacle is off screen
        if (newYPosition > 110 && !isOffScreen.current) {
          isOffScreen.current = true;
          // Remove from global state when off screen
          setObstacles((prevObstacles) =>
            prevObstacles.filter((obstacle) => obstacle.id !== id),
          );
        }

        return newYPosition;
      });
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [id, speed, setObstacles]);

  useEffect(() => {
    // if user crashes into obstacle and hasn't already collided
    if (
      yPosition >= 66 &&
      yPosition <= 90 &&
      xPosition === carXPosition &&
      !hasCollided.current
    ) {
      hasCollided.current = true;

      (async () => {
        const highScore = await cloudStorage.getItem('highScore');
        if (score > Number(highScore)) {
          cloudStorage.setItem('highScore', score.toString());
        }
      })();

      // Use setTimeout to defer state updates to next tick
      setTimeout(() => {
        setHasGameStarted(false);
        setObstacles(RESET);
        setCarXPosition(RESET);
        setScore(RESET);
      }, 50);
    }
  }, [
    yPosition,
    xPosition,
    carXPosition,
    score,
    setHasGameStarted,
    setObstacles,
    setCarXPosition,
    setScore,
  ]);

  // Don't render if off screen
  if (isOffScreen.current) {
    return null;
  }

  return (
    <img
      src={obstacle}
      className={`fixed h-24 rotate-180 ${positions[xPosition]}`}
      style={{ top: `${yPosition}%` }}
    />
  );
}
