// 개발용 1회성 스크립트. 게임 번들에는 포함되지 않는다.
// Gemini 2.5 Flash Image("나노바나나")로 캐릭터 초상화/배경 아트를 생성해서
// public/ 아래에 정적 PNG로 저장한다. 실행: node scripts/generate-art.mjs [target]

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) throw new Error('.env 파일이 없습니다. GEMINI_API_KEY를 넣어주세요.');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const { GEMINI_API_KEY } = loadEnv();
if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY가 .env에 없습니다.');

const STYLE = `semi-realistic painterly digital illustration, gritty Korean underground basement
poker room, dim warm-and-green flickering fluorescent lighting, moody cinematic shadows,
slightly retro low-budget dive-bar atmosphere, muted color palette (olive green / rust / cream),
game character art style similar to a narrative mobile game, NOT anime, NOT cartoon, textured
brushwork, subtle grain, vertical portrait composition`;

const TARGETS = {
  yongchul: {
    out: 'public/portraits/yongchul.png',
    prompt: `${STYLE}. A close-up bust portrait of a loud, jovial 46-year-old Korean man named
Yongchul: thinning/balding hair, gold necklace, wearing a worn maroon tracksuit jacket, gold
tooth visible, mid-shout with an animated angry-but-comedic expression pointing a cigarette at
the viewer, sitting at a poker table with cards and poker chips faintly visible below, other
blurred patrons in the dim background. Square-ish portrait crop, character fills most of the
frame, high detail on the face.`,
  },
  taesik: {
    out: 'public/portraits/taesik.png',
    prompt: `${STYLE}. A close-up bust portrait of a tough 39-year-old Korean man named Taesik:
buzzcut hair, visible tattoo sleeves peeking from a tight black athletic t-shirt, holding a
convenience-store iced americano cup, cocky smirking expression, sitting at the same dim poker
table. Square-ish portrait crop, character fills most of the frame, high detail on the face.`,
  },
  jaehoon: {
    out: 'public/portraits/jaehoon.png',
    prompt: `${STYLE}. A close-up bust portrait of a quiet 28-year-old Korean man named Jaehoon:
a baseball cap pulled down low shadowing his eyes, plain dark hoodie, holding a smartphone,
withdrawn expressionless mood, sitting at the same dim poker table. Square-ish portrait crop,
character fills most of the frame, high detail visible on the lower face even with the cap
shadow.`,
  },
  room: {
    out: 'public/backgrounds/room.png',
    prompt: `${STYLE}. A wide establishing shot of the empty small underground poker room itself:
one worn poker table with mismatched chairs, a single flickering fluorescent tube light on the
ceiling, a small old fridge in the corner, a soccer team calendar and a handwritten warning
poster on the concrete wall, soju and beer bottles on a shelf, an old CRT tv, ashtrays and poker
chips scattered on the table, nobody sitting, tall vertical mobile-game background composition
(portrait orientation, roughly 9:19.5 aspect ratio), atmospheric and slightly empty/lonely mood.`,
  },
};

async function generateImage(prompt) {
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-image:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
      }),
    }
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`API 오류 ${res.status}: ${text.slice(0, 500)}`);
  }
  const json = JSON.parse(text);
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart) {
    throw new Error(`이미지가 응답에 없습니다: ${text.slice(0, 500)}`);
  }
  return Buffer.from(imagePart.inlineData.data, 'base64');
}

async function main() {
  const only = process.argv[2];
  const keys = only ? [only] : Object.keys(TARGETS);

  for (const key of keys) {
    const target = TARGETS[key];
    if (!target) {
      console.error(`알 수 없는 타겟: ${key}`);
      continue;
    }
    const outPath = join(ROOT, target.out);
    mkdirSync(dirname(outPath), { recursive: true });
    console.log(`생성 중: ${key} -> ${target.out}`);
    try {
      const buf = await generateImage(target.prompt);
      writeFileSync(outPath, buf);
      console.log(`완료: ${key} (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`실패: ${key} —`, err.message);
    }
  }
}

main();
