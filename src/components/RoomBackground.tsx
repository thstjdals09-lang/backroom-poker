import ImageWithFallback from './ImageWithFallback';
import PokerRoomBackground from './PokerRoomBackground';

// public/backgrounds/<bgKey>.png 가 있으면 그 실제 아트를, 없으면(아직 아트가
// 없거나 로드 실패) 공통 픽셀 배경으로 대체한다. bgKey를 지정하지 않으면
// 기본 룸 배경('room')을 쓴다.

export default function RoomBackground({ bgKey = 'room' }: { bgKey?: string }) {
  return (
    <ImageWithFallback
      key={bgKey}
      src={`/backgrounds/${bgKey}.png`}
      alt=""
      fallback={<PokerRoomBackground />}
      imgStyle={{ objectPosition: 'center bottom' }}
    />
  );
}
