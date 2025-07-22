import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { carXPositionAtom, scoreAtom } from '../atoms/gameAtoms';
import car from '../assets/images/car.png';

export default function Car() {
  const [position, setPosition] = useAtom(carXPositionAtom);
  const [, setScore] = useAtom(scoreAtom);
  const positions = ['left-1/16', 'left-5/16', 'left-9/16', 'left-13/16'];

  useEffect(() => {
    let lastScoreUpdate = 0;
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastScoreUpdate >= 1000) {
        setScore((prev) => prev + 1);
        lastScoreUpdate = now;
      }
      if (event.key === 'ArrowLeft') {
        setPosition((prev) => Math.max(0, prev - 1));
      } else if (event.key === 'ArrowRight') {
        setPosition((prev) => Math.min(positions.length - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [positions.length]);

  return (
    <img
      src={car}
      className={`absolute bottom-5 h-24 transition-all duration-100 ${positions[position]}`}
    />
  );
}
