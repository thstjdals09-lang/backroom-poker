import type { Flags } from '../types';

// 개발/테스트용 "원하는 시점부터 시작" 지점 목록.
// 타이틀 화면의 디버그 점프에서만 쓰인다 — 실제 플레이 흐름과는 무관.

export interface DebugCheckpoint {
  id: string;
  label: string;
  day: number;
  beatId: string;
  flags?: Flags;
}

export const debugCheckpoints: DebugCheckpoint[] = [
  { id: 'd1_taesik', label: 'Day1 · 태식 등장', day: 1, beatId: 'npc_taesik_enter' },
  { id: 'd1_jaehoon', label: 'Day1 · 재훈 등장', day: 1, beatId: 'npc_jaehoon_enter' },
  { id: 'd1_yongchul', label: 'Day1 · 용철 등장', day: 1, beatId: 'npc_yongchul_enter' },
  { id: 'd1_event', label: 'Day1 · 미수 이벤트', day: 1, beatId: 'event_stop' },
  { id: 'd1_defense', label: 'Day1 · 방어전', day: 1, beatId: 'defense_intro1' },
  { id: 'd1_result', label: 'Day1 · 정산 / 투자 선택', day: 1, beatId: 'day_result' },
  { id: 'd1_baksa', label: 'Day1 · 박사장 문자', day: 1, beatId: 'baksa_msg1' },
  {
    id: 'd2_start_fixed',
    label: 'Day2 · 시작 (에어컨 수리함)',
    day: 2,
    beatId: 'd2_label_fixed',
    flags: { airconFixed: true, creditChoice: 'granted' },
  },
  {
    id: 'd2_start_broken',
    label: 'Day2 · 시작 (에어컨 안 고침)',
    day: 2,
    beatId: 'd2_label_broken',
    flags: { airconFixed: false, creditChoice: 'granted' },
  },
  {
    id: 'd2_rumor_granted_fixed',
    label: 'Day2 · 소문 - 미수 허용 + 수리함',
    day: 2,
    beatId: 'd2_rumor_branch',
    flags: { creditChoice: 'granted', airconFixed: true },
  },
  {
    id: 'd2_rumor_granted_broken',
    label: 'Day2 · 소문 - 미수 허용 + 미수리',
    day: 2,
    beatId: 'd2_rumor_branch',
    flags: { creditChoice: 'granted', airconFixed: false },
  },
  {
    id: 'd2_rumor_refused',
    label: 'Day2 · 소문 - 미수 거절',
    day: 2,
    beatId: 'd2_rumor_branch',
    flags: { creditChoice: 'refused' },
  },
  {
    id: 'd2_rumor_kicked',
    label: 'Day2 · 소문 - 용철 축출',
    day: 2,
    beatId: 'd2_rumor_branch',
    flags: { creditChoice: 'kicked' },
  },
  {
    id: 'd2_conflict',
    label: 'Day2 · 태식 vs 재훈 충돌',
    day: 2,
    beatId: 'd2_business_start',
    flags: { creditChoice: 'granted', airconFixed: true },
  },
];
