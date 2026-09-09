import type { IconName } from '../components/PixelIcon';
import type { Effect } from '../types';

// MANAGE 탭에서 쓰는 데이터. 룸 시설 투자 / 직원 고용 / 장기 룸 확장을
// 전부 여기서 관리한다. Day2 종료 후부터 실제로 구매 가능해진다.

export interface ManageUpgradeLevel {
  level: number;
  name: string;
  desc: string;
  price: number;
  icon: IconName;
}

// 커피 머신은 여러 단계로 이어서 업그레이드할 수 있는 구조.
// 다음 단계를 추가하고 싶으면 이 배열 끝에 항목만 더하면 된다.
export const coffeeMachineLevels: ManageUpgradeLevel[] = [
  {
    level: 1,
    name: '커피 머신 교체',
    desc: '싸구려 믹스커피 대신 그나마 마실 만한 커피.',
    price: 180000,
    icon: 'coffee',
  },
];

export interface ManageFlagItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: IconName;
  flagKey: string; // 구매 완료 여부를 저장하는 flag
  extraEffects?: Effect[]; // 구매 시 추가로 적용할 효과(호감도/평판 등)
  hideWhenOwned?: boolean; // true면 이미 완료됐을 때 목록에서 아예 제외
}

export const dealerItem: ManageFlagItem = {
  id: 'dealer',
  name: '신입 딜러 고용',
  desc: '이제 슬슬 게임만 봐줄 사람이 필요하다.',
  price: 300000,
  icon: 'cards',
  flagKey: 'dealerHired',
};

// Day1 투자에서 고르지 않은 정비는 MANAGE에서 계속 구매할 수 있다.
// Day1에서 이미 했다면(같은 flag) 목록에서 제외된다.
export const day1LeftoverRepairs: ManageFlagItem[] = [
  {
    id: 'aircon',
    name: '에어컨 수리',
    desc: '낡은 에어컨. 태식이 매일 얘기한다.',
    price: 60000,
    icon: 'aircon',
    flagKey: 'airconFixed',
    extraEffects: [{ target: 'npcAffinity', npcId: 'taesik', delta: 5, label: '태식 친밀도' }],
    hideWhenOwned: true,
  },
  {
    id: 'furniture',
    name: '테이블 · 의자 정비',
    desc: '흔들리던 의자와 테이블 다리.',
    price: 45000,
    icon: 'chips',
    flagKey: 'furnitureFixed',
    extraEffects: [{ target: 'roomReputation', delta: 1 }],
    hideWhenOwned: true,
  },
];

// 지금 당장은 살 수 없는 장기 목표. 조건(룸 확장 등)이 따로 갖춰져야 하며
// 지금은 잠긴 상태만 보여준다 — 구매 로직 없음.
export const secondTableGoal = {
  id: 'table2',
  name: '두 번째 포커 테이블',
  desc: '아직 놓을 자리도 없다.',
  price: 450000,
  icon: 'cards' as IconName,
};
