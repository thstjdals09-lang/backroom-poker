import type { ReactNode } from 'react';
import { useGame } from '../state/gameContext';
import StatusBar from './StatusBar';
import StatPopup from './StatPopup';
import PokerRoomBackground from './PokerRoomBackground';

export default function SceneFrame({ children }: { children: ReactNode }) {
  const { state, dispatch } = useGame();
  return (
    <div className="app-frame">
      <div className="app-frame__bg">
        <PokerRoomBackground />
      </div>
      <div className="app-frame__scrim" />
      <StatusBar />
      <div className="scene-body">{children}</div>
      {state.pendingChanges.length > 0 && (
        <StatPopup
          changes={state.pendingChanges}
          onConfirm={() => dispatch({ type: 'CLEAR_PENDING' })}
        />
      )}
    </div>
  );
}
