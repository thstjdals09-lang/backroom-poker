// Beat id -> 배경 이미지 키 매핑.
// 감정/장소가 바뀌는 주요 순간마다 지정한다 (ACE Day1 Plan A 아트 세트 기준).
// Day2를 추가할 때도 이런 매핑 파일을 하나 더 만들면 된다.

export const day1Backgrounds: Record<string, string> = {
  // 오프닝 골목
  s1_location: 'intro_alley',
  s1_room: 'room',

  // 박사장이 열쇠를 던져주는 장면
  s1_baksa1: 'baksa_handoff',
  s1_baksa2: 'baksa_handoff',
  s1_baksa3: 'baksa_handoff',
  s1_baksa4: 'baksa_handoff',
  s1_baksa5: 'baksa_handoff',
  s1_baksa6: 'baksa_handoff',

  // 47일 후 현재 시점 / 상태 확인 / 튜토리얼 / 영업 시작
  s1_47days: 'room_47days_later',
  s1_status: 'room_47days_later',
  s1_tutorial: 'room_47days_later',
  s1_start_cta: 'room_47days_later',

  // 태식 등장
  npc_taesik_enter: 'taesik_enter',
  taesik_d1: 'taesik_enter',
  taesik_d2: 'taesik_enter',

  // 태식 - 에어컨 시비
  taesik_d3: 'taesik_aircon',
  taesik_d4: 'taesik_aircon',
  taesik_d5: 'taesik_aircon',
  taesik_choice: 'taesik_aircon',

  // 태식의 반응
  taesik_after1: 'taesik_reaction',
  taesik_after2: 'taesik_reaction',
  taesik_after3: 'taesik_reaction',
  taesik_tutorial: 'taesik_reaction',

  // 재훈 등장
  npc_jaehoon_enter: 'jaehoon_enter',
  jaehoon_d1: 'jaehoon_enter',
  jaehoon_d2: 'jaehoon_enter',
  jaehoon_d3: 'jaehoon_enter',
  jaehoon_d4: 'jaehoon_enter',
  jaehoon_info: 'jaehoon_enter',
  jaehoon_tutorial: 'jaehoon_enter',

  // 용철 등장
  npc_yongchul_enter: 'yongchul_enter',
  yongchul_d1: 'yongchul_enter',
  yongchul_d2: 'yongchul_enter',

  // 용철이 자리에 앉음
  yongchul_d3: 'yongchul_sits_down',
  yongchul_d4: 'yongchul_sits_down',

  // 첫 영업 시작
  business_lineup: 'night_session_early',

  // 밤 영업 몽타주
  business_timeskip: 'night_montage',
  business_revenue: 'night_montage',

  // 미수 요청 이벤트 (핵심 장면)
  event_stop: 'yongchul_demand',
  event_d1: 'yongchul_demand',
  event_d2: 'yongchul_demand',
  event_d3: 'yongchul_demand',
  event_d4: 'yongchul_demand',
  event_d5: 'yongchul_demand',

  // 미수 경고 / 선택지
  event_alert: 'credit_alert_standoff',
  event_tutorial2: 'credit_alert_standoff',
  event_choice: 'credit_alert_standoff',

  // ① 허락 분기
  event_after1: 'yongchul_granted',
  event_after1b: 'yongchul_granted',

  // ② 거절 분기
  event_after2: 'yongchul_refused',
  event_after2b: 'yongchul_refused',
  event_after2c: 'yongchul_refused',

  // ③ 쫓아내는 분기
  event_after3: 'yongchul_kicked_out',
  event_after3b: 'yongchul_kicked_out',
  event_after3c: 'yongchul_kicked_out',
  event_after3d: 'yongchul_kicked_out',
  event_after3e: 'yongchul_kicked_out',

  // 테이블 붕괴
  event_converge: 'room_table_broken',
  table_stopped: 'room_table_broken',

  // 태식이 "방어해"라고 압박하는 순간
  defense_intro1: 'taesik_defense_order',
  defense_intro2: 'taesik_defense_order',
  defense_intro3: 'taesik_defense_order',
  defense_intro4: 'taesik_defense_order',
  defense_intro5: 'taesik_defense_order',
  defense_intro6: 'taesik_defense_order',
  defense_tutorial: 'taesik_defense_order',
  defense_cta: 'taesik_defense_order',

  // 새벽, 혼자 남는 엔딩 ~ 박사장 문자
  night_end1: 'dawn_alone',
  night_end2: 'dawn_alone',
  night_end3: 'dawn_alone',
  night_opex: 'dawn_alone',
  day_result: 'dawn_alone',
  baksa_msg1: 'dawn_alone',
  baksa_msg2: 'dawn_alone',
  baksa_choice: 'dawn_alone',
};
