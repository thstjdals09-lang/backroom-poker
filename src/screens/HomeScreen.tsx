import { useState } from 'react';
import { useGame, resetSave } from '../state/gameContext';
import SceneFrame from '../components/SceneFrame';
import PortraitFrame from '../components/PortraitFrame';
import PixelIcon from '../components/PixelIcon';
import { roomUpgrades, shopItems } from '../data/homeMenu';

type TabId = 'room' | 'players' | 'poker' | 'shop';

const TABS: { id: TabId; label: string }[] = [
  { id: 'room', label: 'ROOM' },
  { id: 'players', label: 'PLAYERS' },
  { id: 'poker', label: 'POKER' },
  { id: 'shop', label: 'SHOP' },
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
  const { room } = state;
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
        룸 업그레이드
      </div>
      {roomUpgrades.map((u) => (
        <LockedRow key={u.id} icon={u.icon} name={u.name} desc={u.desc} tag="DAY 2+" />
      ))}
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
  const { player, ledger } = state;
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
          DAY 1 방어전 기록
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

function ShopTab() {
  const { state } = useGame();
  return (
    <div>
      {shopItems.map((item) => (
        <div
          key={item.id}
          className="pixel-panel pixel-panel--alt mt"
          style={{ display: 'flex', gap: 10, alignItems: 'center' }}
        >
          <PixelIcon name={item.icon} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5 }}>{item.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 2 }}>{item.desc}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>
              ₩{item.price.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--accent-dim)',
                border: '1px solid var(--border)',
                borderRadius: 3,
                padding: '2px 5px',
                marginTop: 3,
              }}
            >
              DAY 2+
            </div>
          </div>
        </div>
      ))}
      <div className="narration-text mt" style={{ fontSize: 11.5 }}>
        보유 현금 ₩{state.room.cash.toLocaleString()} — 아직은 구경만 할 수 있다.
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const { dispatch } = useGame();
  const [tab, setTab] = useState<TabId>('room');

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
        {tab === 'shop' && <ShopTab />}

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
