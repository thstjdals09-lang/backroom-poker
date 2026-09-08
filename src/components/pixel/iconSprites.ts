import { emptyGrid, paintRect, setPixel, type Grid } from './PixelArt';

// ROOM/SHOP 등에서 쓰는 12x12 도트 아이콘 세트.

const SIZE = 12;

export function fridgeGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 2, 1, 8, 10, '#e9ead9');
  paintRect(g, 2, 1, 8, 1, '#c9d2a4');
  paintRect(g, 2, 5, 8, 1, '#a3a890');
  setPixel(g, 8, 3, '#4a5238');
  setPixel(g, 8, 7, '#4a5238');
  return g;
}

export function airconGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 1, 3, 10, 4, '#e9ead9');
  paintRect(g, 2, 4, 2, 2, '#2f5f7a');
  paintRect(g, 5, 4, 2, 2, '#2f5f7a');
  paintRect(g, 8, 4, 2, 2, '#2f5f7a');
  paintRect(g, 1, 7, 10, 1, '#a3a890');
  return g;
}

export function coffeeGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 3, 5, 6, 5, '#eef3d8');
  paintRect(g, 3, 9, 6, 1, '#4a2f1c');
  setPixel(g, 9, 6, '#c9d2a4');
  setPixel(g, 10, 6, '#c9d2a4');
  setPixel(g, 4, 3, '#c9a13b');
  setPixel(g, 6, 2, '#c9a13b');
  setPixel(g, 8, 3, '#c9a13b');
  return g;
}

export function chipsGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 2, 7, 8, 2, '#a5342a');
  paintRect(g, 2, 5, 8, 2, '#eef3d8');
  paintRect(g, 2, 3, 8, 2, '#2f5f7a');
  paintRect(g, 3, 3, 1, 6, '#12140f');
  paintRect(g, 8, 3, 1, 6, '#12140f');
  return g;
}

export function cardsGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 1, 3, 6, 8, '#20241a');
  paintRect(g, 2, 4, 6, 8, '#f2efe1');
  setPixel(g, 3, 5, '#a5342a');
  setPixel(g, 4, 5, '#a5342a');
  setPixel(g, 3, 10, '#a5342a');
  setPixel(g, 4, 10, '#a5342a');
  return g;
}

export function keyGrid(): Grid {
  const g = emptyGrid(SIZE);
  paintRect(g, 1, 4, 4, 4, '#d8b64a');
  paintRect(g, 2, 5, 2, 2, '#12140f');
  paintRect(g, 5, 5, 6, 2, '#d8b64a');
  paintRect(g, 9, 7, 1, 2, '#d8b64a');
  paintRect(g, 11, 5, 1, 2, '#d8b64a');
  return g;
}

export const ICON_SPRITES: Record<string, () => Grid> = {
  fridge: fridgeGrid,
  aircon: airconGrid,
  coffee: coffeeGrid,
  chips: chipsGrid,
  cards: cardsGrid,
  key: keyGrid,
};
