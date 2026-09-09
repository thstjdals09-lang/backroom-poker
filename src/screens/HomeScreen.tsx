import { useState } from 'react';
import { useGame, resetSave } from '../state/gameContext';
import SceneFrame from '../components/SceneFrame';
import PortraitFrame from '../components/PortraitFrame';
import PixelIcon from '../components/PixelIcon';
import {
  coffeeMachineLevels,
  dealerItem,
  day1LeftoverRepairs,
  secondTableGoal,
  type ManageFlagItem,
} from '../data/homeMenu';
import { getDay2StartBeatId } from '../data/day2Script';
import { DAY3_START_BEAT_ID } from '../data/day3Script';

type TabId = 'room' | 'players' | 'poker' | 'manage';

const TABS: { id: TabId; label: string }[] = [
  { id: 'room', label: 'ROOM' },
  { id: 'players', label: 'PLAYERS' },
  { id: 'poker', label: 'POKER' },
  { id: 'manage', label: 'MANAGE' },
];

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function LockedRow({
  icon,
  name,
  desc,
  tag,
}: {
  icon: Parameters<typeof PixelIcon>[0]['name'];
  name: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="pixel-panel pixel-panel--alt mt" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <PixelIcon name={icon} size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 2 }}>{desc}</div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          color: 'var(--accent-dim)',
          border: '1px solid var(--border)',
          borderRadius: 3,
          padding: '3px 6px',
          whiteSpace: 'nowrap',
        }}
      >
        {tag}
      </div>
    </div>
  );
}

function RoomTab() {
  const { state } = useGame();
  const { room, rumors } = state;
  return (
    <div>
      <div className="pixel-panel">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>{room.name}</div>
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
        <div className="popup-row">
          <span>테이블</span>
          <span className="popup-value">{room.tableCount}개</span>
        </div>
      </div>

      <div className="narration-text mt" style={{ fontSize: 12, textAlign: 'left' }}>
        소문
      </div>
      {rumors.length === 0 ? (
        <div className="pixel-panel pixel-panel--alt mt">
          <div style={{ fontSize: 12.5, color: 'var(--text-dim)' }}>아직 이 방에 붙은 소문은 없다.</div>
        </div>
      ) : (
        rumors.map((r) => (
          <div key={r.name} className="pixel-panel pixel-panel--alt mt">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--accent)' }}>
              「{r.name}」
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
              DAY {r.day} · {r.npc}에게 들음
            </div>
            {r.memory && (
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  marginTop: 8,
                  whiteSpace: 'pre-line',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                }}
              >
                “{r.memory}”
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function PlayersTab() {
  const { state } = useGame();
  const npcs = Object.values(state.npcs);
  return (
    <div>
      {npcs.map((npc) => (
        <div key={npc.id} className="pixel-panel mt" style={{ display: 'flex', gap: 12 }}>
          <PortraitFrame name={npc.name} npcId={npc.id} size="sm" inline />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>
                {npc.name} ({npc.age})
              </span>
              <span
                className="popup-value"
                style={{ fontSize: 12.5, color: npc.affinity >= 0 ? 'var(--good)' : 'var(--danger)' }}
              >
                호감도 {npc.affinity >= 0 ? '+' : ''}
                {npc.affinity}
              </span>
            </div>
            <div className="popup-row">
              <span>플레이 스타일</span>
              <span className="popup-value">{npc.pokerStyle}</span>
            </div>
            {npc.discovered && npc.note && (
              <div className="popup-row">
                <span>특징</span>
                <span className="popup-value">{npc.note}</span>
              </div>
            )}
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6, lineHeight: 1.5 }}>
              {npc.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PokerTab() {
  const { state } = useGame();
  const { player, ledger, day } = state;
  return (
    <div>
      <div className="pixel-panel">
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

      <div className="pixel-panel pixel-panel--alt mt">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, marginBottom: 6 }}>
          DAY {day} 방어전 기록
        </div>
        <div className="popup-row">
          <span>포커 수익</span>
          <span className={`popup-value ${ledger.pokerRevenue >= 0 ? 'up' : 'down'}`}>
            {ledger.pokerRevenue >= 0 ? '+' : ''}
            {ledger.pokerRevenue.toLocaleString()} P
          </span>
        </div>
      </div>

      <LockedRow icon="cards" name="연습 테이블" desc="한가할 때 감각을 유지한다." tag="DAY 2+" />
    </div>
  );
}

// MANAGE 탭에서 실제 구매 가능한 행. purchasable=false면 상태 태그만 보여준다.
function ManageRow({
  icon,
  name,
  desc,
  price,
  purchasable,
  disabledReason,
  onBuy,
}: {
  icon: Parameters<typeof PixelIcon>[0]['name'];
  name: string;
  desc: string;
  price: number;
  purchasable: boolean;
  disabledReason?: string;
  onBuy: () => void;
}) {
  return (
    <div className="pixel-panel pixel-panel--alt mt" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <PixelIcon name={icon} size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>₩{price.toLocaleString()}</div>
        {purchasable ? (
          <button className="ghost-btn" style={{ marginTop: 4, padding: '4px 10px', fontSize: 11 }} onClick={onBuy}>
            구매
          </button>
        ) : (
          <div
            style={{
              fontSize: 10,
              color: 'var(--accent-dim)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              padding: '2px 5px',
              marginTop: 4,
              whiteSpace: 'nowrap',
            }}
          >
            {disabledReason}
          </div>
        )}
      </div>
    </div>
  );
}

function ManageTab() {
  const { state, dispatch } = useGame();
  const { room, flags, day } = state;
  const unlocked = day >= 2; // Day2 종료 후부터 실제 구매 가능

  function buy(item: ManageFlagItem) {
    dispatch({
      type: 'APPLY_EFFECTS',
      effects: [
        { target: 'roomCash', delta: -item.price, label: item.name },
        { target: 'flag', key: item.flagKey, value: true },
        ...(item.extraEffects ?? []),
      ],
    });
  }

  function buyCoffeeLevel(level: (typeof coffeeMachineLevels)[number]) {
    dispatch({
      type: 'APPLY_EFFECTS',
      effects: [
        { target: 'roomCash', delta: -level.price, label: level.name },
        { target: 'flag', key: 'coffeeMachineLevel', value: level.level },
      ],
    });
  }

  const coffeeLevel = Number(flags.coffeeMachineLevel) || 0;
  const nextCoffeeLevel = coffeeMachineLevels.find((l) => l.level > coffeeLevel);

  function rowState(price: number) {
    if (!unlocked) return { purchasable: false, reason: 'DAY 2 이후' };
    if (room.cash < price) return { purchasable: false, reason: '현금 부족' };
    return { purchasable: true, reason: undefined };
  }

  return (
    <div>
      {!unlocked && (
        <div className="tutorial-tip">
          <div className="tutorial-tip__text" style={{ textAlign: 'center' }}>
            DAY 2가 끝나면 여기서 룸 시설을 실제로 투자할 수 있습니다.
          </div>
        </div>
      )}

      {nextCoffeeLevel &&
        (() => {
          const { purchasable, reason } = rowState(nextCoffeeLevel.price);
          return (
            <ManageRow
              icon={nextCoffeeLevel.icon}
              name={nextCoffeeLevel.name}
              desc={nextCoffeeLevel.desc}
              price={nextCoffeeLevel.price}
              purchasable={purchasable}
              disabledReason={reason}
              onBuy={() => buyCoffeeLevel(nextCoffeeLevel)}
            />
          );
        })()}

      {!flags.dealerHired &&
        (() => {
          const { purchasable, reason } = rowState(dealerItem.price);
          return (
            <ManageRow
              icon={dealerItem.icon}
              name={dealerItem.name}
              desc={dealerItem.desc}
              price={dealerItem.price}
              purchasable={purchasable}
              disabledReason={reason}
              onBuy={() => buy(dealerItem)}
            />
          );
        })()}

      {day1LeftoverRepairs
        .filter((item) => !(item.hideWhenOwned && flags[item.flagKey]))
        .map((item) => {
          const { purchasable, reason } = rowState(item.price);
          return (
            <ManageRow
              key={item.id}
              icon={item.icon}
              name={item.name}
              desc={item.desc}
              price={item.price}
              purchasable={purchasable}
              disabledReason={reason}
              onBuy={() => buy(item)}
            />
          );
        })}

      <ManageRow
        icon={secondTableGoal.icon}
        name={`${secondTableGoal.name} 🔒`}
        desc={secondTableGoal.desc}
        price={secondTableGoal.price}
        purchasable={false}
        disabledReason="조건 미충족"
        onBuy={() => {}}
      />
    </div>
  );
}

export default function HomeScreen() {
  const { state, dispatch } = useGame();
  const [tab, setTab] = useState<TabId>('room');

  return (
    <SceneFrame>
      <div>
        <div className="scene-label" style={{ fontSize: 20, padding: '4px 0 4px' }}>
          DAY {state.day} COMPLETE
        </div>
        <div className="narration-text" style={{ fontSize: 12.5, marginBottom: 16 }}>
          박사장은 아직 연락이 없다.
          {'\n'}내일도 문은 열어야 한다.
        </div>

        {state.day === 1 && (
          <button
            className="primary-btn"
            style={{ marginTop: 0, marginBottom: 16 }}
            onClick={() => {
              const beatId = getDay2StartBeatId(Boolean(state.flags.airconFixed));
              dispatch({ type: 'START_DAY', day: 2, beatId });
            }}
          >
            DAY 2 시작
          </button>
        )}

        {state.day === 2 && state.flags.day2Side === 'taesik' && (
          <button
            className="primary-btn"
            style={{ marginTop: 0, marginBottom: 16 }}
            onClick={() => dispatch({ type: 'START_DAY', day: 3, beatId: DAY3_START_BEAT_ID })}
          >
            DAY 3 시작
          </button>
        )}

        {(state.day >= 3 || (state.day === 2 && state.flags.day2Side !== 'taesik')) && (
          <div className="tutorial-tip" style={{ marginBottom: 16 }}>
            <div className="tutorial-tip__text" style={{ textAlign: 'center' }}>
              다음 Day는 아직 준비 중입니다.
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className="choice-btn center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12.5,
                padding: '10px 4px',
                borderColor: tab === t.id ? 'var(--accent)' : undefined,
                background: tab === t.id ? '#2c311f' : undefined,
              }}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'room' && <RoomTab />}
        {tab === 'players' && <PlayersTab />}
        {tab === 'poker' && <PokerTab />}
        {tab === 'manage' && <ManageTab />}

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
