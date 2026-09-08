import type { IconName } from '../components/PixelIcon';

// Day2+ 에서 실제로 동작할 예정인 룸 업그레이드 / 상점 아이템 목록.
// 지금은 잠긴 채로 목록만 보여주는 placeholder지만, unlock 로직만 추가하면
// 바로 살아있는 콘텐츠가 되도록 데이터로 분리해 둔다.

export interface RoomUpgrade {
  id: string;
  name: string;
  desc: string;
  icon: IconName;
}

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  icon: IconName;
  price: number;
}

export const roomUpgrades: RoomUpgrade[] = [
  { id: 'fridge', name: '냉장고 교체', desc: '얼음이 안 어는 새 냉장고로 바꾼다.', icon: 'fridge' },
  { id: 'aircon', name: '에어컨 수리', desc: '태식이 매일 얘기하는 그 에어컨.', icon: 'aircon' },
  { id: 'table2', name: '테이블 추가', desc: '테이블을 하나 더 놓고 손님을 더 받는다.', icon: 'cards' },
];

export const shopItems: ShopItem[] = [
  { id: 'coffee_machine', name: '커피머신', desc: '싸구려 믹스커피 대신 그나마 나은 커피.', icon: 'coffee', price: 350000 },
  { id: 'mini_fridge_upgrade', name: '미니 냉장고 업그레이드', desc: '얼음 트레이가 하나 더 있다.', icon: 'fridge', price: 120000 },
  { id: 'premium_cards', name: '프리미엄 카드 세트', desc: '손에 착 붙는 카드. 딜러들이 좋아한다.', icon: 'cards', price: 80000 },
  { id: 'chip_set', name: '칩 풀세트', desc: '색깔별로 딱 맞는 칩 세트.', icon: 'chips', price: 210000 },
];
