import type { Beat } from '../types';

// ============================================================
// Day 2 — 태식 vs 재훈
// Day1과 같은 구조(Beat 그래프)를 그대로 재사용한다.
// 시작 지점은 두 갈래(에어컨을 고쳤는지)로 나뉘고, 그 뒤로는 하나의
// 선으로 합쳐졌다가 선택지에서 다시 갈라진다.
// ============================================================

const beats: Beat[] = [
  // ---------------- 전날 투자 결과 반영 ----------------
  { id: 'd2_label_fixed', type: 'sceneLabel', label: 'DAY 2', next: 'd2_taesik_aircon_fixed' },
  { id: 'd2_label_broken', type: 'sceneLabel', label: 'DAY 2', next: 'd2_taesik_aircon_broken' },
  {
    id: 'd2_taesik_aircon_fixed',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['오, 고쳤네?'],
    next: 'd2_business_start',
  },
  {
    id: 'd2_taesik_aircon_broken',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['야 씨발 이거 아직도 이래?'],
    next: 'd2_business_start',
  },

  // ---------------- 영업 재개 ----------------
  { id: 'd2_business_start', type: 'narration', lines: ['그래도 문은 연다.'], next: 'd2_npc_settle' },
  {
    id: 'd2_npc_settle',
    type: 'narration',
    lines: ['재훈이 먼저 자리를 잡는다.', '휴대폰을 손에 쥔 채로.'],
    next: 'd2_phone_repeat',
  },
  {
    id: 'd2_phone_repeat',
    type: 'narration',
    lines: ['게임이 진행되는 동안,', '재훈의 액션이 계속 늦어진다.'],
    next: 'd2_taesik_snap',
  },

  // ---------------- 태식 vs 재훈 충돌 ----------------
  {
    id: 'd2_taesik_snap',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['야, 폰 할 거면 집에서 쳐.'],
    next: 'd2_jaehoon_r1',
  },
  {
    id: 'd2_jaehoon_r1',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['형이 왜 자꾸 뭐라 해요?'],
    next: 'd2_taesik_r2',
  },
  {
    id: 'd2_taesik_r2',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['니 때문에 게임이 안 굴러가잖아.'],
    next: 'd2_jaehoon_r2',
  },
  {
    id: 'd2_jaehoon_r2',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['사장도 가만히 있는데 형이 왜 룰을 정해요?'],
    next: 'd2_tension',
  },
  { id: 'd2_tension', type: 'narration', lines: ['분위기가 싸해진다.'], next: 'd2_choice' },

  // ---------------- 플레이어 개입 ----------------
  {
    id: 'd2_choice',
    type: 'choice',
    speaker: '주인공',
    options: [
      {
        label: '"재훈아. 게임 중엔 폰 좀 내려놔."',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: 6, label: '태식 친밀도' },
          { target: 'npcAffinity', npcId: 'jaehoon', delta: -8, label: '재훈 친밀도' },
          { target: 'flag', key: 'day2Side', value: 'taesik' },
          { target: 'trait', key: 'regularVsRule', delta: 2 },
        ],
        next: 'd2_after_a1',
      },
      {
        label: '"형. 그건 제가 말할게요."',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: -8, label: '태식 친밀도' },
          { target: 'npcAffinity', npcId: 'jaehoon', delta: 6, label: '재훈 친밀도' },
          { target: 'flag', key: 'day2Side', value: 'jaehoon' },
          { target: 'trait', key: 'regularVsRule', delta: -2 },
        ],
        next: 'd2_after_b1',
      },
    ],
  },

  // ---------------- 태식 편 결과 ----------------
  {
    id: 'd2_after_a1',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['그래, 그거지.'],
    next: 'd2_after_a2',
  },
  {
    id: 'd2_after_a2',
    type: 'narration',
    lines: ['재훈이 말없이 휴대폰을 주머니에 넣는다.', '표정이 좋지 않다.'],
    next: 'd2_wrap',
  },

  // ---------------- 재훈 편 결과 ----------------
  {
    id: 'd2_after_b1',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['……고마워요.'],
    next: 'd2_after_b2',
  },
  {
    id: 'd2_after_b2',
    type: 'narration',
    lines: ['태식이 팔짱을 낀 채 아무 말도 하지 않는다.', '오늘 처음으로, 사장 말에 걸렸다.'],
    next: 'd2_wrap',
  },

  { id: 'd2_wrap', type: 'narration', lines: ['그날 밤도 그렇게 지나갔다.'], next: 'day2_complete' },
  { id: 'day2_complete', type: 'end' },
];

export const day2Beats: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));

// HomeScreen에서 Day2를 시작할 때, 전날 에어컨 수리 여부(flags.airconFixed)에
// 따라 두 시작점 중 하나를 고른다.
export function getDay2StartBeatId(airconFixed: boolean): string {
  return airconFixed ? 'd2_label_fixed' : 'd2_label_broken';
}
