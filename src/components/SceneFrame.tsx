import type { ReactNode } from 'react';
import { useGame } from '../state/gameContext';
import StatusBar from './StatusBar';
import StatPopup from './StatPopup';

export default function SceneFrame({ children }: { children: ReactNode }) {
  const { state, dispatch } = useGame();
  return (
    <div className="app-frame">
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
