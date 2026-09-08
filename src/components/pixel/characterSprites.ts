import {
  clearPixel,
  emptyGrid,
  outlineSilhouette,
  paintCircle,
  paintRect,
  setPixel,
  type Grid,
} from './PixelArt';

// 카이로소프트/도트 RPG풍 32x32 칩 캐릭터 스프라이트.
// 실제 아트 에셋이 들어오기 전까지 이 게임의 공식 캐릭터 비주얼로 쓰인다.
// 얼굴/의상에 하이라이트-베이스-쉐도우 3톤 음영을 넣고, 마지막에 실루엣
// 외곽선을 둘러서(outlineSilhouette) 또렷한 "잉크 라인" 느낌을 낸다.

const SIZE = 32;
const OUTLINE = '#0b0d08';

const SKIN = '#c98f5c';
const SKIN_HI = '#dba876';
const SKIN_SH = '#a8734a';
const EYE_WHITE = '#f2efe1';
const PUPIL = '#181a12';
const BROW = '#181a12';

const HEAD_CX = 16;
const HEAD_CY = 12;
const HEAD_R = 9;

function baseHead(g: Grid) {
  paintCircle(g, HEAD_CX, HEAD_CY, HEAD_R, SKIN);
  paintCircle(g, 13, 8, 3.4, SKIN_HI, undefined, SKIN); // 이마 하이라이트
  paintRect(g, 9, 17, 14, 4, SKIN_SH, SKIN); // 턱선 그림자
  paintRect(g, 13, 19, 6, 3, SKIN);
  paintRect(g, 13, 20, 6, 2, SKIN_SH, SKIN); // 목 밑 그림자
}

function baseTorso(g: Grid, color: string, hi: string, sh: string) {
  paintRect(g, 7, 21, 18, 11, color);
  clearPixel(g, 7, 21);
  clearPixel(g, 24, 21); // 어깨를 살짝 둥글게
  paintRect(g, 9, 22, 4, 3, hi, color); // 왼쪽 어깨 하이라이트
  paintRect(g, 15, 23, 2, 9, sh, color); // 가운데 접힘 그림자
}

function eyes(g: Grid, opts?: { round?: boolean }) {
  if (opts?.round) {
    paintRect(g, 10, 11, 3, 3, EYE_WHITE);
    paintRect(g, 19, 11, 3, 3, EYE_WHITE);
    setPixel(g, 11, 12, PUPIL);
    setPixel(g, 20, 12, PUPIL);
  } else {
    paintRect(g, 11, 12, 2, 2, EYE_WHITE);
    paintRect(g, 19, 12, 2, 2, EYE_WHITE);
    setPixel(g, 12, 13, PUPIL);
    setPixel(g, 19, 13, PUPIL);
  }
}

export function taesikGrid(): Grid {
  const g = emptyGrid(SIZE);
  const HAIR = '#1c1a16';
  const HAIR_HI = '#332e26';
  const SHIRT = '#141613';
  const SHIRT_HI = '#23261c';
  const SHIRT_SH = '#0a0b08';
  const TATTOO = '#4a7a63';
  const CUP = '#eef3d8';
  const CUP_LID = '#c9d2a4';
  const STRAW = '#8a916f';

  baseHead(g);
  // 버즈컷
  paintCircle(g, HEAD_CX, HEAD_CY, HEAD_R, HAIR, [2, 6]);
  paintRect(g, 12, 3, 6, 1, HAIR_HI, HAIR);

  baseTorso(g, SHIRT, SHIRT_HI, SHIRT_SH);

  // 화난 듯 치켜 올라간 눈썹
  setPixel(g, 11, 11, BROW);
  setPixel(g, 12, 10, BROW);
  setPixel(g, 13, 10, BROW);
  setPixel(g, 20, 11, BROW);
  setPixel(g, 19, 10, BROW);
  setPixel(g, 18, 10, BROW);
  eyes(g);
  paintRect(g, 14, 17, 4, 1, '#7a4a30'); // 무표정 입

  // 이레즈미 문신 (어깨 라인)
  setPixel(g, 8, 20, TATTOO);
  setPixel(g, 8, 21, TATTOO);
  setPixel(g, 7, 22, TATTOO);
  setPixel(g, 24, 20, TATTOO);
  setPixel(g, 24, 21, TATTOO);
  setPixel(g, 25, 22, TATTOO);

  // 아이스 아메리카노
  paintRect(g, 26, 22, 4, 8, CUP);
  paintRect(g, 26, 21, 4, 1, CUP_LID);
  setPixel(g, 28, 19, STRAW);
  setPixel(g, 28, 20, STRAW);

  outlineSilhouette(g, OUTLINE);
  return g;
}

export function jaehoonGrid(): Grid {
  const g = emptyGrid(SIZE);
  const CAP = '#12140f';
  const BRIM = '#0a0b08';
  const HOOD = '#39432b';
  const HOOD_HI = '#4a5636';
  const HOOD_SH = '#28311d';
  const PHONE = '#0e0f0a';
  const SCREEN = '#6f9950';
  const SCREEN_HI = '#9fc47d';
  const MOUTH = '#5c4326';

  baseHead(g);
  baseTorso(g, HOOD, HOOD_HI, HOOD_SH);

  // 모자 (얼굴을 넓게 덮는다)
  paintCircle(g, 16, 11, 9.3, CAP, [2, 10]);
  paintRect(g, 6, 10, 20, 2, BRIM);
  // 챙 그림자 (눈이 있어야 할 자리)
  paintRect(g, 9, 12, 14, 3, SKIN_SH, SKIN);

  paintRect(g, 14, 17, 4, 1, MOUTH); // 말 없는 입

  // 휴대폰
  paintRect(g, 26, 20, 4, 7, PHONE);
  paintRect(g, 27, 21, 2, 5, SCREEN);
  setPixel(g, 27, 22, SCREEN_HI);

  outlineSilhouette(g, OUTLINE);
  return g;
}

export function yongchulGrid(): Grid {
  const g = emptyGrid(SIZE);
  const HAIR_SIDE = '#2e2419';
  const SHINE = '#eab98a';
  const SHIRT = '#6e2b25';
  const SHIRT_HI = '#853730';
  const SHIRT_SH = '#521f1a';
  const GOLD = '#e8c869';
  const STRAP = '#241b12';
  const MOUTH = '#5c3a20';

  baseHead(g);
  // 옆머리만 (정수리는 벗겨짐)
  paintRect(g, 6, 5, 3, 6, HAIR_SIDE);
  paintRect(g, 23, 5, 3, 6, HAIR_SIDE);
  setPixel(g, 15, 4, SHINE);
  setPixel(g, 16, 4, SHINE);

  baseTorso(g, SHIRT, SHIRT_HI, SHIRT_SH);

  // 둥글고 놀란 눈썹 (호탕한 인상)
  setPixel(g, 10, 9, BROW);
  setPixel(g, 11, 9, BROW);
  setPixel(g, 12, 9, BROW);
  setPixel(g, 19, 9, BROW);
  setPixel(g, 20, 9, BROW);
  setPixel(g, 21, 9, BROW);
  eyes(g, { round: true });

  // 큰 웃음 + 금니
  paintRect(g, 11, 16, 10, 1, MOUTH);
  setPixel(g, 10, 15, MOUTH);
  setPixel(g, 21, 15, MOUTH);
  setPixel(g, 16, 16, GOLD);

  // 금목걸이
  paintRect(g, 12, 19, 8, 1, GOLD);
  setPixel(g, 11, 18, GOLD);
  setPixel(g, 20, 18, GOLD);

  // 크로스백 스트랩 (대각선)
  for (let i = 0; i < 9; i++) setPixel(g, 9 + i, 22 + i, STRAP);

  outlineSilhouette(g, OUTLINE);
  return g;
}

export const CHARACTER_SPRITES: Record<string, () => Grid> = {
  taesik: taesikGrid,
  jaehoon: jaehoonGrid,
  yongchul: yongchulGrid,
};
