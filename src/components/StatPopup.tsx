import type { StatChangeEntry } from '../types';

function fmt(n: number) {
  return n.toLocaleString();
}

export default function StatPopup({
  changes,
  onConfirm,
}: {
  changes: StatChangeEntry[];
  onConfirm: () => void;
}) {
  if (changes.length === 0) return null;
  return (
    <div className="popup-overlay" onClick={onConfirm}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-title">STATUS CHANGE</div>
        {changes.map((c, i) => {
          const dir = c.after > c.before ? 'up' : c.after < c.before ? 'down' : '';
          return (
            <div className="popup-row" key={i}>
              <span>{c.label}</span>
              <span className={`popup-value ${dir}`}>
                {fmt(c.before)} → {fmt(c.after)}
              </span>
            </div>
          );
        })}
        <button className="primary-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
