import { GameProvider, useGame } from './state/gameContext';
import TitleScreen from './screens/TitleScreen';
import StoryPlayer from './screens/StoryPlayer';
import HomeScreen from './screens/HomeScreen';

function Router() {
  const { state } = useGame();
  if (state.phase === 'title') return <TitleScreen />;
  if (state.phase === 'home') return <HomeScreen />;
  return <StoryPlayer />;
}

function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}

export default App;
