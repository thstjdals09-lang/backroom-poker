import { PixelArt } from './pixel/PixelArt';
import { ICON_SPRITES } from './pixel/iconSprites';

export type IconName = keyof typeof ICON_SPRITES;

export default function PixelIcon({ name, size = 32 }: { name: IconName; size?: number }) {
  const build = ICON_SPRITES[name];
  if (!build) return null;
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <PixelArt grid={build()} />
    </div>
  );
}
