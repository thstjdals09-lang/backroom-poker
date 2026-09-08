// 카이로소프트 모티브의 도트(픽셀) 아트 렌더러.
// 실제 비트맵 대신 SVG 사각형 격자로 그려서 어떤 해상도에서도 각지고
// 또렷하게(anti-alias 없이) 보이도록 한다. 그림 데이터는 Grid(2차원 색상 배열).

export type Grid = (string | null)[][];

export function emptyGrid(size: number): Grid {
  return Array.from({ length: size }, () => Array<string | null>(size).fill(null));
}

export function setPixel(g: Grid, x: number, y: number, color: string) {
  if (g[y] && x >= 0 && x < g[y].length) g[y][x] = color;
}

export function clearPixel(g: Grid, x: number, y: number) {
  if (g[y] && x >= 0 && x < g[y].length) g[y][x] = null;
}

// 실루엣 바깥쪽으로 1px 외곽선을 둘러준다 (마플스토리/카이로소프트류
// 스프라이트 특유의 또렷한 잉크 라인). 모든 디테일을 다 그린 뒤 마지막에 호출.
export function outlineSilhouette(g: Grid, color: string) {
  const size = g.length;
  const additions: [number, number][] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (g[y][x]) continue;
      const touches =
        !!g[y]?.[x - 1] || !!g[y]?.[x + 1] || !!g[y - 1]?.[x] || !!g[y + 1]?.[x];
      if (touches) additions.push([x, y]);
    }
  }
  for (const [x, y] of additions) setPixel(g, x, y, color);
}

export function paintRect(
  g: Grid,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  requireColor?: string
) {
  for (let j = y; j < y + h; j++)
    for (let i = x; i < x + w; i++) {
      if (requireColor !== undefined && g[j]?.[i] !== requireColor) continue;
      setPixel(g, i, j, color);
    }
}

export function paintCircle(
  g: Grid,
  cx: number,
  cy: number,
  r: number,
  color: string,
  rowRange?: [number, number],
  requireColor?: string
) {
  const size = g.length;
  for (let y = 0; y < size; y++) {
    if (rowRange && (y < rowRange[0] || y > rowRange[1])) continue;
    for (let x = 0; x < size; x++) {
      if (requireColor !== undefined && g[y]?.[x] !== requireColor) continue;
      const dx = x - cx + 0.5;
      const dy = y - cy + 0.5;
      if (dx * dx + dy * dy <= r * r) setPixel(g, x, y, color);
    }
  }
}

export function PixelArt({ grid }: { grid: Grid }) {
  const size = grid.length;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" shapeRendering="crispEdges">
      {grid.map((row, y) =>
        row.map((color, x) =>
          color ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} /> : null
        )
      )}
    </svg>
  );
}
