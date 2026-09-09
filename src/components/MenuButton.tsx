import type { ReactNode } from 'react';

// 텍스트가 없는 idle/active 두 장의 PNG 프레임 위에 실제 텍스트를 얹는
// 타이틀 메뉴 버튼. hover/focus-visible/active 상태는 전부 CSS로 처리하고
// 클릭 가능한 실제 <button>을 유지한다. 새 이미지는 만들지 않는다.

export default function MenuButton({
  children,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const base = import.meta.env.BASE_URL;
  return (
    <button className="menu-btn" onClick={onClick} type="button">
      <img className="menu-btn__bg menu-btn__bg--idle" src={`${base}ui/menu_button_idle.png`} alt="" />
      <img className="menu-btn__bg menu-btn__bg--active" src={`${base}ui/menu_button_active.png`} alt="" />
      <span className={`menu-btn__label menu-btn__label--${variant}`}>{children}</span>
    </button>
  );
}
