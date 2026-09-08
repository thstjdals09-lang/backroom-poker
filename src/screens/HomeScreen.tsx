import { useState } from 'react';
import { useGame, resetSave } from '../state/gameContext';
import SceneFrame from '../components/SceneFrame';

const MENU = [
  { id: 'room', label: 'ROOM', desc: '포커룸을 꾸미고 관리합니다.' },
  { id: 'players', label: 'PLAYERS', desc: '단골 손님들의 정보를 확인합니다.' },
  { id: 'poker', label: 'POKER', desc: '직접 테이블에 앉아 실력을 키웁니다.' },
  { id: 'shop', label: 'SHOP', desc: '필요한 물건을 사고팝니다.' },
];

export default function HomeScreen() {
  const { dispatch } = useGame();
  const [openTile, setOpenTile] = useState<string | null>(null);

  return (
    <SceneFrame>
      <div>
        <div className="scene-label" style={{ fontSize: 20, padding: '4px 0 4px' }}>
          DAY 1 COMPLETE
        </div>
        <div className="narration-text" style={{ fontSize: 12.5, marginBottom: 16 }}>
          박사장은 아직 연락이 없다.
          {'\n'}내일도 문은 열어야 한다.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MENU.map((m) => (
            <button
              key={m.id}
              className="choice-btn center"
              style={{ fontFamily: 'var(--font-display)', fontSize: 15, padding: '18px 10px' }}
              onClick={() => setOpenTile(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {openTile && (
          <div className="pixel-panel mt">
            <div className="narration-text" style={{ fontSize: 13 }}>
              {MENU.find((m) => m.id === openTile)?.desc}
              {'\n'}(Day 2부터 열립니다 — 지금은 placeholder)
            </div>
            <button className="ghost-btn" onClick={() => setOpenTile(null)}>
              닫기
            </button>
          </div>
        )}

        <button
          className="ghost-btn mt"
          onClick={() => {
            if (confirm('저장된 진행 상황을 모두 초기화할까요?')) {
              resetSave();
              dispatch({ type: 'RESET_GAME' });
            }
          }}
        >
          Reset Game
        </button>
      </div>
    </SceneFrame>
  );
}
