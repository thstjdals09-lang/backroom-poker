// ============================================================
// Backroom Poker — Core Data Types
// 향후 Day2/Day3, 신규 NPC 추가를 염두에 두고
// 모든 게임 콘텐츠는 데이터(Beat/Scenario)로 표현하고,
// 엔진(StoryPlayer/DefenseScreen)은 그 데이터를 해석만 한다.
// ============================================================

export interface PlayerState {
  name: string;
  pokerSkill: number;
  roomSkill: number;
  mental: number; // 0-100
  personalMoney: number;
}

export interface RoomState {
  name: string;
  cash: number;
  point: number;
  reputation: number; // 0-5 (별 개수로 표시)
  tableCount: number;
  currentPlayers: string[]; // NPC id 목록 (현재 테이블에 앉아있는 손님)
}

export interface NPCData {
  id: string;
  name: string;
  age: number;
  description: string;
  affinity: number;
  pokerStyle: string; // 아직 파악 못했으면 '???'
  hiddenTraits: string[];
  dialogueState: string;
  discovered: boolean; // "NPC 정보 발견" 여부
  note?: string; // 짧은 특징 한 줄 (발견 시 표시)
}

export interface DayLedger {
  roomRevenue: number; // 룸 수익 (테이블 운영으로 번 포인트)
  pokerRevenue: number; // 포커 수익 (방어전 결과)
  creditLoss: number; // 외상 손실 (미수 관련)
  opEx: number; // 운영비 (전기/음료 등)
}

export type Flags = Record<string, string | number | boolean | undefined>;

// 플레이어가 실제로 획득한 소문만 담기는 목록 (도감이 아니라 기록).
export interface RumorEntry {
  name: string;
  day: number; // 획득한 날
  npc: string; // 처음 말해준 사람
  memory: string; // 주인공이 기억하는 문구
}

// ---------------- Effects ----------------
// 대사/선택지/이벤트가 게임 상태에 주는 영향을 표현하는 단일 단위.
// 새 효과 종류가 필요하면 target 유니온에 추가하면 된다.

export type EffectTarget =
  | 'mental'
  | 'personalMoney'
  | 'roomPoint'
  | 'roomCash'
  | 'roomReputation'
  | 'npcAffinity'
  | 'flag'
  | 'ledger'
  | 'trait'
  | 'rumor';

export interface Effect {
  target: EffectTarget;
  delta?: number; // mental / personalMoney / roomPoint / roomCash / roomReputation / npcAffinity / trait 에 사용
  npcId?: string; // target === 'npcAffinity' 일 때 필수
  key?: string; // target === 'flag' | 'ledger' | 'trait' 일 때 필수 (flag 이름 / ledger 항목명 / trait 축 이름)
  value?: string | number | boolean; // target === 'flag' | 'rumor' 일 때 사용 (rumor는 소문 이름 문자열)
  rumor?: { npc: string; memory: string }; // target === 'rumor' 일 때, 누가 말해줬는지 / 기억 문구
  label?: string; // 팝업에 표시할 커스텀 라벨 (없으면 자동 생성)
}

export interface StatChangeEntry {
  label: string;
  before: number;
  after: number;
}

// ---------------- Story Beats ----------------
// Day1 스크립트를 이루는 최소 단위. next로 서로 연결되는 간단한
// 스크립트 그래프(대부분 선형, 선택지에서만 분기).

export interface ChoiceOption {
  label: string;
  effects?: Effect[];
  next: string;
}

export type Beat =
  | { id: string; type: 'narration'; lines: string[]; next: string }
  | {
      id: string;
      type: 'dialogue';
      speaker: string;
      portrait?: string; // npc id, 없으면 주인공/내레이션 취급
      lines: string[];
      next: string;
    }
  | {
      id: string;
      type: 'choice';
      speaker?: string;
      prompt?: string;
      options: ChoiceOption[];
    }
  | { id: string; type: 'effects'; effects: Effect[]; next: string }
  | { id: string; type: 'tutorial'; text: string; next: string }
  | { id: string; type: 'sceneLabel'; label: string; next: string }
  | { id: string; type: 'statusPanel'; next: string }
  | { id: string; type: 'timeSkip'; times: string[]; lines?: string[]; next: string }
  | { id: string; type: 'npcEnter'; npcId: string; next: string }
  | { id: string; type: 'npcInfo'; npcId: string; note: string; next: string }
  | { id: string; type: 'tableStopped'; requirement: number; next: string }
  | { id: string; type: 'defense'; scenarioSetId: string; requirement: number; next: string }
  | { id: string; type: 'dayResult'; next: string }
  | {
      // 플레이어 조작 없이 flags[flagKey] 값에 따라 자동으로 분기하는 beat.
      // Day1 선택 결과 등 이미 정해진 상태값으로 스토리가 갈릴 때 쓴다.
      id: string;
      type: 'branch';
      flagKey: string;
      cases: Record<string, string>; // flag 값(문자열로 변환) -> 다음 beat id
      fallback: string; // 일치하는 case가 없을 때
    }
  | { id: string; type: 'end' };

// ---------------- Defense (방어) Poker Scenarios ----------------

export type PokerAction = 'FOLD' | 'CALL' | 'RAISE';

export interface OpponentInfo {
  name: string;
  note: string; // "최근 플레이: 공격적 / 현재 감정: 기분 좋음" 같은 짧은 정보
}

export interface PokerOutcome {
  resultText: string;
  effects?: Effect[];
  next?: string; // 다음 스텝 id (없으면 이 핸드 종료)
  endHand?: boolean;
}

export interface PokerStep {
  id: string;
  board?: string[]; // 이 시점까지 공개된 보드 카드
  description: string;
  opponents: OpponentInfo[];
  read?: string; // PLAYER READ 힌트
  actions: PokerAction[];
  outcomes: Partial<Record<PokerAction, PokerOutcome>>;
}

export interface PokerHand {
  id: string;
  title: string; // 예: "vs 재훈"
  heroCards: [string, string];
  position: string;
  stackLabel: string;
  startStep: string;
  steps: Record<string, PokerStep>;
}

export interface ScenarioSet {
  id: string;
  hands: PokerHand[];
}
