import type { NPCData } from '../types';

// Day1 초기 NPC 3인. Day2 이후 새 NPC를 추가할 땐 이 배열에 항목만 더하면 된다.
export const initialNPCs: NPCData[] = [
  {
    id: 'taesik',
    name: '태식',
    age: 39,
    description:
      '양쪽 팔 이레즈미. 꽉 끼는 검은 나이키 기능성 티셔츠에 형광 연두색 반바지, 검은 슬리퍼. 손엔 항상 편의점 아이스아메리카노. 닉네임은 T-SHARK인데 아무도 그렇게 부르지 않는다.',
    affinity: 0,
    pokerStyle: '???',
    hiddenTraits: ['aggressive_when_confident'],
    dialogueState: 'intro',
    discovered: false,
  },
  {
    id: 'jaehoon',
    name: '재훈',
    age: 28,
    description:
      '항상 모자를 깊게 눌러쓴다. 말수가 별로 없다. 휴대폰으로 포커 영상을 계속 본다. 들어오자마자 자리부터 확인한다.',
    affinity: 0,
    pokerStyle: '???',
    hiddenTraits: ['tight_but_dangerous'],
    dialogueState: 'intro',
    discovered: false,
  },
  {
    id: 'yongchul',
    name: '용철',
    age: 46,
    description:
      '금목걸이에 작은 크로스백. 들어올 때 목소리가 제일 크다.',
    affinity: 0,
    pokerStyle: '???',
    hiddenTraits: ['asks_for_credit'],
    dialogueState: 'intro',
    discovered: false,
  },
];
