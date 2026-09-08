// 현재 실제 캐릭터 이미지가 없으므로 이니셜 실루엣을 임시로 사용한다.
// 나중에 /public/portraits/<npcId>.png 가 생기면 여기서 <img> 로 교체하면 된다.

export default function PortraitFrame({ name }: { name: string }) {
  const initial = name.trim().charAt(0) || '?';
  return (
    <div className="portrait-row">
      <div className="portrait-frame">{initial}</div>
    </div>
  );
}
