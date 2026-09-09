import { useEffect, useState } from 'react';
import { useGame } from '../state/gameContext';
import { day1Beats } from '../data/day1Script';
import { day1Backgrounds } from '../data/day1Backgrounds';
import { day1Portraits } from '../data/day1Portraits';
import { day2Beats } from '../data/day2Script';
import { day2Backgrounds } from '../data/day2Backgrounds';
import { day2Portraits } from '../data/day2Portraits';
import type { Effect } from '../types';
import PortraitFrame from '../components/PortraitFrame';
import SceneFrame from '../components/SceneFrame';
import DefenseScreen from './DefenseScreen';
import DayResultScreen from './DayResultScreen';
import { playSfx } from '../audio/soundManager';

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// 「소문명」처럼 낫표로 감싼 구간을 노란색으로 강조해서 보여준다.
function renderRich(text: string) {
  return text.split(/(「[^」]*」)/g).map((part, i) =>
    part.startsWith('「') && part.endsWith('」') ? (
      <strong key={i} style={{ color: 'var(--accent)', fontWeight: 400 }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// 현재 day에 맞는 스크립트 세트를 고른다. Day3 이후를 추가할 땐
// 이 표에 한 줄만 더하면 된다.
const DAY_SCRIPTS: Record<number, { beats: typeof day1Beats; backgrounds: typeof day1Backgrounds; portraits: typeof day1Portraits }> = {
  1: { beats: day1Beats, backgrounds: day1Backgrounds, portraits: day1Portraits },
  2: { beats: day2Beats, backgrounds: day2Backgrounds, portraits: day2Portraits },
};

export default function StoryPlayer() {
  const { state, dispatch } = useGame();
  const script = DAY_SCRIPTS[state.day] ?? DAY_SCRIPTS[1];
  const activeBeats = script.beats;
  const activeBackgrounds = script.backgrounds;
  const activePortraits = script.portraits;
  const beat = activeBeats[state.currentBeatId];
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setLineIndex(0);
  }, [state.currentBeatId]);

  useEffect(() => {
    if (!beat) return;
    if (beat.type === 'npcEnter') {
      dispatch({ type: 'NPC_ENTER', npcId: beat.npcId });
      playSfx('doorOpen');
    } else if (beat.type === 'npcInfo') {
      dispatch({ type: 'NPC_DISCOVER', npcId: beat.npcId, note: beat.note });
    } else if (beat.type === 'effects') {
      dispatch({ type: 'APPLY_EFFECTS', effects: beat.effects });
      dispatch({ type: 'GOTO', beatId: beat.next });
    } else if (beat.type === 'branch') {
      const raw = state.flags[beat.flagKey];
      const key = raw === undefined ? '' : String(raw);
      const target = beat.cases[key] ?? beat.fallback;
      dispatch({ type: 'GOTO', beatId: target });
    } else if (beat.type === 'end') {
      dispatch({ type: 'GO_HOME' });
    } else if (beat.type === 'sceneLabel') {
      playSfx('eventTrigger');
    } else if (beat.type === 'statusPanel') {
      playSfx('fluorescentHum');
    } else if (beat.type === 'timeSkip') {
      playSfx('chip');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat?.id]);

  if (!beat) return null;

  const goto = (id: string) => dispatch({ type: 'GOTO', beatId: id });

  function chooseOption(effects: Effect[] | undefined, next: string) {
    playSfx('choiceClick');
    if (effects && effects.some((e) => e.target === 'mental' && (e.delta ?? 0) < 0)) {
      playSfx('mentalDown');
    }
    if (effects && effects.length) dispatch({ type: 'APPLY_EFFECTS', effects });
    goto(next);
  }

  let body: React.ReactNode = null;

  switch (beat.type) {
    case 'narration': {
      const isLast = lineIndex >= beat.lines.length - 1;
      body = (
        <div
          className="tap-area"
          onClick={() => (isLast ? goto(beat.next) : setLineIndex((i) => i + 1))}
        >
          <div className="narration-text">{renderRich(beat.lines[lineIndex])}</div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'dialogue': {
      const isLast = lineIndex >= beat.lines.length - 1;
      const npc = beat.portrait ? state.npcs[beat.portrait] : undefined;
      body = (
        <div
          className="tap-area"
          onClick={() => (isLast ? goto(beat.next) : setLineIndex((i) => i + 1))}
        >
          {npc && (
            <PortraitFrame name={npc.name} npcId={npc.id} imageKey={activePortraits[beat.id]} />
          )}
          <div className="dialogue-box">
            <div className="dialogue-speaker">{beat.speaker}</div>
            <div className="dialogue-line">{renderRich(beat.lines[lineIndex])}</div>
            <div className="tap-hint">▶</div>
          </div>
        </div>
      );
      break;
    }
    case 'choice': {
      body = (
        <div>
          {beat.prompt && <div className="narration-text mt">{beat.prompt}</div>}
          <div className="choice-list mt">
            {beat.options.map((opt, i) => (
              <button
                key={i}
                className="choice-btn"
                onClick={() => chooseOption(opt.effects, opt.next)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );
      break;
    }
    case 'tutorial': {
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div className="tutorial-tip">
            <div className="tutorial-tip__tag">TUTORIAL</div>
            <div className="tutorial-tip__text">{beat.text}</div>
          </div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'sceneLabel': {
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div className="scene-label fluoro-flicker">{beat.label}</div>
        </div>
      );
      break;
    }
    case 'statusPanel': {
      const { room, player } = state;
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div className="pixel-panel">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>
              {room.name}
            </div>
            <div className="popup-row">
              <span>테이블</span>
              <span className="popup-value">
                {room.currentPlayers.length > 0 ? '가동중' : `1 / ${room.tableCount}`}
              </span>
            </div>
            <div className="popup-row">
              <span>보유 현금</span>
              <span className="popup-value">₩{room.cash.toLocaleString()}</span>
            </div>
            <div className="popup-row">
              <span>룸 포인트</span>
              <span className="popup-value">{room.point.toLocaleString()} P</span>
            </div>
            <div className="popup-row">
              <span>평판</span>
              <span className="popup-value stars">{stars(room.reputation)}</span>
            </div>
          </div>
          <div className="pixel-panel pixel-panel--alt mt">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, marginBottom: 8 }}>
              주인공 상태
            </div>
            <div className="popup-row">
              <span>POKER</span>
              <span className="popup-value">{player.pokerSkill}</span>
            </div>
            <div className="popup-row">
              <span>ROOM</span>
              <span className="popup-value">{player.roomSkill}</span>
            </div>
            <div className="popup-row">
              <span>MENTAL</span>
              <span className="popup-value">{player.mental} / 100</span>
            </div>
          </div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'timeSkip': {
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div
            className="pixel-panel center"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: 2 }}
          >
            {beat.times.join('   ')}
          </div>
          {beat.lines && <div className="narration-text mt">{beat.lines.join('\n')}</div>}
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'npcEnter': {
      const npc = state.npcs[beat.npcId];
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <PortraitFrame name={npc.name} npcId={npc.id} />
          <div className="pixel-panel">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>
              {npc.name} ({npc.age}) 등장
            </div>
            <div className="narration-text" style={{ fontSize: 12.5, marginTop: 8 }}>
              {npc.description}
            </div>
          </div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'npcInfo': {
      const npc = state.npcs[beat.npcId];
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div className="pixel-panel">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--accent)' }}>
              NPC 정보 발견
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginTop: 6 }}>
              {npc.name}
            </div>
            <div className="popup-row">
              <span>플레이 스타일</span>
              <span className="popup-value">{npc.pokerStyle}</span>
            </div>
            <div className="popup-row">
              <span>특징</span>
              <span className="popup-value">{beat.note}</span>
            </div>
          </div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'tableStopped': {
      const shortfall = Math.max(0, beat.requirement - state.room.point);
      body = (
        <div className="tap-area" onClick={() => goto(beat.next)}>
          <div className="pixel-panel" style={{ borderColor: 'var(--danger)' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                color: 'var(--danger)',
                marginBottom: 8,
              }}
            >
              TABLE STOPPED
            </div>
            <div className="narration-text" style={{ fontSize: 13 }}>
              게임을 지속하기 위해 {beat.requirement.toLocaleString()} P가 필요합니다.
            </div>
            <div className="popup-row">
              <span>현재 보유</span>
              <span className="popup-value">{state.room.point.toLocaleString()} P</span>
            </div>
            <div className="popup-row">
              <span>부족</span>
              <span className="popup-value down">{shortfall.toLocaleString()} P</span>
            </div>
          </div>
          <div className="center tap-hint" style={{ position: 'static', marginTop: 10 }}>
            탭하여 계속
          </div>
        </div>
      );
      break;
    }
    case 'defense': {
      return (
        <DefenseScreen
          scenarioSetId={beat.scenarioSetId}
          requirement={beat.requirement}
          onComplete={() => goto(beat.next)}
        />
      );
    }
    case 'dayResult': {
      return <DayResultScreen bgKey={activeBackgrounds[beat.id]} onContinue={() => goto(beat.next)} />;
    }
    case 'end':
      return null;
    case 'branch':
      return null;
  }

  return <SceneFrame bgKey={activeBackgrounds[beat.id]}>{body}</SceneFrame>;
}
