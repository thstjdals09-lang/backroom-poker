import CharacterPortrait, { hasPortrait } from './CharacterPortrait';

// npcId가 있고 스프라이트가 준비된 캐릭터면 픽셀 초상화를, 아니면 이니셜 실루엣을 보여준다.
// 나중에 진짜 아트가 들어오면 CharacterPortrait 내부만 교체하면 된다.

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
      {illustrated && npcId ? <CharacterPortrait npcId={npcId} /> : initial}
    </div>
  );
  if (inline) return frame;
  return <div className="portrait-row">{frame}</div>;
}
