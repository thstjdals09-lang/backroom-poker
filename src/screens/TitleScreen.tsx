import { useEffect, useState } from 'react';
import { useGame, resetSave, loadSave } from '../state/gameContext';
import { playSfx } from '../audio/soundManager';
import RoomBackground from '../components/RoomBackground';

const OPEN_LINES = [
  '가진 돈은 별로 없었다.',
  '할 줄 아는 것도 별로 없었다.',
  '그래도 카드 치는 사람들 옆에는 오래 있었다.',
  '그리고 어느 날,\n포커룸 하나가 내 것이 됐다.',
];

export default function TitleScreen() {
  const { dispatch, hasSave } = useGame();
  const [lineIndex, setLineIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    playSfx('cardShuffle');
  }, []);

  function advance() {
    if (lineIndex < OPEN_LINES.length - 1) {
      setLineIndex((i) => i + 1);
    } else {
      setShowMenu(true);
    }
  }

  return (
    <div className="app-frame" style={{ justifyContent: 'center' }}>
      <div className="app-frame__bg">
        <RoomBackground />
      </div>
      <div className="app-frame__scrim" />
      <div className="scene-body" style={{ justifyContent: 'center', gap: 24 }} onClick={!showMenu ? advance : undefined}>
        {!showMenu && (
          <>
            <div className="narration-text" style={{ fontSize: 16, minHeight: 96 }}>
              {OPEN_LINES[lineIndex]}
            </div>
            <div className="center tap-hint" style={{ position: 'static' }}>
              탭하여 계속
            </div>
          </>
        )}

        {showMenu && (
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 30,
                letterSpacing: 2,
                color: 'var(--fluoro)',
                margin: '0 0 4px',
              }}
              className="fluoro-flicker"
            >
              ♠ ACE ♠
            </h1>
            <div style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 26 }}>
              오늘 포가 비었다
            </div>

            <button
              className="primary-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'START_NEW_GAME' });
              }}
            >
              새 게임
            </button>

            {hasSave && (
              <button
                className="ghost-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const saved = loadSave();
                  if (saved) dispatch({ type: 'CONTINUE', state: saved });
                }}
              >
                이어하기
              </button>
            )}

            <button
              className="ghost-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('저장된 진행 상황을 모두 초기화할까요?')) {
                  resetSave();
                  dispatch({ type: 'RESET_GAME' });
                }
              }}
            >
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
