import CharacterPortrait, { hasPortrait } from './CharacterPortrait';
import ImageWithFallback from './ImageWithFallback';

// npcId가 있고 스프라이트가 준비된 캐릭터면:
//   1) public/portraits/<npcId>.png 가 있으면 그 실제 아트를 쓰고
//   2) 없으면 픽셀 초상화로 자동 대체하고
//   3) 그것도 없으면 이니셜 실루엣을 보여준다.
// 즉 이미지 파일을 public/portraits/에 정해진 이름으로 넣기만 하면 된다.

export default function PortraitFrame({
  name,
  npcId,
  size = 'lg',
  inline = false,
}: {
  name: string;
  npcId?: string;
  size?: 'lg' | 'sm';
  inline?: boolean;
}) {
  const initial = name.trim().charAt(0) || '?';
  const illustrated = npcId ? hasPortrait(npcId) : false;
  const frame = (
    <div className={`portrait-frame ${size === 'sm' ? 'portrait-frame--sm' : ''}`}>
      {illustrated && npcId ? (
        <ImageWithFallback
          key={npcId}
          src={`/portraits/${npcId}.png`}
          alt={name}
          fallback={<CharacterPortrait npcId={npcId} />}
        />
      ) : (
        initial
      )}
    </div>
  );
  if (inline) return frame;
  return <div className="portrait-row">{frame}</div>;
}
