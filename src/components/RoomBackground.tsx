import ImageWithFallback from './ImageWithFallback';
import PokerRoomBackground from './PokerRoomBackground';

// public/backgrounds/room.png 가 있으면 그 실제 아트를, 없으면 픽셀 배경을 보여준다.

export default function RoomBackground() {
  return (
    <ImageWithFallback
      src="/backgrounds/room.png"
      alt=""
      fallback={<PokerRoomBackground />}
      imgStyle={{ objectPosition: 'center bottom' }}
    />
  );
}
