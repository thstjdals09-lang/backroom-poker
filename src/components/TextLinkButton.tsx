import type { ReactNode } from 'react';

// Reset Game처럼 박스 이미지 없이 텍스트만 있는 보조 버튼.

export default function TextLinkButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="text-link-btn" onClick={onClick} type="button">
      {children}
    </button>
  );
}
