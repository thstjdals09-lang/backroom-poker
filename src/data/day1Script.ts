import type { Beat } from '../types';

// ============================================================
// Day 1 — 「오늘 포가 비었다」
// 모든 대사/분기/수치변화는 데이터로 표현된다.
// Day2를 추가하려면 이런 파일을 하나 더 만들고
// StoryPlayer에 day 선택 로직만 추가하면 된다.
// ============================================================

const beats: Beat[] = [
  // ---------------- 1. 스토리 ----------------
  {
    id: 's1_location',
    type: 'narration',
    lines: [
      '서울 어딘가.',
      '번화가에서 두 블록만 벗어나면 사람들이 잘 들어오지 않는 골목.',
      '간판도 없다.',
      '건물 옆 철문을 열고 지하로 내려가면 낡은 문 하나가 나온다.',
      '문에는 A4용지에 매직으로 적혀 있다.',
      '♠ ACE ♠',
    ],
    next: 's1_room',
  },
  {
    id: 's1_room',
    type: 'narration',
    lines: [
      '문을 열면 테이블 하나.',
      '짝짝이 의자 여섯 개.',
      '벽에는 누가 붙였는지도 모르는 축구팀 달력.',
      '구석에는 얼음이 잔뜩 낀 냉장고.',
      '그리고 형광등 하나가 일정한 간격으로 깜빡인다.',
    ],
    next: 's1_baksa1',
  },
  {
    id: 's1_baksa1',
    type: 'dialogue',
    speaker: '내레이션',
    lines: [
      '이 방의 원래 관리자는 박사장이었다.',
      '왜 박사장이라고 불리는지는 아무도 모른다.',
      '박사장은 어느 날 주인공에게 말했다.',
    ],
    next: 's1_baksa2',
  },
  { id: 's1_baksa2', type: 'dialogue', speaker: '박사장', lines: ['나 한동안 지방 좀 내려가야 된다.'], next: 's1_baksa3' },
  {
    id: 's1_baksa3',
    type: 'dialogue',
    speaker: '내레이션',
    lines: ['그리고 열쇠를 던져줬다.'],
    next: 's1_baksa4',
  },
  { id: 's1_baksa4', type: 'dialogue', speaker: '박사장', lines: ['너 여기 좀 보고 있어.'], next: 's1_baksa5' },
  { id: 's1_baksa5', type: 'dialogue', speaker: '주인공', lines: ['얼마나요?'], next: 's1_baksa6' },
  { id: 's1_baksa6', type: 'dialogue', speaker: '박사장', lines: ['몰라.'], next: 's1_47days' },
  {
    id: 's1_47days',
    type: 'narration',
    lines: [
      '그게 47일 전이었다.',
      '박사장은 아직 돌아오지 않았다.',
      '전화도 잘 안 받는다.',
      '대신 매달 월세는 나간다. 전기세도 나간다. 딜러도 돈을 줘야 한다.',
      '그리고 손님들은 이상하게도 계속 온다.',
    ],
    next: 's1_status',
  },
  { id: 's1_status', type: 'statusPanel', next: 's1_tutorial' },
  {
    id: 's1_tutorial',
    type: 'tutorial',
    text: '포커룸은 가만히 놔둔다고 돈을 벌지 않습니다.\n손님을 받고, 게임을 유지하고, 문제를 해결해야 합니다.\n그리고 가끔은… 직접 앉아야 합니다.',
    next: 's1_start_cta',
  },
  {
    id: 's1_start_cta',
    type: 'choice',
    options: [{ label: '영업 시작', next: 'npc_taesik_enter' }],
  },

  // ---------------- 2. 첫 손님들 : 태식 ----------------
  { id: 'npc_taesik_enter', type: 'npcEnter', npcId: 'taesik', next: 'taesik_d1' },
  { id: 'taesik_d1', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['야.'], next: 'taesik_d2' },
  { id: 'taesik_d2', type: 'dialogue', speaker: '주인공', lines: ['왜요.'], next: 'taesik_d3' },
  { id: 'taesik_d3', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['에어컨 왜 이래.'], next: 'taesik_d4' },
  { id: 'taesik_d4', type: 'dialogue', speaker: '주인공', lines: ['켜져 있는데요.'], next: 'taesik_d5' },
  {
    id: 'taesik_d5',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['이게 켜진 거야?'],
    next: 'taesik_choice',
  },
  {
    id: 'taesik_choice',
    type: 'choice',
    speaker: '주인공',
    options: [
      {
        label: '온도를 18도로 내린다.',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: 1, label: '태식 친밀도' },
          { target: 'ledger', key: 'opEx', delta: -2000, label: '전기세 예상 비용' },
        ],
        next: 'taesik_after1',
      },
      {
        label: '"형 옷이 너무 붙어서 그래요."',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: 2, label: '태식 친밀도' },
          { target: 'ledger', key: 'opEx', delta: -1300, label: '전기세 예상 비용' },
        ],
        next: 'taesik_after2',
      },
      {
        label: '무시한다.',
        effects: [
          { target: 'npcAffinity', npcId: 'taesik', delta: -3, label: '태식 친밀도' },
          { target: 'mental', delta: -1 },
        ],
        next: 'taesik_after3',
      },
    ],
  },
  {
    id: 'taesik_after1',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['어... 뭐 그럭저럭.'],
    next: 'taesik_tutorial',
  },
  {
    id: 'taesik_after2',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['얘가 사장 됐다고 까부네?', '(웃는다)'],
    next: 'taesik_tutorial',
  },
  {
    id: 'taesik_after3',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['...말을 말자.'],
    next: 'taesik_tutorial',
  },
  {
    id: 'taesik_tutorial',
    type: 'tutorial',
    text: '손님마다 성격이 다릅니다.\n대화와 사건을 통해 손님의 성향을 파악할 수 있습니다.',
    next: 'npc_jaehoon_enter',
  },

  // ---------------- 2. 첫 손님들 : 재훈 ----------------
  { id: 'npc_jaehoon_enter', type: 'npcEnter', npcId: 'jaehoon', next: 'jaehoon_d1' },
  {
    id: 'jaehoon_d1',
    type: 'dialogue',
    speaker: '재훈',
    portrait: 'jaehoon',
    lines: ['오늘 누가 와요?'],
    next: 'jaehoon_d2',
  },
  { id: 'jaehoon_d2', type: 'dialogue', speaker: '주인공', lines: ['태식이 형.'], next: 'jaehoon_d3' },
  { id: 'jaehoon_d3', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['…….'], next: 'jaehoon_d4' },
  { id: 'jaehoon_d4', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['또?'], next: 'jaehoon_info' },
  {
    id: 'jaehoon_info',
    type: 'npcInfo',
    npcId: 'jaehoon',
    note: '태식과 자주 부딪힘',
    next: 'jaehoon_tutorial',
  },
  {
    id: 'jaehoon_tutorial',
    type: 'tutorial',
    text: '손님 관계도 룸의 분위기에 영향을 줍니다.',
    next: 'npc_yongchul_enter',
  },

  // ---------------- 2. 첫 손님들 : 용철 ----------------
  { id: 'npc_yongchul_enter', type: 'npcEnter', npcId: 'yongchul', next: 'yongchul_d1' },
  {
    id: 'yongchul_d1',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['어이 사장님!'],
    next: 'yongchul_d2',
  },
  { id: 'yongchul_d2', type: 'dialogue', speaker: '주인공', lines: ['저 사장 아니에요.'], next: 'yongchul_d3' },
  {
    id: 'yongchul_d3',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['열쇠 들고 있으면 사장이지!'],
    next: 'yongchul_d4',
  },
  {
    id: 'yongchul_d4',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['오늘 좀 가보자.', '(테이블에 앉는다)'],
    next: 'business_lineup',
  },

  // ---------------- 3. 첫 영업 ----------------
  {
    id: 'business_lineup',
    type: 'narration',
    lines: ['현재 테이블', '태식 · 재훈 · 용철 · 낯선 손님 두 명', '빈자리 1'],
    next: 'business_timeskip',
  },
  {
    id: 'business_timeskip',
    type: 'timeSkip',
    times: ['23:10', '23:42', '00:18', '00:51'],
    lines: [
      '칩이 오가고, 사람들이 떠들고,',
      '냉장고 문이 열리고,',
      '재훈이 한숨을 쉬고,',
      '태식이 계속 에어컨 얘기를 한다.',
    ],
    next: 'business_revenue',
  },
  {
    id: 'business_revenue',
    type: 'effects',
    effects: [{ target: 'ledger', key: 'roomRevenue', delta: 31200, label: '오늘 룸 수익' }],
    next: 'event_stop',
  },

  // ---------------- 4. EVENT: 「야, 렉 하나 줘라」 ----------------
  { id: 'event_stop', type: 'sceneLabel', label: '「야, 렉 하나 줘라」', next: 'event_d1' },
  {
    id: 'event_d1',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['야, 사장아.'],
    next: 'event_d2',
  },
  { id: 'event_d2', type: 'dialogue', speaker: '주인공', lines: ['네?'], next: 'event_d3' },
  { id: 'event_d3', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['나 렉 하나 줘라.'], next: 'event_d4' },
  { id: 'event_d4', type: 'dialogue', speaker: '주인공', lines: ['…….'], next: 'event_d5' },
  {
    id: 'event_d5',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['내일 바로 넣을게.'],
    next: 'event_alert',
  },
  {
    id: 'event_alert',
    type: 'tutorial',
    text: '!!! 미수 요청이 발생했습니다.\n용철 요청 100,000 P\n현재 포인트 잔고 18,400 P',
    next: 'event_tutorial2',
  },
  {
    id: 'event_tutorial2',
    type: 'tutorial',
    text: '일부 손님은 외상 플레이를 요청합니다.\n외상을 허용하면 게임을 계속 유지할 수 있지만,\n돈을 돌려받지 못할 수도 있습니다.',
    next: 'event_choice',
  },
  {
    id: 'event_choice',
    type: 'choice',
    speaker: '주인공',
    options: [
      {
        label: '"형이니까 드릴게요."',
        effects: [
          { target: 'npcAffinity', npcId: 'yongchul', delta: 8, label: '용철 친밀도' },
          { target: 'flag', key: 'creditChoice', value: 'granted' },
          { target: 'mental', delta: -6 },
        ],
        next: 'event_after1',
      },
      {
        label: '"안 돼요. 입금하고 치세요."',
        effects: [
          { target: 'npcAffinity', npcId: 'yongchul', delta: -12, label: '용철 친밀도' },
          { target: 'roomReputation', delta: -1 },
          { target: 'flag', key: 'creditChoice', value: 'refused' },
          { target: 'flag', key: 'tableBroken', value: true },
          { target: 'mental', delta: -13 },
        ],
        next: 'event_after2',
      },
      {
        label: '"나가세요."',
        effects: [
          { target: 'npcAffinity', npcId: 'yongchul', delta: -30, label: '용철 친밀도' },
          { target: 'npcAffinity', npcId: 'taesik', delta: 4, label: '태식 친밀도' },
          { target: 'npcAffinity', npcId: 'jaehoon', delta: 1, label: '재훈 친밀도' },
          { target: 'flag', key: 'creditChoice', value: 'kicked' },
          { target: 'flag', key: 'tableBroken', value: true },
          { target: 'mental', delta: -27 },
        ],
        next: 'event_after3',
      },
    ],
  },
  {
    id: 'event_after1',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['역시 내가 사람 하나는 잘 봤다.'],
    next: 'event_after1b',
  },
  { id: 'event_after1b', type: 'dialogue', speaker: '주인공', lines: ['…….'], next: 'event_converge' },
  {
    id: 'event_after2',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['야.', '(정적)', '박사장은 해줬는데?'],
    next: 'event_after2b',
  },
  { id: 'event_after2b', type: 'dialogue', speaker: '주인공', lines: ['전 박사장 아니잖아요.'], next: 'event_after2c' },
  {
    id: 'event_after2c',
    type: 'dialogue',
    speaker: '용철',
    portrait: 'yongchul',
    lines: ['……사장 다 됐네.', '(자리에서 일어난다)'],
    next: 'event_converge',
  },
  {
    id: 'event_after3',
    type: 'dialogue',
    speaker: '주인공',
    lines: ['형 그냥 오늘 집에 가세요.'],
    next: 'event_after3b',
  },
  { id: 'event_after3b', type: 'dialogue', speaker: '용철', portrait: 'yongchul', lines: ['뭐?'], next: 'event_after3c' },
  { id: 'event_after3c', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['야야야야.'], next: 'event_after3d' },
  { id: 'event_after3d', type: 'dialogue', speaker: '재훈', portrait: 'jaehoon', lines: ['…….'], next: 'event_after3e' },
  {
    id: 'event_after3e',
    type: 'narration',
    lines: ['(10초 뒤)', '용철이 나간다.', '문이 세게 닫힌다.'],
    next: 'event_converge',
  },
  { id: 'event_converge', type: 'narration', lines: ['게임이 삐걱거리기 시작한다.'], next: 'table_stopped' },
  { id: 'table_stopped', type: 'tableStopped', requirement: 50000, next: 'defense_intro1' },

  // ---------------- 5. 첫 번째 방어전 ----------------
  { id: 'defense_intro1', type: 'dialogue', speaker: '주인공', lines: ['아…….'], next: 'defense_intro2' },
  { id: 'defense_intro2', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['야.'], next: 'defense_intro3' },
  { id: 'defense_intro3', type: 'dialogue', speaker: '주인공', lines: ['왜요.'], next: 'defense_intro4' },
  { id: 'defense_intro4', type: 'dialogue', speaker: '태식', portrait: 'taesik', lines: ['니가 앉아.'], next: 'defense_intro5' },
  { id: 'defense_intro5', type: 'dialogue', speaker: '주인공', lines: ['제가요?'], next: 'defense_intro6' },
  {
    id: 'defense_intro6',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['자리 하나 비잖아.', '(잠시 침묵)', '방어해.'],
    next: 'defense_tutorial',
  },
  {
    id: 'defense_tutorial',
    type: 'tutorial',
    text: 'DEFENSE\n포커룸 운영자는 직접 테이블에 참가할 수 있습니다.\n포커 플레이를 통해 개인 자금을 얻을 수 있지만,\n실패하면 운영 자금까지 위험해질 수 있습니다.',
    next: 'defense_cta',
  },
  { id: 'defense_cta', type: 'choice', options: [{ label: '앉는다', next: 'defense_play' }] },
  { id: 'defense_play', type: 'defense', scenarioSetId: 'day1_defense', requirement: 50000, next: 'night_end1' },

  // ---------------- 6. 첫날 정산 ----------------
  { id: 'night_end1', type: 'narration', lines: ['새벽 05:47.', '손님들이 나간다.'], next: 'night_end2' },
  {
    id: 'night_end2',
    type: 'dialogue',
    speaker: '태식',
    portrait: 'taesik',
    lines: ['내일 에어컨 고쳐놔.'],
    next: 'night_end3',
  },
  {
    id: 'night_end3',
    type: 'narration',
    lines: ['문이 닫힌다.', '조용해진다.', '혼자 테이블에 앉아 있다.'],
    next: 'night_opex',
  },
  {
    id: 'night_opex',
    type: 'effects',
    effects: [{ target: 'ledger', key: 'opEx', delta: -8400, label: '전기 / 음료' }],
    next: 'day_result',
  },
  { id: 'day_result', type: 'dayResult', next: 'baksa_msg1' },
  { id: 'baksa_msg1', type: 'dialogue', speaker: '박사장 (문자)', lines: ['야', '거기 잘 되냐'], next: 'baksa_msg2' },
  { id: 'baksa_msg2', type: 'dialogue', speaker: '주인공', lines: ['……'], next: 'baksa_choice' },
  {
    id: 'baksa_choice',
    type: 'choice',
    options: [
      { label: '잘 돼요.', effects: [{ target: 'mental', delta: 2 }], next: 'day1_complete' },
      { label: '망하고 있어요.', effects: [{ target: 'mental', delta: -2 }], next: 'day1_complete' },
      { label: '언제 오세요?', next: 'day1_complete' },
      { label: '읽씹', next: 'day1_complete' },
    ],
  },
  { id: 'day1_complete', type: 'end' },
];

export const START_BEAT_ID = 's1_location';

export const day1Beats: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));
