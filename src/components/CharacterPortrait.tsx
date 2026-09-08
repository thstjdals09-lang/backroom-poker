import { PixelArt } from './pixel/PixelArt';
import { CHARACTER_SPRITES } from './pixel/characterSprites';

// 실제 아트 에셋이 들어오기 전까지 쓰는 카이로소프트풍 도트 초상화.
// 나중에 진짜 그림이 생기면 이 컴포넌트 내부만 <img src={`/portraits/${id}.png`}> 로 바꾸면 된다.

export default function CharacterPortrait({ npcId }: { npcId: string }) {
  const build = CHARACTER_SPRITES[npcId];
  if (!build) return null;
  return <PixelArt grid={build()} />;
}

export function hasPortrait(npcId: string) {
  return npcId in CHARACTER_SPRITES;
}
