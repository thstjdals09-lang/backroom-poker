// Day2 beat id -> 배경 이미지 키 매핑. Day1에 이미 있는 아트를
// 재사용한다(새 이미지는 만들지 않음).

export const day2Backgrounds: Record<string, string> = {
  d2_label_fixed: 'room',
  d2_label_broken: 'room',
  d2_taesik_aircon_fixed: 'taesik_reaction',
  d2_taesik_aircon_broken: 'taesik_aircon',

  d2_business_start: 'night_session_early',
  d2_npc_settle: 'jaehoon_enter',
  d2_phone_repeat: 'jaehoon_enter',

  d2_taesik_snap: 'taesik_defense_order',
  d2_jaehoon_r1: 'jaehoon_enter',
  d2_taesik_r2: 'taesik_defense_order',
  d2_jaehoon_r2: 'jaehoon_enter',
  d2_tension: 'room_table_broken',

  d2_choice: 'room_table_broken',

  d2_after_a1: 'taesik_reaction',
  d2_after_a2: 'room',
  d2_after_b1: 'jaehoon_enter',
  d2_after_b2: 'room',

  d2_wrap: 'dawn_alone',
};
