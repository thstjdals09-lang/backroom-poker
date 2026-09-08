import { useState } from 'react';
import { useGame } from '../state/gameContext';
import { day1Defense } from '../data/pokerScenarios';
import type { PokerAction, PokerOutcome } from '../types';
import SceneFrame from '../components/SceneFrame';
import PokerCard from '../components/PokerCard';
import { playSfx } from '../audio/soundManager';

const ACTION_LABEL: Record<PokerAction, string> = {
  FOLD: 'FOLD',
  CALL: 'CALL',
  RAISE: 'RAISE',
};

type Phase = 'handIntro' | 'step' | 'outcome' | 'complete';

export default function DefenseScreen({
  scenarioSetId,
  requirement,
  onComplete,
}: {
  scenarioSetId: string;
  requirement: number;
  onComplete: () => void;
}) {
  const { state, dispatch } = useGame();
  const scenario = scenarioSetId === day1Defense.id ? day1Defense : day1Defense;

  const [handIdx, setHandIdx] = useState(0);
  const [stepId, setStepId] = useState(scenario.hands[0].startStep);
  const [phase, setPhase] = useState<Phase>('handIntro');
  const [outcome, setOutcome] = useState<PokerOutcome | null>(null);

  const hand = scenario.hands[handIdx];
  const step = hand.steps[stepId];

  function startHand(idx: number) {
    setHandIdx(idx);
    setStepId(scenario.hands[idx].startStep);
    setPhase('handIntro');
    playSfx('cardShuffle');
  }

  function playAction(action: PokerAction) {
    const result = step.outcomes[action];
    if (!result) return;
    playSfx('chip');
    if (result.effects && result.effects.length) {
      dispatch({ type: 'APPLY_EFFECTS', effects: result.effects });
    }
    setOutcome(result);
    setPhase('outcome');
  }

  function afterOutcome() {
    if (!outcome) return;
    if (outcome.next) {
      setStepId(outcome.next);
      setPhase('step');
      setOutcome(null);
      return;
    }
    // 이 핸드 종료
    if (handIdx + 1 < scenario.hands.length) {
      startHand(handIdx + 1);
    } else {
      playSfx('defenseSuccess');
      setPhase('complete');
    }
  }

  if (phase === 'handIntro') {
    return (
      <SceneFrame bgKey="defense_start_pov">
        <div className="center">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--accent)' }}>
            DEFENSE — {hand.title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '16px 0' }}>
            <PokerCard card={hand.heroCards[0]} />
            <PokerCard card={hand.heroCards[1]} />
          </div>
          <div className="popup-row">
            <span>POSITION</span>
            <span className="popup-value">{hand.position}</span>
          </div>
          <div className="popup-row">
            <span>STACK</span>
            <span className="popup-value">{hand.stackLabel}</span>
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              setPhase('step');
              playSfx('defenseStart');
            }}
          >
            핸드 시작
          </button>
        </div>
      </SceneFrame>
    );
  }

  if (phase === 'step') {
    return (
      <SceneFrame bgKey="defense_start_pov">
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
            <PokerCard card={hand.heroCards[0]} />
            <PokerCard card={hand.heroCards[1]} />
            <div style={{ width: 10 }} />
            {(step.board ?? []).map((c) => (
              <PokerCard key={c} card={c} />
            ))}
          </div>

          <div className="narration-text mt">{step.description}</div>

          <div className="pixel-panel pixel-panel--alt mt">
            {step.opponents.map((o) => (
              <div className="popup-row" key={o.name}>
                <span>{o.name}</span>
                <span className="popup-value" style={{ fontSize: 12 }}>
                  {o.note}
                </span>
              </div>
            ))}
          </div>

          {step.read && (
            <div className="tutorial-tip mt">
              <div className="tutorial-tip__tag">PLAYER READ</div>
              <div className="tutorial-tip__text">{step.read}</div>
            </div>
          )}

          <div className="choice-list mt">
            {step.actions.map((a) => (
              <button key={a} className="choice-btn center" onClick={() => playAction(a)}>
                {ACTION_LABEL[a]}
              </button>
            ))}
          </div>
        </div>
      </SceneFrame>
    );
  }

  if (phase === 'outcome' && outcome) {
    return (
      <SceneFrame bgKey="defense_start_pov">
        <div className="tap-area" onClick={afterOutcome}>
          <div className="dialogue-box">
            <div className="dialogue-speaker">결과</div>
            <div className="dialogue-line">{outcome.resultText}</div>
            <div className="tap-hint">▶</div>
          </div>
        </div>
      </SceneFrame>
    );
  }

  // complete
  const success = state.room.point >= requirement;
  return (
    <SceneFrame bgKey={success ? 'defense_win' : undefined}>
      <div className="center">
        <div
          className="pixel-panel"
          style={{ borderColor: success ? 'var(--good)' : 'var(--danger)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              color: success ? 'var(--good)' : 'var(--danger)',
            }}
          >
            {success ? 'DEFENSE SUCCESS' : 'DEFENSE — 아슬아슬'}
          </div>
          <div className="narration-text mt" style={{ fontSize: 13 }}>
            {success
              ? '테이블 운영에 필요한 포인트를 확보했습니다.'
              : '필요한 만큼 채우진 못했지만, 오늘은 여기까지가 최선이었다.'}
          </div>
          <div className="popup-row">
            <span>현재 포인트</span>
            <span className="popup-value">{state.room.point.toLocaleString()} P</span>
          </div>
        </div>
        <button className="primary-btn" onClick={onComplete}>
          계속
        </button>
      </div>
    </SceneFrame>
  );
}
