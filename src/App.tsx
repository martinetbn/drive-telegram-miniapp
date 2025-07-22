import { useAtom } from 'jotai';
import { hasGameStartedAtom } from './atoms/gameAtoms';
import Play from './views/Play';
import Game from './views/Game';

export default function App() {
  const [hasGameStarted] = useAtom(hasGameStartedAtom);

  return hasGameStarted ? <Game /> : <Play />;
}
