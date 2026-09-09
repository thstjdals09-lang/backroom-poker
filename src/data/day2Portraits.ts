// Day2 beat id -> 초상화 표정 변형 매핑. Day1 Plan A 세트에 이미 있는
// 표정 변형을 재사용한다(새 이미지는 만들지 않음).

export const day2Portraits: Record<string, string> = {
  d2_taesik_aircon_fixed: 'taesik_laugh',
  d2_taesik_aircon_broken: 'taesik_annoyed',

  // 첫 소문 이벤트 — 1) 미수 허용
  d2_rumor_granted_6: 'taesik_serious',
  d2_rumor_granted_7: 'taesik_serious',
  d2_rumor_granted_8: 'taesik_serious',
  d2_rumor_granted_10: 'taesik_serious',
  d2_rumor_granted_14: 'taesik_serious',

  // 첫 소문 이벤트 — 2) 미수 거절
  d2_rumor_refused_1: 'jaehoon_phone',
  d2_rumor_refused_3: 'jaehoon_phone',
  d2_rumor_refused_7: 'jaehoon_phone',

  // 첫 소문 이벤트 — 3) 용철 축출
  d2_rumor_kicked_4: 'taesik_serious',
  d2_rumor_kicked_6: 'taesik_serious',
  d2_rumor_kicked_9: 'taesik_serious',
  d2_rumor_kicked_10: 'taesik_annoyed',

  d2_taesik_snap: 'taesik_serious',
  d2_jaehoon_r1: 'jaehoon_uncomfortable',
  d2_taesik_r2: 'taesik_serious',
  d2_jaehoon_r2: 'jaehoon_tense',

  d2_after_a1: 'taesik_laugh',
  d2_after_b1: 'jaehoon_phone',
};
