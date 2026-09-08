import { useGame } from '../state/gameContext';

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

export default function StatusBar() {
  const { state } = useGame();
  const { room, player } = state;

  return (
    <div className="status-bar">
      <div className="status-bar__item">
        <div className="status-bar__label">ROOM POINT</div>
        <div className="status-bar__value">{room.point.toLocaleString()} P</div>
      </div>
      <div className="status-bar__item">
        <div className="status-bar__label">CASH</div>
        <div className="status-bar__value">₩{room.cash.toLocaleString()}</div>
      </div>
      <div className="status-bar__item">
        <div className="status-bar__label">MENTAL</div>
        <div className="status-bar__value">{player.mental}/100</div>
      </div>
      <div className="status-bar__item">
        <div className="status-bar__label">REP</div>
        <div className="status-bar__value stars">{stars(room.reputation)}</div>
      </div>
    </div>
  );
}
