import Car from '../components/Car';
import Grid from '../components/Grid';
import Obstacle from '../components/Obstacle';
import { useAtom } from 'jotai';
import { obstaclesAtom, scoreAtom } from '../atoms/gameAtoms';
import { useEffect } from 'react';

export default function Game() {
  const [obstacles, setObstacles] = useAtom(obstaclesAtom);
  const [score] = useAtom(scoreAtom);

  const prevObstacleXPositions: (number | null)[] = [];

  const generateObstacle = () => {
    const obstacle = {
      id: Math.floor(Math.random() * 1000000),
      speed: 10,
      xPosition: Math.floor(Math.random() * 4),
      yPosition: -10,
    };

    if (prevObstacleXPositions.includes(obstacle.xPosition)) {
      return generateObstacle();
    }

    prevObstacleXPositions.push(obstacle.xPosition);
    if (prevObstacleXPositions.length > 2) {
      prevObstacleXPositions.shift();
    }

    setObstacles((prev) => [...prev, obstacle]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateObstacle();
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="absolute top-5 bg-black/50 px-4 py-2 rounded-md left-1/2 -translate-x-1/2 text-white text-2xl font-bold z-20">
        Score: {score}
      </div>
      <Grid />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          id={obstacle.id}
          xPosition={obstacle.xPosition}
          speed={obstacle.speed}
        />
      ))}
      <Car />
    </div>
  );
}
