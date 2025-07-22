import { useAtom } from 'jotai';
import { hasGameStartedAtom } from '../atoms/gameAtoms';

export default function Play() {
  const [, setHasGameStarted] = useAtom(hasGameStartedAtom);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 z-20">
        <span className="text-white text-2xl font-bold">
          Press play to start
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
