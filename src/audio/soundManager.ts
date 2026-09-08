// ============================================================
// 사운드 매니저 (placeholder)
// 실제 mp3 파일이 public/sfx/ 아래 존재하면 재생하고,
// 없으면 조용히 무시한다. 나중에 에셋만 넣으면 바로 동작한다.
// ============================================================

export type SfxKey =
  | 'doorOpen'
  | 'cardShuffle'
  | 'chip'
  | 'fluorescentHum'
  | 'choiceClick'
  | 'eventTrigger'
  | 'mentalDown'
  | 'defenseStart'
  | 'defenseSuccess';

const cache = new Map<SfxKey, HTMLAudioElement | null>();

function loadSfx(key: SfxKey): HTMLAudioElement | null {
  if (cache.has(key)) return cache.get(key)!;
  try {
    const audio = new Audio(`/sfx/${key}.mp3`);
    audio.volume = 0.6;
    cache.set(key, audio);
    return audio;
  } catch {
    cache.set(key, null);
    return null;
  }
}

export function playSfx(key: SfxKey): void {
  const audio = loadSfx(key);
  if (!audio) return;
  // 파일이 실제로 없으면 에러 이벤트만 조용히 삼킨다 (placeholder 상태 허용).
  const clone = audio.cloneNode(true) as HTMLAudioElement;
  clone.volume = audio.volume;
  clone.play().catch(() => {
    /* 아직 사운드 에셋이 없음 — 정상 동작 */
  });
}
