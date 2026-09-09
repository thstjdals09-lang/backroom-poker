// Day2 beat id -> 배경 이미지 키 매핑. Day1에 이미 있는 아트를
// 재사용한다(새 이미지는 만들지 않음).

export const day2Backgrounds: Record<string, string> = {
  d2_label_fixed: 'room',
  d2_label_broken: 'room',
  d2_taesik_aircon_fixed: 'taesik_reaction',
  d2_taesik_aircon_broken: 'taesik_aircon',

  // 첫 소문 이벤트 — 1) 미수를 허용했던 경우
  d2_rumor_granted_1: 'night_session_early',
  d2_rumor_granted_2: 'night_session_early',
  d2_rumor_granted_3: 'night_session_early',
  d2_rumor_granted_4: 'night_session_early',
  d2_rumor_granted_5: 'night_session_early',
  d2_rumor_granted_6: 'taesik_defense_order',
  d2_rumor_granted_7: 'taesik_defense_order',
  d2_rumor_granted_8: 'taesik_defense_order',
  d2_rumor_granted_9: 'night_session_early',
  d2_rumor_granted_10: 'taesik_defense_order',
  d2_rumor_granted_11: 'room',
  d2_rumor_granted_12: 'room',
  d2_rumor_granted_13: 'room',
  d2_rumor_granted_14: 'taesik_reaction',
  d2_rumor_granted_announce: 'room',

  // 첫 소문 이벤트 — 2) 미수를 거절했던 경우
  d2_rumor_refused_1: 'jaehoon_enter',
  d2_rumor_refused_2: 'jaehoon_enter',
  d2_rumor_refused_3: 'jaehoon_enter',
  d2_rumor_refused_4: 'jaehoon_enter',
  d2_rumor_refused_5: 'jaehoon_enter',
  d2_rumor_refused_6: 'jaehoon_enter',
  d2_rumor_refused_7: 'jaehoon_enter',
  d2_rumor_refused_announce: 'room',

  // 첫 소문 이벤트 — 3) 용철을 내쫓았던 경우
  d2_rumor_kicked_1: 'room',
  d2_rumor_kicked_2: 'room',
  d2_rumor_kicked_3: 'room',
  d2_rumor_kicked_4: 'taesik_defense_order',
  d2_rumor_kicked_5: 'room',
  d2_rumor_kicked_6: 'room',
  d2_rumor_kicked_7: 'room',
  d2_rumor_kicked_8: 'room_table_broken',
  d2_rumor_kicked_9: 'taesik_reaction',
  d2_rumor_kicked_10: 'taesik_reaction',
  d2_rumor_kicked_announce: 'room',

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
