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
    next: 'd2_rumor_branch',
  },
  {
    id: 'd2_taesik_aircon_broken',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['야 씨발 이거 아직도 이래?'],
    next: 'd2_rumor_branch',
  },

  // ---------------- 첫 소문: Day1 미수 선택 결과가 반영된다 ----------------
  {
    id: 'd2_rumor_branch',
    type: 'branch',
    flagKey: 'creditChoice',
    cases: {
      granted: 'd2_rumor_granted_branch',
      refused: 'd2_rumor_refused_1',
      kicked: 'd2_rumor_kicked_1',
    },
    fallback: 'd2_business_start',
  },

  // 미수를 허용했던 경우, Day1 투자 선택(에어컨 수리 여부)에 따라
  // 태식이 손님을 막아주는지/플레이어가 직접 곤란을 겪는지가 갈린다.
  {
    id: 'd2_rumor_granted_branch',
    type: 'branch',
    flagKey: 'airconFixed',
    cases: { true: 'd2_rumor_granted_1' },
    fallback: 'd2_rumor_granted_noaircon_1',
  },

  // --- 1) 미수를 허용했던 경우 (+ 에어컨 수리함): 「미수 잘 되는 방」, 태식이 막아준다 ---
  { id: 'd2_rumor_granted_1', type: 'dialogue', speaker: '???', lines: ['"여기가 VARIANCE 맞죠?"'], next: 'd2_rumor_granted_2' },
  { id: 'd2_rumor_granted_2', type: 'dialogue', speaker: '주인공', lines: ['"네. 곧 첫 게임 스타트합니다."'], next: 'd2_rumor_granted_3' },
  {
    id: 'd2_rumor_granted_3',
    type: 'dialogue',
    speaker: '???',
    lines: ['"여기 「미수 잘 되는 방」이라면서요?"'],
    next: 'd2_rumor_granted_4',
  },
  { id: 'd2_rumor_granted_4', type: 'dialogue', speaker: '주인공', lines: ['"……뭐라고요?"'], next: 'd2_rumor_granted_5' },
  {
    id: 'd2_rumor_granted_5',
    type: 'dialogue',
    speaker: '???',
    lines: ['"급하면 렉 하나 정도 달아준다던데."'],
    next: 'd2_rumor_granted_6',
  },
  {
    id: 'd2_rumor_granted_6',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['야.'],
    next: 'd2_rumor_granted_7',
  },
  {
    id: 'd2_rumor_granted_7',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['너 여기서 언제 봤다고 미수야.'],
    next: 'd2_rumor_granted_8',
  },
  {
    id: 'd2_rumor_granted_8',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['꺼져.'],
    next: 'd2_rumor_granted_9',
  },
  { id: 'd2_rumor_granted_9', type: 'dialogue', speaker: '???', lines: ['"아니, 그냥 물어본 건데…"'], next: 'd2_rumor_granted_10' },
  {
    id: 'd2_rumor_granted_10',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['나가.'],
    next: 'd2_rumor_granted_11',
  },
  { id: 'd2_rumor_granted_11', type: 'narration', lines: ['손님이 나간다.'], next: 'd2_rumor_granted_12' },
  { id: 'd2_rumor_granted_12', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'd2_rumor_granted_13' },
  { id: 'd2_rumor_granted_13', type: 'dialogue', speaker: '주인공', lines: ['형이 왜 쫓아내요?'], next: 'd2_rumor_granted_14' },
  {
    id: 'd2_rumor_granted_14',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['아무나 미수 주기 시작하면 이 방 망해.'],
    next: 'd2_rumor_granted_gain',
  },
  {
    id: 'd2_rumor_granted_gain',
    type: 'effects',
    effects: [
      {
        target: 'rumor',
        value: '미수 잘 되는 방',
        rumor: {
          npc: '처음 본 손님',
          memory: '용철 아저씨 한 번 봐줬더니,\n다음 날 처음 보는 사람이 찾아왔다.',
        },
      },
    ],
    next: 'd2_rumor_granted_announce',
  },
  {
    id: 'd2_rumor_granted_announce',
    type: 'narration',
    lines: ['소문 획득\n「미수 잘 되는 방」'],
    next: 'd2_business_start',
  },

  // --- 1-b) 미수를 허용했던 경우 (+ 에어컨 안 고침): 태식이 안 막아주고 플레이어가 직접 곤란을 겪는다 ---
  {
    id: 'd2_rumor_granted_noaircon_1',
    type: 'dialogue',
    speaker: '???',
    lines: ['"여기 「미수 잘 되는 방」이라면서요?"'],
    next: 'd2_rumor_granted_noaircon_2',
  },
  {
    id: 'd2_rumor_granted_noaircon_2',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['"그게… 아무한테나 되는 건 아니고요."'],
    next: 'd2_rumor_granted_noaircon_3',
  },
  { id: 'd2_rumor_granted_noaircon_3', type: 'dialogue', speaker: '???', lines: ['"뭐예요 그럼."'], next: 'd2_rumor_granted_noaircon_4' },
  {
    id: 'd2_rumor_granted_noaircon_4',
    type: 'dialogue',
    speaker: '???',
    lines: ['"누군 되고 누군 안 되고…"'],
    next: 'd2_rumor_granted_noaircon_5',
  },
  {
    id: 'd2_rumor_granted_noaircon_5',
    type: 'dialogue',
    speaker: '???',
    lines: ['"씨, 장사를 뭐 이렇게 해."'],
    next: 'd2_rumor_granted_noaircon_6',
  },
  { id: 'd2_rumor_granted_noaircon_6', type: 'dialogue', speaker: '???', lines: ['"됐어요."'], next: 'd2_rumor_granted_noaircon_7' },
  { id: 'd2_rumor_granted_noaircon_7', type: 'narration', lines: ['손님이 나간다.'], next: 'd2_rumor_granted_noaircon_8' },
  { id: 'd2_rumor_granted_noaircon_8', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'd2_rumor_granted_noaircon_penalty' },
  {
    id: 'd2_rumor_granted_noaircon_penalty',
    type: 'effects',
    effects: [
      { target: 'mental', delta: -5 },
      {
        target: 'rumor',
        value: '미수 잘 되는 방',
        rumor: {
          npc: '처음 본 손님',
          memory: '용철 아저씨 한 번 봐줬더니,\n다음 날 처음 보는 사람이 찾아왔다.',
        },
      },
    ],
    next: 'd2_rumor_granted_noaircon_announce',
  },
  {
    id: 'd2_rumor_granted_noaircon_announce',
    type: 'narration',
    lines: ['소문 획득\n「미수 잘 되는 방」'],
    next: 'd2_business_start',
  },

  // --- 2) 미수를 거절했던 경우: 「돈 없으면 못 앉는 방」 ---
  {
    id: 'd2_rumor_refused_1',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['오늘 핸디 한 명 데려오려고 했는데.'],
    next: 'd2_rumor_refused_2',
  },
  { id: 'd2_rumor_refused_2', type: 'dialogue', speaker: '주인공', lines: ['왜 안 왔어요?'], next: 'd2_rumor_refused_3' },
  {
    id: 'd2_rumor_refused_3',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['여기 「돈 없으면 못 앉는 방」 아니냐고 안 온대요.'],
    next: 'd2_rumor_refused_4',
  },
  { id: 'd2_rumor_refused_4', type: 'dialogue', speaker: '주인공', lines: ['엥?'], next: 'd2_rumor_refused_5' },
  { id: 'd2_rumor_refused_5', type: 'dialogue', speaker: '주인공', lines: ['그게 무슨 소리예요?'], next: 'd2_rumor_refused_6' },
  {
    id: 'd2_rumor_refused_6',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['……설마 어제 용철 아저씨 미수 안 해준 것 때문인가.'],
    next: 'd2_rumor_refused_7',
  },
  {
    id: 'd2_rumor_refused_7',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['소문 금방 나네요...'],
    next: 'd2_rumor_refused_gain',
  },
  {
    id: 'd2_rumor_refused_gain',
    type: 'effects',
    effects: [
      {
        target: 'rumor',
        value: '돈 없으면 못 앉는 방',
        rumor: {
          npc: '재훈',
          memory: '용철 아저씨 미수를 거절한 게\n벌써 밖에 퍼져 있었다.',
        },
      },
    ],
    next: 'd2_rumor_refused_announce',
  },
  {
    id: 'd2_rumor_refused_announce',
    type: 'narration',
    lines: ['소문 획득\n「돈 없으면 못 앉는 방」'],
    next: 'd2_business_start',
  },

  // --- 3) 용철을 내쫓았던 경우: 「사장 성질 있는 데」 ---
  { id: 'd2_rumor_kicked_1', type: 'dialogue', speaker: '주인공', lines: ['용철이 형은 오늘 안 오시네요.'], next: 'd2_rumor_kicked_2' },
  {
    id: 'd2_rumor_kicked_2',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['오겠냐?'],
    next: 'd2_rumor_kicked_3',
  },
  { id: 'd2_rumor_kicked_3', type: 'dialogue', speaker: '주인공', lines: ['왜요.'], next: 'd2_rumor_kicked_4' },
  {
    id: 'd2_rumor_kicked_4',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['너 때문에 여기 「사장 성질 있는 데」라고 소문났어.'],
    next: 'd2_rumor_kicked_5',
  },
  { id: 'd2_rumor_kicked_5', type: 'dialogue', speaker: '주인공', lines: ['……벌써요?'], next: 'd2_rumor_kicked_6' },
  {
    id: 'd2_rumor_kicked_6',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['너 장사 그러다 망한다.'],
    next: 'd2_rumor_kicked_7',
  },
  { id: 'd2_rumor_kicked_7', type: 'dialogue', speaker: '주인공', lines: ['형은 왔잖아요.'], next: 'd2_rumor_kicked_8' },
  { id: 'd2_rumor_kicked_8', type: 'narration', lines: ['잠깐 정적.'], next: 'd2_rumor_kicked_9' },
  {
    id: 'd2_rumor_kicked_9',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['……'],
    next: 'd2_rumor_kicked_10',
  },
  {
    id: 'd2_rumor_kicked_10',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['에어컨 고친 거 맞냐?'],
    next: 'd2_rumor_kicked_gain',
  },
  {
    id: 'd2_rumor_kicked_gain',
    type: 'effects',
    effects: [
      {
        target: 'rumor',
        value: '사장 성질 있는 데',
        rumor: {
          npc: '태식',
          memory: '용철이 형을 내보낸 다음 날.\n태식은 장사 그러다 망한다고 했다.',
        },
      },
    ],
    next: 'd2_rumor_kicked_announce',
  },
  {
    id: 'd2_rumor_kicked_announce',
    type: 'narration',
    lines: ['소문 획득\n「사장 성질 있는 데」'],
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
