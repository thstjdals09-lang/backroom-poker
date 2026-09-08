# ACE — 외부 이미지 생성용 아트 브리프

외부 이미지 생성 엔진(미드저니/나노바나나/SDXL 등)으로 만든 파일을
아래 **정확한 경로/파일명**으로 저장하면, 코드 수정 없이 게임이 자동으로
픽셀아트 대신 그 이미지를 사용한다. (실패 시엔 지금처럼 픽셀아트로 자동
복귀하니 안전하게 하나씩 넣어봐도 된다.)

총 **4장**이 필요하다 (초상화 3장 + 배경 1장).

---

## 공통 스타일 가이드 (모든 프롬프트 앞에 붙여서 써)

```
Style: semi-realistic painterly digital illustration for a narrative mobile
game — NOT anime, NOT flat cartoon, NOT a literal photo. Think moody
graphic-novel / concept-art brushwork, visible texture, subtle film grain.

Setting: a small illegal underground poker room in a Korean basement
commercial building — worn, cramped, slightly comedic-grim (down-to-earth
dark comedy, NOT a crime thriller).

Lighting: a single flickering fluorescent tube overhead is the ONLY light
source. Cool white-green core light falling off into warm amber/olive
shadow toward the edges of frame. Strong contrast but not pitch black.

Palette: muted olive green, rust/brown, cream. Small saturated accent pops
only from specific objects (red poker chips, a gold chain, a red calendar
header) — never blown-out or globally saturated.

Camera: slightly wide-angle handheld snapshot feel, faint vignette, no
motion blur, no depth-of-field bokeh circles.

Do NOT include: any text, logos, watermarks, speech bubbles, UI elements,
borders, or captions baked into the image — the app draws all UI on top
separately.
```

**일관성 유지 팁**
- 04번(배경)을 먼저 만들고, 그 이미지를 스타일/구도 레퍼런스로 01~03번에
  같이 넣어서 생성하면(이미지-투-이미지 지원 시) 방/조명/색감이 어긋나지
  않는다. 레퍼런스 기능이 없으면 4장을 **한 세션 안에 연달아** 생성해서
  톤이 흐르지 않게 할 것.
- 4장 모두 "천장의 형광등 하나가 유일한 광원"이라는 조명 설정을 동일하게
  유지해야 초상화가 배경과 한 공간에 있는 것처럼 보인다.
- 파일 포맷: **PNG** (배경이 어두운 UI 패널과 겹치는 부분이 있어서
  JPG 압축 아티팩트가 티가 남).

---

## 01. 태식 — `public/portraits/taesik.png`

- **용도**: 대화창에서 태식 등장 시 초상화 (정사각 프레임에 표시)
- **사이즈**: 1024 x 1024 px, PNG, 정사각형 1:1
- **구도**: 가슴 위 흉상 컷. 인물이 프레임 세로의 55~65%를 차지하도록
  중앙 배치. 카메라 정면 또는 살짝 3/4 각도. 하단 끝에 포커 테이블이
  흐릿하게 살짝 보여도 됨.

```
[공통 스타일 가이드]

A close-up bust portrait of a tough 39-year-old Korean man named Taesik:
buzzcut hair, muscular build, tattoo sleeves visible peeking from a tight
black athletic (Nike-style) t-shirt collar and sleeve, holding a
convenience-store iced americano cup low in frame, cocky smug half-smile
with slightly narrowed confident eyes. Sitting at a worn poker table,
faint chips and cards visible out of focus below. Square 1:1 portrait
crop, subject fills most of the frame.
```

---

## 02. 재훈 — `public/portraits/jaehoon.png`

- **용도**: 대화창에서 재훈 등장 시 초상화
- **사이즈**: 1024 x 1024 px, PNG, 정사각형 1:1
- **구도**: 01번과 동일한 흉상 컷/카메라 거리/조명을 유지 (인물 크기가
  세 캐릭터 간 갑자기 튀지 않도록).

```
[공통 스타일 가이드]

A close-up bust portrait of a quiet, withdrawn 28-year-old Korean man
named Jaehoon: a baseball cap pulled down low so his eyes are mostly in
shadow under the brim, plain dark hoodie, holding a smartphone low in
frame with a faint screen glow, closed neutral mouth, guarded expressionless
mood. Sitting at the same worn poker table, faint chips and cards visible
out of focus below. Square 1:1 portrait crop, subject fills most of the
frame, same camera distance and lighting as a matching set of portraits.
```

---

## 03. 용철 — `public/portraits/yongchul.png`

- **용도**: 대화창에서 용철 등장 시 초상화 (미수 요청 이벤트의 핵심 인물)
- **사이즈**: 1024 x 1024 px, PNG, 정사각형 1:1
- **구도**: 01/02와 동일한 흉상 컷/카메라 거리.

```
[공통 스타일 가이드]

A close-up bust portrait of a loud, jovial 46-year-old Korean man named
Yongchul: thinning/balding hair with hair only on the sides, a gold chain
necklace visible at an open collar, wearing a worn maroon/burgundy
tracksuit jacket with a white side stripe, a gold tooth visible, mid-shout
with an animated angry-but-comedic expression, pointing a lit cigarette
toward the camera. Sitting at the same worn poker table, faint chips and
cards visible out of focus below. Square 1:1 portrait crop, subject fills
most of the frame, same camera distance and lighting as a matching set of
portraits.
```

---

## 04. 룸 배경 — `public/backgrounds/room.png`

- **용도**: 모든 화면(타이틀/스토리/방어전/홈)의 배경. 세로 앱 프레임
  전체를 채우고, 위/아래는 UI에 가려질 수 있음.
- **사이즈**: 1080 x 2340 px, PNG, **세로 비율 정확히 9:19.5** (다른
  비율로 오면 자동으로 잘리므로 이 비율을 지켜야 함)
- **세이프존(중요)**:
  - 화면 **맨 위 ~120px**는 상태바(ROOM POINT/CASH/MENTAL/REP)에 자주
    가려짐 → 단순하고 어두운 영역으로 둘 것
  - 화면 **아래쪽 35~40%**는 대화창/선택지 패널 + 어두운 그라데이션에
    가려짐 → 디테일은 여기 말고 **중간 20~65% 구간**에 집중
  - 사람은 없는 빈 방 (캐릭터는 초상화로 따로 표시되므로 배경엔 인물 없음)

```
[공통 스타일 가이드]

A wide establishing shot of an empty small underground poker room: one
worn poker table with mismatched chairs, a single flickering fluorescent
tube light on the ceiling as the clear focal light source (roughly 10-20%
down from the top, centered), a small old fridge in one back corner, a
soccer team wall calendar and a handwritten warning/joke poster taped to
the concrete wall, a shelf with soju and beer bottles, an old CRT TV,
poker chips and playing cards scattered on the table. Concrete basement
wall texture, no people in the shot. Tall vertical mobile-game background
composition, portrait orientation, exactly 9:19.5 aspect ratio. Keep the
top ~6% and bottom ~35% of the frame relatively simple/dark since UI
elements will overlap those areas; put the richest detail in the middle
band of the image.
```

---

## 넣는 방법

1. 4개 파일을 정확히 위 경로/이름으로 저장:
   - `public/portraits/taesik.png`
   - `public/portraits/jaehoon.png`
   - `public/portraits/yongchul.png`
   - `public/backgrounds/room.png`
2. 브라우저 새로고침만 하면 바로 적용됨 (개발 서버 재시작 불필요).
3. 마음에 안 들면 그냥 파일을 지우면 자동으로 픽셀아트로 돌아감.
