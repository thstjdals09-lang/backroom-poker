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

  // ============================================================
  // Day 3 — 「재훈데이」
  // Day2에서 재훈 편(flags.day2Side === 'jaehoon')을 든 경우 진입한다.
  // 태식데이와 분위기가 확실히 다르게: 조용한 영업, 한 핸드에 대한
  // 고민, 영업 후 둘만 남아 포커 얘기를 하는 하루.
  // ============================================================

  // ---------------- 1. Day3 시작 — 태식이 안 온다 ----------------
  { id: 'd3j_label', type: 'sceneLabel', label: 'DAY 3', next: 'd3j_open_1' },
  { id: 'd3j_open_1', type: 'dialogue', speaker: '주인공', lines: ['태식이 형 오늘 안 오네.'], next: 'd3j_open_2' },
  { id: 'd3j_open_2', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['좋네요.'], next: 'd3j_open_3' },
  { id: 'd3j_open_3', type: 'dialogue', speaker: '주인공', lines: ['뭐가요?'], next: 'd3j_open_4' },
  { id: 'd3j_open_4', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['조용해서.'], next: 'd3j_open_5' },
  {
    id: 'd3j_open_5',
    type: 'narration',
    lines: ['잠깐, 실제로 조용한 방의 분위기가 이어진다.'],
    next: 'd3j_open_6',
  },
  { id: 'd3j_open_6', type: 'narration', lines: ['그때 용철이 들어온다.'], next: 'd3j_open_7' },
  {
    id: 'd3j_open_7',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['뭐야. 오늘 왜 이렇게 장례식장이야.'],
    next: 'd3j_yongchul_branch',
  },

  // ---------------- 2. 용철 입장 (Day1 미수 선택에 따라 분기) ----------------
  {
    id: 'd3j_yongchul_branch',
    type: 'branch',
    flagKey: 'creditChoice',
    cases: {
      granted: 'd3j_yc_granted_1',
      refused: 'd3j_yc_refused_1',
      kicked: 'd3j_yc_kicked_1',
    },
    fallback: 'd3j_yc_refused_1',
  },

  // [Day1 미수 허용]
  { id: 'd3j_yc_granted_1', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['사장아.'], next: 'd3j_yc_granted_2' },
  { id: 'd3j_yc_granted_2', type: 'dialogue', speaker: '주인공', lines: ['네.'], next: 'd3j_yc_granted_3' },
  { id: 'd3j_yc_granted_3', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['…이거부터.'], next: 'd3j_yc_granted_4' },
  { id: 'd3j_yc_granted_4', type: 'narration', lines: ['용철이 지난 미수금을 먼저 갚는다.'], next: 'd3j_yc_granted_5' },
  {
    id: 'd3j_yc_granted_5',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 현금 있어.'],
    next: 'd3j_game_1',
  },

  // [Day1 미수 거절]
  { id: 'd3j_yc_refused_1', type: 'narration', lines: ['용철이 현금을 보여주며 들어온다.'], next: 'd3j_yc_refused_2' },
  { id: 'd3j_yc_refused_2', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['아이고~'], next: 'd3j_yc_refused_3' },
  {
    id: 'd3j_yc_refused_3',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['여기 「돈 없으면 못 앉는 방」이라길래.'],
    next: 'd3j_yc_refused_4',
  },
  {
    id: 'd3j_yc_refused_4',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 자격 갖춰서 왔습니다, 사장님.'],
    next: 'd3j_game_1',
  },

  // [Day1 용철을 내쫓음] — 태식이 없으니 주인공이 직접 대응한다
  { id: 'd3j_yc_kicked_1', type: 'narration', lines: ['용철이 문 앞에서 잠깐 멈춘다.'], next: 'd3j_yc_kicked_2' },
  {
    id: 'd3j_yc_kicked_2',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘은 들어가도 됩니까, 사장님?'],
    next: 'd3j_yc_kicked_3',
  },
  { id: 'd3j_yc_kicked_3', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'd3j_yc_kicked_4' },
  { id: 'd3j_yc_kicked_4', type: 'dialogue', speaker: '주인공', lines: ['들어오세요.'], next: 'd3j_yc_kicked_5' },
  { id: 'd3j_yc_kicked_5', type: 'narration', lines: ['용철이 들어온다.'], next: 'd3j_game_1' },

  // ---------------- 3. 오늘의 게임 — 재훈이 용철에게 큰 팟을 잃는다 ----------------
  { id: 'd3j_game_1', type: 'narration', lines: ['오늘 게임은 재훈, 용철, 기존 핸디들로 돌아간다.'], next: 'd3j_game_2' },
  { id: 'd3j_game_2', type: 'narration', lines: ['태식이 없어서 평소보다 확실히 조용하다.'], next: 'd3j_game_3' },
  { id: 'd3j_game_3', type: 'narration', lines: ['게임 중 재훈과 용철 사이에 큰 팟 하나가 생긴다.'], next: 'd3j_game_4' },
  {
    id: 'd3j_game_4',
    type: 'narration',
    lines: ['재훈이 탑페어 계열 핸드로 리버까지 갔다.\n용철이 리버에 팟 정도의 큰 배팅을 건다.'],
    next: 'd3j_game_5',
  },
  { id: 'd3j_game_5', type: 'narration', lines: ['재훈이 오래 고민하다 콜한다.'], next: 'd3j_game_6' },
  {
    id: 'd3j_game_6',
    type: 'narration',
    lines: ['용철이 밸류 핸드를 보여준다.', '재훈이 큰 팟을 잃었다.'],
    next: 'd3j_game_7',
  },
  { id: 'd3j_game_7', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['아이고 재훈아~'], next: 'd3j_game_8' },
  { id: 'd3j_game_8', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['그걸 뭘 받아주냐.'], next: 'd3j_game_9' },
  { id: 'd3j_game_9', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['……'], next: 'd3j_game_10' },
  {
    id: 'd3j_game_10',
    type: 'narration',
    lines: ['재훈은 화를 내거나 짜증내지 않는다.\n오히려 평소보다 더 말이 없어지고, 조용히 다음 게임을 한다.'],
    next: 'd3j_game_11',
  },
  {
    id: 'd3j_game_11',
    type: 'narration',
    lines: ['주인공은 재훈이 이 핸드를 계속 신경 쓰고 있다는 정도만 눈치챈다.'],
    next: 'd3j_close_1',
  },

  // ---------------- 4. 영업 종료 — 재훈만 남는다 ----------------
  { id: 'd3j_close_1', type: 'narration', lines: ['시간이 지나 영업이 끝난다.'], next: 'd3j_close_2' },
  { id: 'd3j_close_2', type: 'narration', lines: ['용철과 다른 핸디들이 모두 나간다.'], next: 'd3j_close_3' },
  {
    id: 'd3j_close_3',
    type: 'narration',
    lines: ['그런데 재훈만 아직 남아 있다.\n휴대폰을 보고 있다.'],
    next: 'd3j_close_4',
  },
  { id: 'd3j_close_4', type: 'dialogue', speaker: '주인공', lines: ['안 가요?'], next: 'd3j_close_5' },
  { id: 'd3j_close_5', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['좀 있다가요.'], next: 'd3j_close_6' },
  { id: 'd3j_close_6', type: 'dialogue', speaker: '주인공', lines: ['뭐 봐요?'], next: 'd3j_close_7' },
  { id: 'd3j_close_7', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['아까 그거.'], next: 'd3j_close_8' },
  { id: 'd3j_close_8', type: 'dialogue', speaker: '주인공', lines: ['아직도 생각해요?'], next: 'd3j_close_9' },
  {
    id: 'd3j_close_9',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['제가 왜 콜했는지 모르겠어서.'],
    next: 'd3j_close_10',
  },
  {
    id: 'd3j_close_10',
    type: 'narration',
    lines: ['결과 때문에 화가 난 것보다,\n자기가 왜 그런 판단을 했는지 계속 복기하는 모습이다.'],
    next: 'd3j_close_11',
  },
  { id: 'd3j_close_11', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['사장님.'], next: 'd3j_close_12' },
  { id: 'd3j_close_12', type: 'dialogue', speaker: '주인공', lines: ['왜요?'], next: 'd3j_close_13' },
  {
    id: 'd3j_close_13',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['아까 용철 아저씨랑 한 판 기억나요?'],
    next: 'd3j_close_14',
  },
  { id: 'd3j_close_14', type: 'dialogue', speaker: '주인공', lines: ['어떤 거요?'], next: 'd3j_close_15' },
  {
    id: 'd3j_close_15',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['제가 탑페어였는데 리버에 용철 아저씨가 팟만큼 친 거요.'],
    next: 'd3j_close_16',
  },
  { id: 'd3j_close_16', type: 'dialogue', speaker: '주인공', lines: ['아.'], next: 'd3j_close_17' },
  {
    id: 'd3j_close_17',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['형이면 그거 받아요?'],
    next: 'd3j_choice',
  },

  // ---------------- 5. 플레이어 선택 ----------------
  {
    id: 'd3j_choice',
    type: 'choice',
    options: [
      { label: '내 생각만 간단히 말해주자.', next: 'd3j_a1' },
      {
        label: '아까 액션부터 다시 생각해보자.',
        next: 'd3j_b1',
      },
      { label: '뭔가 있어 보이는 말을 해보자.', next: 'd3j_c1' },
    ],
  },

  // ---------------- 6A. 내 생각만 간단히 말해준다 ----------------
  { id: 'd3j_a1', type: 'dialogue', speaker: '주인공', lines: ['나라면 폴드했을 것 같은데.'], next: 'd3j_a2' },
  { id: 'd3j_a2', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['왜요?'], next: 'd3j_a3' },
  {
    id: 'd3j_a3',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['용철 아저씨가 거기서 팟만큼 치면 블러프가 그렇게 많아 보이진 않아서.'],
    next: 'd3j_a4',
  },
  { id: 'd3j_a4', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['음…….'], next: 'd3j_a5' },
  {
    id: 'd3j_a5',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['저도 그래서 계속 걸려요.'],
    next: 'd3j_wrap_branch',
  },

  // ---------------- 6B. 아까 액션부터 다시 생각해본다 ----------------
  { id: 'd3j_b1', type: 'dialogue', speaker: '주인공', lines: ['잠깐.'], next: 'd3j_b2' },
  { id: 'd3j_b2', type: 'dialogue', speaker: '주인공', lines: ['프리부터 다시 말해봐요.'], next: 'd3j_b3' },
  { id: 'd3j_b3', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['프리부터요?'], next: 'd3j_b4' },
  { id: 'd3j_b4', type: 'dialogue', speaker: '주인공', lines: ['응. 리버만 보면 모르잖아.'], next: 'd3j_b5' },
  { id: 'd3j_b5', type: 'narration', lines: ['둘이 다시 테이블에 앉는다.'], next: 'd3j_b6' },
  {
    id: 'd3j_b6',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['용철 아저씨가 먼저 열었고 제가 콜했고…'],
    next: 'd3j_b7',
  },
  {
    id: 'd3j_b7',
    type: 'narration',
    lines: ['처음부터 액션을 다시 이야기하면서\n둘이 핸드를 진지하게 뜯어보기 시작한다.'],
    next: 'd3j_b8',
  },
  {
    id: 'd3j_b8',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['턴에서 네가 콜한 순간부터 생각해보면…'],
    next: 'd3j_b9',
  },
  { id: 'd3j_b9', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['아.'], next: 'd3j_b10' },
  { id: 'd3j_b10', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['저도 그게 좀 걸렸어요.'], next: 'd3j_b11' },
  { id: 'd3j_b11', type: 'narration', lines: ['대화가 이어진다.'], next: 'd3j_b12' },
  { id: 'd3j_b12', type: 'narration', lines: ['조금 뒤 재훈이 다른 핸드까지 꺼낸다.'], next: 'd3j_b13' },
  { id: 'd3j_b13', type: 'dialogue', speaker: '주인공', lines: ['잠깐, 지금 하나만 본다며.'], next: 'd3j_b14' },
  { id: 'd3j_b14', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['이것도 비슷해서요.'], next: 'd3j_b15' },
  { id: 'd3j_b15', type: 'narration', lines: ['둘이 계속 핸드 이야기를 한다.'], next: 'd3j_b16' },
  {
    id: 'd3j_b16',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['형 생각보다 이런 거 진지하게 보네요.'],
    next: 'd3j_b17',
  },
  { id: 'd3j_b17', type: 'dialogue', speaker: '주인공', lines: ['생각보다가 왜 붙어.'], next: 'd3j_b18' },
  {
    id: 'd3j_b18',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['맨날 감으로 치는 줄 알았는데.'],
    next: 'd3j_b19',
  },
  { id: 'd3j_b19', type: 'dialogue', speaker: '주인공', lines: ['나 생각 많이 하고 쳐.'], next: 'd3j_b20' },
  {
    id: 'd3j_b20',
    type: 'narration',
    lines: ['이후에도 재훈이 핸드를 몇 개 더 꺼내면서\n둘이 생각보다 오래 이야기를 하게 된다.'],
    next: 'd3j_b21',
  },
  { id: 'd3j_b21', type: 'narration', lines: ['시간이 꽤 흐른 뒤.'], next: 'd3j_b22' },
  { id: 'd3j_b22', type: 'dialogue', speaker: '주인공', lines: ['몇 시예요?'], next: 'd3j_b23' },
  { id: 'd3j_b23', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['여섯 시 반.'], next: 'd3j_b24' },
  { id: 'd3j_b24', type: 'dialogue', speaker: '주인공', lines: ['미쳤네.'], next: 'd3j_b25' },
  {
    id: 'd3j_b25',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['그러게요.'],
    next: 'd3j_b_effects',
  },
  {
    // 대화를 끝까지 같이 해준 것에 대한 보상이므로, 선택한 순간이
    // 아니라 대화가 다 끝난 뒤에 호감도가 오르는 걸 보여준다.
    id: 'd3j_b_effects',
    type: 'effects',
    effects: [
      { target: 'npcAffinity', npcId: 'jaehoon', delta: 15, label: '재훈 친밀도' },
      { target: 'flag', key: 'jaehoonBond1', value: true },
    ],
    next: 'd3j_wrap_branch',
  },

  // ---------------- 6C. 뭔가 있어 보이는 말을 해본다 (개그) ----------------
  {
    id: 'd3j_c1',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['근데 난 리버에서 이미 알았는데.'],
    next: 'd3j_c2',
  },
  { id: 'd3j_c2', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['뭘요?'], next: 'd3j_c3' },
  {
    id: 'd3j_c3',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['용철 아저씨 금니 보였잖아.'],
    next: 'd3j_c4',
  },
  { id: 'd3j_c4', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['……네?'], next: 'd3j_c5' },
  { id: 'd3j_c5', type: 'dialogue', speaker: '주인공', lines: ['저 형 밸류 있을 때 금니 보여.'], next: 'd3j_c6' },
  { id: 'd3j_c6', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['금니는 원래 보여요.'], next: 'd3j_c7' },
  { id: 'd3j_c7', type: 'dialogue', speaker: '주인공', lines: ['아.'], next: 'd3j_c8' },
  { id: 'd3j_c8', type: 'dialogue', speaker: '주인공', lines: ['그럼 목걸이였나.'], next: 'd3j_c9' },
  { id: 'd3j_c9', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['그것도 원래 하고 다녀요.'], next: 'd3j_c10' },
  { id: 'd3j_c10', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'd3j_c11' },
  {
    id: 'd3j_c11',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['포커 얘기 하기 싫으면 그냥 그렇다고 해요.'],
    next: 'd3j_wrap_branch',
  },

  // ---------------- 7. B 선택 전용 마무리 ----------------
  {
    id: 'd3j_wrap_branch',
    type: 'branch',
    flagKey: 'jaehoonBond1',
    cases: { true: 'd3j_farewell_1' },
    fallback: 'd3j_end_1',
  },
  { id: 'd3j_farewell_1', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['사장님.'], next: 'd3j_farewell_2' },
  { id: 'd3j_farewell_2', type: 'dialogue', speaker: '주인공', lines: ['왜요?'], next: 'd3j_farewell_3' },
  {
    id: 'd3j_farewell_3',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['다음에 애매한 핸드 있으면 보내도 돼요?'],
    next: 'd3j_farewell_4',
  },
  {
    id: 'd3j_farewell_4',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['이미 보낼 생각이었잖아요.'],
    next: 'd3j_farewell_5',
  },
  { id: 'd3j_farewell_5', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['……네.'], next: 'd3j_farewell_6' },
  { id: 'd3j_farewell_6', type: 'narration', lines: ['재훈이 나간다.'], next: 'd3j_end_1' },

  { id: 'd3j_end_1', type: 'narration', lines: ['그날 밤도 그렇게 지나갔다.'], next: 'day3_jaehoon_complete' },
  { id: 'day3_jaehoon_complete', type: 'end' },
];

export const day3Beats: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));

export const DAY3_TAESIK_START_BEAT_ID = 'd3_label';
export const DAY3_JAEHOON_START_BEAT_ID = 'd3j_label';
