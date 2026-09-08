// ============================================================
// 사운드 매니저
// 실제 mp3 에셋 없이도 Web Audio API로 즉석에서 합성한 효과음을
// 재생한다 (문 소리, 셔플, 칩, 형광등 험, 클릭 등). 나중에 진짜
// 녹음 파일이 생기면 loadSfx()만 <audio src="/sfx/..."> 로 바꾸면 된다.
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

let ctx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;
const lastPlayed = new Map<SfxKey, number>();
const MIN_INTERVAL_MS = 60; // 같은 효과음이 너무 촘촘하게 겹쳐 재생되는 것을 방지

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// 매번 랜덤 버퍼를 새로 만들지 않고, 1초짜리 화이트노이즈 버퍼 하나를
// 공유해서 재사용한다 (짧게 잘라 쓰면 카드/칩 소리로 충분히 자연스럽다).
function getNoiseBuffer(ac: AudioContext): AudioBuffer {
  if (sharedNoiseBuffer && sharedNoiseBuffer.sampleRate === ac.sampleRate) return sharedNoiseBuffer;
  const len = ac.sampleRate; // 1초
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  sharedNoiseBuffer = buffer;
  return buffer;
}

function envGain(ac: AudioContext, start: number, attack: number, decay: number, peak = 0.5) {
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, start + attack + decay);
  return gain;
}

function tone(
  ac: AudioContext,
  master: GainNode,
  {
    freq,
    type = 'sine',
    start = 0,
    attack = 0.005,
    decay = 0.18,
    peak = 0.5,
    glideTo,
  }: {
    freq: number;
    type?: OscillatorType;
    start?: number;
    attack?: number;
    decay?: number;
    peak?: number;
    glideTo?: number;
  }
) {
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + attack + decay);
  }
  const gain = envGain(ac, t0, attack, decay, peak);
  osc.connect(gain).connect(master);
  osc.start(t0);
  osc.stop(t0 + attack + decay + 0.05);
}

function noiseBurst(
  ac: AudioContext,
  master: GainNode,
  {
    start = 0,
    duration = 0.15,
    peak = 0.35,
    filterType = 'bandpass' as BiquadFilterType,
    filterFreq = 1200,
    q = 0.8,
  } = {}
) {
  const t0 = ac.currentTime + start;
  const buffer = getNoiseBuffer(ac);
  const offset = Math.random() * Math.max(0, buffer.duration - duration - 0.01);

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  filter.Q.value = q;

  const gain = envGain(ac, t0, 0.005, duration, peak);
  src.connect(filter).connect(gain).connect(master);
  src.start(t0, offset, duration);
}

const BUILDERS: Record<SfxKey, (ac: AudioContext, master: GainNode) => void> = {
  doorOpen: (ac, m) => {
    tone(ac, m, { freq: 180, glideTo: 90, type: 'sawtooth', attack: 0.02, decay: 0.4, peak: 0.25 });
    noiseBurst(ac, m, { start: 0.03, duration: 0.3, peak: 0.08, filterFreq: 400, filterType: 'lowpass' });
  },
  cardShuffle: (ac, m) => {
    for (let i = 0; i < 4; i++) {
      noiseBurst(ac, m, {
        start: i * 0.09,
        duration: 0.08,
        peak: 0.22,
        filterType: 'highpass',
        filterFreq: 2200,
        q: 0.6,
      });
    }
  },
  chip: (ac, m) => {
    tone(ac, m, { freq: 1400, type: 'square', attack: 0.001, decay: 0.05, peak: 0.15 });
    noiseBurst(ac, m, { duration: 0.04, peak: 0.15, filterFreq: 2800, q: 1.2 });
  },
  fluorescentHum: (ac, m) => {
    tone(ac, m, { freq: 120, type: 'square', attack: 0.05, decay: 0.5, peak: 0.05 });
  },
  choiceClick: (ac, m) => {
    tone(ac, m, { freq: 880, type: 'triangle', attack: 0.002, decay: 0.06, peak: 0.2 });
  },
  eventTrigger: (ac, m) => {
    tone(ac, m, { freq: 520, type: 'square', attack: 0.005, decay: 0.12, peak: 0.22, start: 0 });
    tone(ac, m, { freq: 780, type: 'square', attack: 0.005, decay: 0.16, peak: 0.22, start: 0.13 });
  },
  mentalDown: (ac, m) => {
    tone(ac, m, { freq: 320, glideTo: 160, type: 'sine', attack: 0.01, decay: 0.35, peak: 0.25 });
  },
  defenseStart: (ac, m) => {
    tone(ac, m, { freq: 110, type: 'sawtooth', attack: 0.01, decay: 0.3, peak: 0.28 });
    tone(ac, m, { freq: 165, type: 'sawtooth', attack: 0.01, decay: 0.3, peak: 0.18, start: 0.02 });
  },
  defenseSuccess: (ac, m) => {
    [523, 659, 784].forEach((freq, i) => {
      tone(ac, m, { freq, type: 'triangle', attack: 0.005, decay: 0.22, peak: 0.22, start: i * 0.09 });
    });
  },
};

export function playSfx(key: SfxKey): void {
  const now = performance.now();
  const last = lastPlayed.get(key) ?? -Infinity;
  if (now - last < MIN_INTERVAL_MS) return;
  lastPlayed.set(key, now);

  const ac = getCtx();
  if (!ac || ac.state !== 'running') return;
  try {
    const master = ac.createGain();
    master.gain.value = 1;
    master.connect(ac.destination);
    BUILDERS[key](ac, master);
  } catch {
    // 오디오를 못 만드는 환경 — 조용히 무시
  }
}
