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
      name: 'ACE',
      cash: 742000,
      point: 18400,
      reputation: 1,
      tableCount: 1,
      currentPlayers: [],
    },
    npcs: Object.fromEntries(initialNPCs.map((n) => [n.id, { ...n }])),
    flags: {},
    ledger: { roomRevenue: 0, pokerRevenue: 0, creditLoss: 0, opEx: 0 },
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
  | { type: 'RESET_GAME' };

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
    }
  }

  return { state: { ...state, player, room, npcs, flags, ledger }, changes };
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

  const hasSave = useMemo(() => loadSave() !== null, [state.phase]);

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
