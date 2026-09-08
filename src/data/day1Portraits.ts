// Beat id -> 초상화 변형(감정) 이미지 키 매핑.
// beat.portrait(=npc id)는 이름/픽셀 폴백용으로 그대로 쓰고, 여기서
// 지정된 beat는 그 대신 특정 표정 변형 이미지를 보여준다.
// 지정 안 된 beat는 npc의 기본 초상화를 그대로 쓴다.

export const day1Portraits: Record<string, string> = {
  // 태식 — 에어컨 시비로 짜증
  taesik_d3: 'taesik_annoyed',
  taesik_d5: 'taesik_annoyed',

  // 태식 — 웃는 반응
  taesik_after1: 'taesik_laugh',
  taesik_after2: 'taesik_laugh',

  // 태식 — 진지한 표정
  event_after3c: 'taesik_serious',
  defense_intro2: 'taesik_serious',
  defense_intro4: 'taesik_serious',
  defense_intro6: 'taesik_serious',
  night_end2: 'taesik_serious',

  // 재훈 — 휴대폰 보는 중
  jaehoon_d1: 'jaehoon_phone',

  // 재훈 — 불편한 기색
  jaehoon_d3: 'jaehoon_uncomfortable',
  jaehoon_d4: 'jaehoon_uncomfortable',

  // 재훈 — 긴장
  event_after3d: 'jaehoon_tense',

  // 용철 — 넌지시 부탁
  event_d1: 'yongchul_softask',
  event_d3: 'yongchul_softask',
  event_d5: 'yongchul_softask',

  // 용철 — 기분 상함
  event_after2: 'yongchul_offended',
  event_after2c: 'yongchul_offended',

  // 용철 — 압박
  event_after3b: 'yongchul_pressuring',
};
