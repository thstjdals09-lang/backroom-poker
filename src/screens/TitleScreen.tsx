import { useEffect, useState } from 'react';
import { useGame, resetSave, loadSave } from '../state/gameContext';
import { playSfx } from '../audio/soundManager';
import RoomBackground from '../components/RoomBackground';
import MenuButton from '../components/MenuButton';
import TextLinkButton from '../components/TextLinkButton';

// Day 1 오프닝 — 타이틀 화면 다음, "영업 시작"을 누르기 전까지 보여주는
// 도입 내레이션. 한 화면에 1~2문장만 담아 텍스트를 크게 보여준다.
const OPENING_LINES = [
  '서울 어딘가.\n밤이 되면 아는 사람들만 내려가는 계단이 있다.',
  '간판도 제대로 없다.\n문에 붙은 종이 한 장이 전부다.',
  'VARIANCE.',
  '테이블 하나.\n짝짝이 의자 여섯 개.',
  '매일 밤 여기엔 비슷한 인간들이 모였다.',
  '돈을 잃고 욕을 하고,\n다시는 안 온다면서 다음 날 또 온다.',
  '나도 그중 하나였다.',
  '거의 매일 여기서 카드를 쳤다.',
  '잘 풀리는 날엔 생활비를 벌었고,\n안 풀리는 날엔... 다음 판돈부터 걱정했다.',
  '그래도 다음 날이면 또 왔다.',
  '이 방을 굴리던 사람은 박사장.',
  '"나 지방 좀 내려갔다 올게."',
  '"네."',
  '그리고 갑자기 열쇠를 던졌다.',
  '"그동안 니가 여기 좀 봐."',
  '"제가요?"',
  '"어."',
  '"얼마나요?"',
  '"몰라."',
  '그게 47일 전이다.',
  '박사장은 아직 안 왔다.\n전화도 잘 안 받는다.',
  '대신 월세는 꼬박꼬박 나간다.\n전기세도 나간다.',
  '그런데 손님은 계속 온다.',
  '……',
  '다행이지 않냐고...?',
];

const KEYWORD = /(VARIANCE|47일)/g;

function renderLine(text: string) {
  return text.split(KEYWORD).map((part, i) =>
    part === 'VARIANCE' || part === '47일' ? (
      <strong key={i} style={{ color: 'var(--accent)', fontWeight: 400 }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

type Phase = 'title' | 'opening';

export default function TitleScreen() {
  const { dispatch, hasSave } = useGame();
  const [phase, setPhase] = useState<Phase>('title');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    playSfx('cardShuffle');
  }, []);

  const isLastLine = lineIndex === OPENING_LINES.length - 1;
  const isHero = OPENING_LINES[lineIndex] === 'VARIANCE.';

  function advance() {
    if (!isLastLine) setLineIndex((i) => i + 1);
  }

  const base = import.meta.env.BASE_URL;

  return (
    <div className="app-frame" style={{ justifyContent: 'center' }}>
      {phase === 'title' && (
        <>
          <div className="app-frame__bg">
            <img
              src={`${base}ui/title_background.png`}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div className="title-scrim" />
        </>
      )}

      {phase === 'opening' && (
        <>
          <div className="app-frame__bg">
            <RoomBackground bgKey="intro_stairwell_variance" />
          </div>
          <div className="app-frame__scrim" />
          <div className="opening-overlay" />
        </>
      )}

      <div
        className="scene-body"
        style={{ justifyContent: 'center', gap: 28 }}
        onClick={phase === 'opening' && !isLastLine ? advance : undefined}
      >
        {phase === 'title' && (
          <div className="title-menu">
            <img className="title-menu__logo" src={`${base}ui/variance_logo.png`} alt="VARIANCE — A Backroom Poker Story" />

            <div className="title-menu__buttons">
              <MenuButton
                onClick={() => {
                  setPhase('opening');
                  setLineIndex(0);
                }}
              >
                새 게임
              </MenuButton>

              {hasSave && (
                <MenuButton
                  onClick={() => {
                    const saved = loadSave();
                    if (saved) dispatch({ type: 'CONTINUE', state: saved });
                  }}
                >
                  이어하기
                </MenuButton>
              )}
            </div>

            <TextLinkButton
              onClick={() => {
                if (confirm('저장된 진행 상황을 모두 초기화할까요?')) {
                  resetSave();
                  dispatch({ type: 'RESET_GAME' });
                }
              }}
            >
              Reset Game
            </TextLinkButton>
          </div>
        )}

        {phase === 'opening' && (
          <>
            <div className={`opening-text ${isHero ? 'opening-text--hero' : ''}`}>
              {renderLine(OPENING_LINES[lineIndex])}
            </div>
            {isLastLine ? (
              <button
                className="primary-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'START_NEW_GAME' });
                }}
              >
                영업 시작
              </button>
            ) : (
              <div className="center tap-hint" style={{ position: 'static' }}>
                탭하여 계속
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
