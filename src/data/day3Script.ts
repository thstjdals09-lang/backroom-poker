import type { Beat } from '../types';

// ============================================================
// Day 3 — 「태식데이」
// Day2에서 태식 편(flags.day2Side === 'taesik')을 든 경우에만 진입한다.
// 구조는 Day1/Day2와 동일한 Beat 그래프. 재훈이 빠진 자리를 태식이
// 자기 사람들("핸디")로 채우고, 용철이 Day1 미수 선택에 따라 다른
// 태도로 재등장한 뒤, 판돈을 올리자는 분위기에서 플레이어가
// 태식의 체면을 살려줄지 원칙을 지킬지 선택한다.
// ============================================================

const beats: Beat[] = [
  // ---------------- 1. Day3 시작 — 재훈이 안 보인다 ----------------
  { id: 'd3_label', type: 'sceneLabel', label: 'DAY 3', next: 'd3_open_1' },
  { id: 'd3_open_1', type: 'dialogue', speaker: '주인공', lines: ['재훈이는 오늘 안 오나…'], next: 'd3_open_2' },
  { id: 'd3_open_2', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['삐졌겠지.'], next: 'd3_open_3' },
  { id: 'd3_open_3', type: 'dialogue', speaker: '주인공', lines: ['그걸로 삐져요?'], next: 'd3_open_4' },
  {
    id: 'd3_open_4',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['원래 조용한 새끼들이 더 오래 삐져.'],
    next: 'd3_open_5',
  },
  { id: 'd3_open_5', type: 'narration', lines: ['잠시 뒤에도 사람이 부족하다.'], next: 'd3_open_6' },
  {
    id: 'd3_open_6',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['오늘 게임 안 돌 수도 있겠는데요…'],
    next: 'd3_open_7',
  },
  { id: 'd3_open_7', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['기다려 봐.'], next: 'd3_open_8' },
  { id: 'd3_open_8', type: 'narration', lines: ['태식이 휴대폰을 꺼내 몇 군데 전화를 한다.'], next: 'd3_open_9' },
  { id: 'd3_open_9', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['어. 지금 와.'], next: 'd3_open_10' },
  {
    id: 'd3_open_10',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['두 명만 더 데리고.'],
    next: 'd3_handi_1',
  },

  // ---------------- 2. 태식이 핸디들을 데려옴 ----------------
  {
    id: 'd3_handi_1',
    type: 'narration',
    lines: [
      '조금 뒤 태식이 부른 사람들이 들어온다.',
      '태식보다 어린 남자들 위주이고\n태식을 꽤 따르는 분위기다.',
    ],
    next: 'd3_handi_2',
  },
  { id: 'd3_handi_2', type: 'dialogue', speaker: '핸디', lines: ['예 형님.'], next: 'd3_handi_3' },
  { id: 'd3_handi_3', type: 'dialogue', speaker: '핸디', lines: ['형님 여기 앉으면 됩니까?'], next: 'd3_handi_4' },
  {
    id: 'd3_handi_4',
    type: 'dialogue',
    speaker: '다른 핸디',
    lines: ['태식이 형 여기 자주 온다면서요?'],
    next: 'd3_handi_5',
  },
  { id: 'd3_handi_5', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['앉아, 앉아.'], next: 'd3_handi_6' },
  { id: 'd3_handi_6', type: 'narration', lines: ['방이 갑자기 평소보다 훨씬 시끄러워진다.'], next: 'd3_handi_7' },
  {
    id: 'd3_handi_7',
    type: 'narration',
    lines: ['주인공은 어제 자기 편을 들어준 태식이,\n오늘은 직접 사람까지 불러서 게임을 만들어준 상황을 체감한다.'],
    next: 'd3_yongchul_branch',
  },

  // ---------------- 3. 용철 재등장 (Day1 미수 선택에 따라 분기) ----------------
  {
    id: 'd3_yongchul_branch',
    type: 'branch',
    flagKey: 'creditChoice',
    cases: {
      granted: 'd3_yc_granted_1',
      refused: 'd3_yc_refused_1',
      kicked: 'd3_yc_kicked_1',
    },
    fallback: 'd3_yc_refused_1',
  },

  // [Day1 미수 허용] — 용철이 미수금을 갚으며 조용히 등장
  { id: 'd3_yc_granted_1', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['사장아.'], next: 'd3_yc_granted_2' },
  { id: 'd3_yc_granted_2', type: 'dialogue', speaker: '주인공', lines: ['네.'], next: 'd3_yc_granted_3' },
  { id: 'd3_yc_granted_3', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['…이거부터.'], next: 'd3_yc_granted_4' },
  { id: 'd3_yc_granted_4', type: 'narration', lines: ['용철이 미수금을 먼저 갚는다.'], next: 'd3_yc_granted_5' },
  {
    id: 'd3_yc_granted_5',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 현금 있어.'],
    next: 'd3_atmosphere_1',
  },

  // [Day1 미수 거절] — 용철이 현금을 보여주며 살짝 비아냥
  { id: 'd3_yc_refused_1', type: 'narration', lines: ['용철이 현금을 보여주며 들어온다.'], next: 'd3_yc_refused_2' },
  { id: 'd3_yc_refused_2', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['아이고~'], next: 'd3_yc_refused_3' },
  {
    id: 'd3_yc_refused_3',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['여기 「돈 없으면 못 앉는 방」이라길래.'],
    next: 'd3_yc_refused_4',
  },
  {
    id: 'd3_yc_refused_4',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 자격 갖춰서 왔습니다, 사장님.'],
    next: 'd3_atmosphere_1',
  },

  // [Day1 용철을 내쫓음] — 용철이 조심스럽게, 태식은 깍듯하게 대함
  { id: 'd3_yc_kicked_1', type: 'narration', lines: ['용철이 문 앞에서 잠깐 멈춘다.'], next: 'd3_yc_kicked_2' },
  {
    id: 'd3_yc_kicked_2',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 들어가도 됩니까, 사장님?'],
    next: 'd3_yc_kicked_3',
  },
  { id: 'd3_yc_kicked_3', type: 'narration', lines: ['주인공이 잠깐 당황한다.'], next: 'd3_yc_kicked_4' },
  {
    id: 'd3_yc_kicked_4',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['아 형님, 그냥 들어오세요.'],
    next: 'd3_yc_kicked_5',
  },
  {
    id: 'd3_yc_kicked_5',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['뭘 또 그러세요.'],
    next: 'd3_yc_kicked_6',
  },
  { id: 'd3_yc_kicked_6', type: 'narration', lines: ['용철이 들어온다.'], next: 'd3_atmosphere_1' },

  // ---------------- 4. 게임 분위기 상승 ----------------
  {
    id: 'd3_atmosphere_1',
    type: 'narration',
    lines: ['태식이 데려온 사람들까지 앉으면서\n게임이 평소보다 훨씬 시끌시끌해진다.'],
    next: 'd3_atmosphere_2',
  },
  { id: 'd3_atmosphere_2', type: 'dialogue', speaker: '핸디', lines: ['형님, 이거 너무 작지 않습니까?'], next: 'd3_atmosphere_3' },
  {
    id: 'd3_atmosphere_3',
    type: 'dialogue',
    speaker: '다른 핸디',
    lines: ['맞습니다 형님. 판 좀 키우시죠.'],
    next: 'd3_atmosphere_4',
  },
  {
    id: 'd3_atmosphere_4',
    type: 'dialogue',
    speaker: '핸디',
    lines: ['태식이 형, 여기 원래 이렇게 소소하게 쳐요?'],
    next: 'd3_atmosphere_5',
  },
  {
    id: 'd3_atmosphere_5',
    type: 'narration',
    lines: ['태식은 직접 결정하지 않고\n주인공을 본다.'],
    next: 'd3_atmosphere_6',
  },
  { id: 'd3_atmosphere_6', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['사장이 정하지.'], next: 'd3_atmosphere_7' },
  { id: 'd3_atmosphere_7', type: 'narration', lines: ['사람들의 시선이 주인공에게 모인다.'], next: 'd3_choice' },

  // ---------------- 5. 플레이어 선택 ----------------
  {
    id: 'd3_choice',
    type: 'choice',
    options: [
      {
        label: '사람까지 불러줬는데… 기 살려드리자.',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: 15, label: '태식 친밀도' },
          { target: 'flag', key: 'taesikBond1', value: true },
          { target: 'trait', key: 'systemVsChaos', delta: 1 },
        ],
        next: 'd3_a1',
      },
      {
        label: '그래도 운영은 운영이지. 원래대로 가자.',
        effects: [{ target: 'trait', key: 'systemVsChaos', delta: -1 }],
        next: 'd3_b1',
      },
    ],
  },

  // ---------------- 6A. 태식의 기를 살려준다 ----------------
  { id: 'd3_a1', type: 'dialogue', speaker: '주인공', lines: ['예 형님.'], next: 'd3_a2' },
  { id: 'd3_a2', type: 'dialogue', speaker: '주인공', lines: ['판돈 올리지 말입니까.'], next: 'd3_a3' },
  { id: 'd3_a3', type: 'dialogue', speaker: '주인공', lines: ['알겠쉼다 행님.'], next: 'd3_a4' },
  { id: 'd3_a4', type: 'narration', lines: ['잠깐 정적.'], next: 'd3_a5' },
  { id: 'd3_a5', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['……ㅋㅋㅋ'], next: 'd3_a6' },
  { id: 'd3_a6', type: 'narration', lines: ['태식이 그냥 웃어버린다.'], next: 'd3_a7' },
  { id: 'd3_a7', type: 'narration', lines: ['핸디들도 분위기를 타서 웃는다.'], next: 'd3_a8' },
  { id: 'd3_a8', type: 'dialogue', speaker: '핸디', lines: ['좋습니다 사장님ㅋㅋ'], next: 'd3_a9' },
  { id: 'd3_a9', type: 'dialogue', speaker: '핸디', lines: ['가시죠 형님.'], next: 'd3_wrap' },

  // ---------------- 6B. 원래 운영 방식대로 간다 ----------------
  { id: 'd3_b1', type: 'dialogue', speaker: '주인공', lines: ['아뇨.'], next: 'd3_b2' },
  { id: 'd3_b2', type: 'dialogue', speaker: '주인공', lines: ['오늘은 그냥 원래대로 할게요.'], next: 'd3_b3' },
  { id: 'd3_b3', type: 'dialogue', speaker: '주인공', lines: ['저희는 아직 소소하게 치는 방이라.'], next: 'd3_b4' },
  { id: 'd3_b4', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['……아 그래?'], next: 'd3_b5' },
  { id: 'd3_b5', type: 'narration', lines: ['태식이 잠깐 머쓱해한다.'], next: 'd3_b6' },
  { id: 'd3_b6', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['야. 사장이 그렇다잖아.'], next: 'd3_b7' },
  { id: 'd3_b7', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['그냥 쳐.'], next: 'd3_b8' },
  { id: 'd3_b8', type: 'dialogue', speaker: '핸디', lines: ['예 형님.'], next: 'd3_wrap' },

  // ---------------- 7. 영업 후 짧은 마무리 ----------------
  {
    id: 'd3_wrap',
    type: 'narration',
    lines: ['영업이 계속된다.', '그렇게 하루가 지나갔다.'],
    next: 'd3_wrap_branch',
  },
  {
    id: 'd3_wrap_branch',
    type: 'branch',
    flagKey: 'taesikBond1',
    cases: { true: 'd3_farewell_1' },
    fallback: 'd3_end_1',
  },

  // 태식 관계 플래그를 얻은 경우에만 나오는 짧은 작별 장면
  { id: 'd3_farewell_1', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['야.'], next: 'd3_farewell_2' },
  { id: 'd3_farewell_2', type: 'dialogue', speaker: '주인공', lines: ['왜요.'], next: 'd3_farewell_3' },
  {
    id: 'd3_farewell_3',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['오늘 재밌었다.'],
    next: 'd3_farewell_4',
  },
  { id: 'd3_farewell_4', type: 'narration', lines: ['태식은 그대로 나간다.'], next: 'd3_farewell_5' },
  { id: 'd3_farewell_5', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'd3_farewell_6' },
  {
    id: 'd3_farewell_6',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['저 형한테 재밌었다는 말 처음 듣는데.'],
    next: 'd3_end_1',
  },

  { id: 'd3_end_1', type: 'narration', lines: ['그날 밤도 그렇게 지나갔다.'], next: 'day3_complete' },
  { id: 'day3_complete', type: 'end' },
];

export const day3Beats: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));

export const DAY3_START_BEAT_ID = 'd3_label';
