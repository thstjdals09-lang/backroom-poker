import { useGame } from '../state/gameContext';
import SceneFrame from '../components/SceneFrame';

function fmtSigned(n: number) {
  const s = Math.abs(n).toLocaleString();
  return n >= 0 ? `+${s}` : `-${s}`;
}

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

export default function DayResultScreen({ onContinue }: { onContinue: () => void }) {
  const { state } = useGame();
  const { ledger, player, room, flags } = state;
  const creditGranted = flags.creditChoice === 'granted';

  return (
    <SceneFrame>
      <div>
        <div
          className="scene-label"
          style={{ fontSize: 24, padding: '4px 0 16px' }}
        >
          DAY {state.day} RESULT
        </div>

        <div className="pixel-panel">
          <div className="popup-row">
            <span>룸 수익</span>
            <span className="popup-value up">{fmtSigned(ledger.roomRevenue)} P</span>
          </div>
          <div className="popup-row">
            <span>포커 수익</span>
            <span className={`popup-value ${ledger.pokerRevenue >= 0 ? 'up' : 'down'}`}>
              {fmtSigned(ledger.pokerRevenue)} P
            </span>
          </div>
          {creditGranted && (
            <div className="popup-row">
              <span>외상 (회수 대기)</span>
              <span className="popup-value down">{fmtSigned(-100000)} P</span>
            </div>
          )}
          <div className="popup-row">
            <span>전기 / 음료</span>
            <span className="popup-value down">{fmtSigned(ledger.opEx)} P</span>
          </div>
        </div>

        <div className="pixel-panel pixel-panel--alt mt">
          <div className="popup-row">
            <span>MENTAL</span>
            <span className="popup-value">{player.mental} / 100</span>
          </div>
          <div className="popup-row">
            <span>ROOM REPUTATION</span>
            <span className="popup-value stars">{stars(room.reputation)}</span>
          </div>
        </div>

        <button className="primary-btn" onClick={onContinue}>
          확인
        </button>
      </div>
    </SceneFrame>
  );
}
