// Beat id -> 배경 이미지 키 매핑.
// 감정/장소가 바뀌는 주요 순간에만 지정하고, 나머지는 기본 'room'을 쓴다.
// Day2를 추가할 때도 이런 매핑 파일을 하나 더 만들면 된다.

export const day1Backgrounds: Record<string, string> = {
  // 오프닝 — 골목/지하 입구
  s1_location: 'intro_alley',

  // 박사장이 열쇠를 던져주는 장면
  s1_baksa1: 'baksa_handoff',
  s1_baksa2: 'baksa_handoff',
  s1_baksa3: 'baksa_handoff',
  s1_baksa4: 'baksa_handoff',
  s1_baksa5: 'baksa_handoff',
  s1_baksa6: 'baksa_handoff',

  // 태식 - 에어컨 시비
  taesik_d3: 'taesik_aircon',
  taesik_d4: 'taesik_aircon',
  taesik_d5: 'taesik_aircon',
  taesik_choice: 'taesik_aircon',
  taesik_after1: 'taesik_aircon',
  taesik_after2: 'taesik_aircon',
  taesik_after3: 'taesik_aircon',

  // 재훈 등장
  npc_jaehoon_enter: 'jaehoon_enter',
  jaehoon_d1: 'jaehoon_enter',
  jaehoon_d2: 'jaehoon_enter',
  jaehoon_d3: 'jaehoon_enter',
  jaehoon_d4: 'jaehoon_enter',
  jaehoon_info: 'jaehoon_enter',

  // 용철 등장
  npc_yongchul_enter: 'yongchul_enter',
  yongchul_d1: 'yongchul_enter',
  yongchul_d2: 'yongchul_enter',
  yongchul_d3: 'yongchul_enter',
  yongchul_d4: 'yongchul_enter',

  // 밤 영업 몽타주
  business_lineup: 'night_montage',
  business_timeskip: 'night_montage',

  // 미수 요청 이벤트 (핵심 장면)
  event_stop: 'yongchul_demand',
  event_d1: 'yongchul_demand',
  event_d2: 'yongchul_demand',
  event_d3: 'yongchul_demand',
  event_d4: 'yongchul_demand',
  event_d5: 'yongchul_demand',
  event_alert: 'yongchul_demand',
  event_tutorial2: 'yongchul_demand',
  event_choice: 'yongchul_demand',
  event_after1: 'yongchul_demand',
  event_after1b: 'yongchul_demand',
  event_after2: 'yongchul_demand',
  event_after2b: 'yongchul_demand',
  event_after2c: 'yongchul_demand',

  // 용철이 쫓겨나는 분기 (③ 선택시)
  event_after3: 'yongchul_kicked_out',
  event_after3b: 'yongchul_kicked_out',
  event_after3c: 'yongchul_kicked_out',
  event_after3d: 'yongchul_kicked_out',
  event_after3e: 'yongchul_kicked_out',

  // 태식이 "방어해" 라고 압박하는 순간
  defense_intro1: 'taesik_defense_order',
  defense_intro2: 'taesik_defense_order',
  defense_intro3: 'taesik_defense_order',
  defense_intro4: 'taesik_defense_order',
  defense_intro5: 'taesik_defense_order',
  defense_intro6: 'taesik_defense_order',
  defense_tutorial: 'taesik_defense_order',
  defense_cta: 'taesik_defense_order',

  // 새벽, 혼자 남는 엔딩
  night_end1: 'dawn_alone',
  night_end2: 'dawn_alone',
  night_end3: 'dawn_alone',
  day_result: 'dawn_alone',
  baksa_msg1: 'dawn_alone',
  baksa_msg2: 'dawn_alone',
  baksa_choice: 'dawn_alone',
};
