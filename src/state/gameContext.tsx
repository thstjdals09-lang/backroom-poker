import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { DayLedger, Effect, Flags, NPCData, PlayerState, RoomState, StatChangeEntry } from '../types';
import { initialNPCs } from '../data/npcs';
import { START_BEAT_ID } from '../data/day1Script';

const SAVE_KEY = 'backroom-poker-save-v1';

export type Phase = 'title' | 'playing' | 'home';

export interface GameState {
  phase: Phase;
  day: number;
  currentBeatId: string;
  player: PlayerState;
  room: RoomState;
  npcs: Record<string, NPCData>;
  flags: Flags;
  ledger: DayLedger;
  // 플레이어의 운영 선택이 누적되는 성향 축(예: regularVsRule, leniency).
  // 지금은 UI에 노출하지 않고 이후 storylet 분기용으로만 쌓아둔다.
  traits: Record<string, number>;
  // 플레이어가 지금까지 획득한 소문 목록 (모아보기용). 못 얻은 소문은
  // 존재 자체를 모르는 게 맞으므로 여기 없으면 그냥 없는 것으로 취급한다.
  rumors: string[];
  pendingChanges: StatChangeEntry[]; // 화면에 보여줄 "전 → 후" 팝업 큐
}

function makeInitialState(): GameState {
  return {
    phase: 'title',
    day: 1,
    currentBeatId: START_BEAT_ID,
    player: {
      name: '사장',
      pokerSkill: 12,
      roomSkill: 8,
      mental: 64,
      personalMoney: 0,
    },
    room: {
      name: 'VARIANCE',
      cash: 742000,
      point: 18400,
      reputation: 1,
      tableCount: 1,
      currentPlayers: [],
    },
    npcs: Object.fromEntries(initialNPCs.map((n) => [n.id, { ...n }])),
    flags: {},
    ledger: { roomRevenue: 0, pokerRevenue: 0, creditLoss: 0, opEx: 0 },
    traits: {},
    rumors: [],
    pendingChanges: [],
  };
}

type Action =
  | { type: 'START_NEW_GAME' }
  | { type: 'CONTINUE'; state: GameState }
  | { type: 'GOTO'; beatId: string }
  | { type: 'APPLY_EFFECTS'; effects: Effect[] }
  | { type: 'CLEAR_PENDING' }
  | { type: 'NPC_ENTER'; npcId: string }
  | { type: 'NPC_DISCOVER'; npcId: string; note: string }
  | { type: 'GO_HOME' }
  | { type: 'RESET_GAME' }
  | { type: 'START_DAY'; day: number; beatId: string }
  | { type: 'DEBUG_JUMP'; day: number; beatId: string; flags?: Flags };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function labelFor(effect: Effect, npcs: Record<string, NPCData>): string {
  if (effect.label) return effect.label;
  switch (effect.target) {
    case 'mental':
      return 'MENTAL';
    case 'personalMoney':
      return '개인 자금';
    case 'roomPoint':
      return '룸 포인트';
    case 'roomCash':
      return '보유 현금';
    case 'roomReputation':
      return '평판';
    case 'npcAffinity':
      return `${npcs[effect.npcId ?? '']?.name ?? '???'} 친밀도`;
    case 'ledger':
      return effect.key ?? '기록';
    case 'trait':
      return effect.key ?? '성향';
    default:
      return '';
  }
}

export function applyEffects(
  state: GameState,
  effects: Effect[]
): { state: GameState; changes: StatChangeEntry[] } {
  let player = state.player;
  let room = state.room;
  let npcs = state.npcs;
  let flags = state.flags;
  let ledger = state.ledger;
  let traits = state.traits;
  let rumors = state.rumors;
  const changes: StatChangeEntry[] = [];

  for (const effect of effects) {
    switch (effect.target) {
      case 'mental': {
        const before = player.mental;
        const after = clamp(before + (effect.delta ?? 0), 0, 100);
        player = { ...player, mental: after };
        changes.push({ label: labelFor(effect, npcs), before, after });
        break;
      }
      case 'personalMoney': {
        const before = player.personalMoney;
        const after = before + (effect.delta ?? 0);
        player = { ...player, personalMoney: after };
        changes.push({ label: labelFor(effect, npcs), before, after });
        break;
      }
      case 'roomPoint': {
        const before = room.point;
        const after = before + (effect.delta ?? 0);
        room = { ...room, point: after };
        changes.push({ label: labelFor(effect, npcs), before, after });
        break;
      }
      case 'roomCash': {
        const before = room.cash;
        const after = before + (effect.delta ?? 0);
        room = { ...room, cash: after };
        changes.push({ label: labelFor(effect, npcs), before, after });
        break;
      }
      case 'roomReputation': {
        const before = room.reputation;
        const after = clamp(before + (effect.delta ?? 0), 0, 5);
        room = { ...room, reputation: after };
        changes.push({ label: labelFor(effect, npcs), before, after });
        break;
      }
      case 'npcAffinity': {
        const npc = effect.npcId ? npcs[effect.npcId] : undefined;
        if (npc) {
          const before = npc.affinity;
          const after = before + (effect.delta ?? 0);
          npcs = { ...npcs, [npc.id]: { ...npc, affinity: after } };
          changes.push({ label: labelFor(effect, npcs), before, after });
        }
        break;
      }
      case 'flag': {
        if (effect.key) {
          flags = { ...flags, [effect.key]: effect.value ?? true };
        }
        break;
      }
      case 'ledger': {
        if (effect.key) {
          const key = effect.key as keyof DayLedger;
          const before = ledger[key] ?? 0;
          const after = before + (effect.delta ?? 0);
          ledger = { ...ledger, [key]: after };
          changes.push({ label: labelFor(effect, npcs), before, after });
        }
        break;
      }
      case 'trait': {
        // 내부 성향 축. 팝업으로 보여주지 않고 조용히 누적만 한다.
        if (effect.key) {
          const before = traits[effect.key] ?? 0;
          const after = before + (effect.delta ?? 0);
          traits = { ...traits, [effect.key]: after };
        }
        break;
      }
      case 'rumor': {
        // 소문 획득. "소문 획득 「...」" 문구는 스토리 beat 자체에서
        // 보여주므로 여기선 목록에 조용히 추가만 한다(중복 방지).
        if (typeof effect.value === 'string' && !rumors.includes(effect.value)) {
          rumors = [...rumors, effect.value];
        }
        break;
      }
    }
  }

  return { state: { ...state, player, room, npcs, flags, ledger, traits, rumors }, changes };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_NEW_GAME':
      return { ...makeInitialState(), phase: 'playing' };
    case 'CONTINUE':
      return action.state;
    case 'GOTO':
      return { ...state, currentBeatId: action.beatId };
    case 'APPLY_EFFECTS': {
      const { state: nextState, changes } = applyEffects(state, action.effects);
      return { ...nextState, pendingChanges: [...state.pendingChanges, ...changes] };
    }
    case 'CLEAR_PENDING':
      return { ...state, pendingChanges: [] };
    case 'NPC_ENTER': {
      if (state.room.currentPlayers.includes(action.npcId)) return state;
      return {
        ...state,
        room: { ...state.room, currentPlayers: [...state.room.currentPlayers, action.npcId] },
      };
    }
    case 'NPC_DISCOVER': {
      const npc = state.npcs[action.npcId];
      if (!npc) return state;
      return {
        ...state,
        npcs: { ...state.npcs, [action.npcId]: { ...npc, discovered: true, note: action.note } },
      };
    }
    case 'GO_HOME':
      return { ...state, phase: 'home' };
    case 'RESET_GAME':
      return makeInitialState();
    case 'START_DAY':
      // 하루가 넘어갈 때 그날의 장부만 새로 열고(누적 자금/호감도/성향은
      // 그대로 이어짐) 지정된 beat부터 이어서 진행한다.
      return {
        ...state,
        day: action.day,
        phase: 'playing',
        currentBeatId: action.beatId,
        ledger: { roomRevenue: 0, pokerRevenue: 0, creditLoss: 0, opEx: 0 },
        pendingChanges: [],
      };
    case 'DEBUG_JUMP': {
      // 테스트용: 기본 상태에서 시작하되 지정된 day/beat/flags로 바로 진입한다.
      // NPC는 전부 이미 등장/파악된 것으로 처리해 중간 장면이 자연스럽게 보이게 한다.
      const base = makeInitialState();
      return {
        ...base,
        phase: 'playing',
        day: action.day,
        currentBeatId: action.beatId,
        flags: { ...base.flags, ...action.flags },
        room: {
          ...base.room,
          currentPlayers: Object.keys(base.npcs),
        },
        npcs: Object.fromEntries(
          Object.entries(base.npcs).map(([id, npc]) => [id, { ...npc, discovered: true }])
        ),
        pendingChanges: [],
      };
    }
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  hasSave: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  // 타이틀 화면은 항상 인트로부터 시작한다. 저장된 진행 상황은
  // "이어하기"를 눌렀을 때만 명시적으로 불러온다.
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState);

  useEffect(() => {
    if (state.phase === 'title') return;
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [state]);

  // state 전체가 바뀔 때마다(= 매 dispatch마다) 다시 계산한다. RESET_GAME
  // 직후에도 "이어하기" 버튼이 즉시 사라져야 하는데 phase만 의존성으로
  // 두면 title -> title처럼 값이 안 바뀌어 갱신을 놓치는 경우가 있었다.
  const hasSave = useMemo(() => loadSave() !== null, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch, hasSave }}>{children}</GameContext.Provider>
  );
}

export function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (!parsed.player || !parsed.room) return null;
    // traits/rumors 필드가 없던 이전 세이브도 안전하게 이어할 수 있도록 보정.
    if (!parsed.traits) parsed.traits = {};
    if (!parsed.rumors) parsed.rumors = [];
    return parsed;
  } catch {
    return null;
  }
}

export function resetSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
