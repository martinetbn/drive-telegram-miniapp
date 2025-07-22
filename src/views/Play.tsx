import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { hasGameStartedAtom } from '../atoms/gameAtoms';
import { cloudStorage } from '@telegram-apps/sdk-react';

export default function Play() {
  const [, setHasGameStarted] = useAtom(hasGameStartedAtom);
  const [highScore, setHighScore] = useState<string>('');

  useEffect(() => {
    (async () => {
      const interval = setInterval(async () => {
        const highScore = await cloudStorage.getItem('highScore');
        setHighScore(highScore);
      }, 1000);

      return () => clearInterval(interval);
    })();

    return () => {
      setHighScore('');
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 z-20">
        <span className="text-white text-2xl font-bold">
          Press play to start
        </span>
        <span className="text-white text-sm">
          high score: {highScore.length > 0 ? highScore : 'N/A'}
        </span>
        <button
          className="bg-white text-black px-4 py-2 rounded-md active:scale-95 transition-all duration-100"
          onClick={() => setHasGameStarted(true)}
        >
          Play
        </button>
      </div>
    </div>
  );
}
