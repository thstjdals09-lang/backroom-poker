import { useState, type CSSProperties, type ReactNode } from 'react';

// public/ 아래에 실제 아트 파일이 있으면 그걸 쓰고, 없거나 로드에 실패하면
// (아직 파일을 안 넣었을 때) fallback으로 넘어간다. 즉 이미지 파일을
// 정해진 경로/이름으로 넣기만 하면 코드 수정 없이 바로 반영된다.

export default function ImageWithFallback({
  src,
  alt = '',
  fallback,
  imgStyle,
}: {
  src: string;
  alt?: string;
  fallback: ReactNode;
  imgStyle?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...imgStyle }}
    />
  );
}
