# ACE — 외부 이미지 생성용 아트 브리프

외부 이미지 생성 엔진으로 만든 파일을 아래 **정확한 경로/파일명**으로
저장하면, 코드 수정 없이 게임이 자동으로 픽셀아트 대신 그 이미지를
사용한다. (해당 파일이 없거나 로드에 실패하면 지금처럼 픽셀아트로 자동
복귀하니, 하나씩 넣어가며 확인해도 안전하다.)

이 게임은 스토리가 진행되면서 화면 뒤 배경 자체가 그 장면에 맞게
바뀐다 (오프닝 골목 → 방 인수 → 태식 에어컨 시비 → 용철 미수 요청 →
방어전 → 새벽 엔딩 등). 그래서 초상화 3장 + 배경 1장이 아니라, **장면별
배경(CG) 12장 + 기본 배경 1장 + 초상화 3장 = 총 16장**이 필요하다.

---

## 전체 목록

| # | 파일 경로 | 장면 | 사이즈 |
|---|---|---|---|
| 01 | `public/portraits/taesik.png` | 태식 초상화 | 1024×1024 (1:1) |
| 02 | `public/portraits/jaehoon.png` | 재훈 초상화 | 1024×1024 (1:1) |
| 03 | `public/portraits/yongchul.png` | 용철 초상화 | 1024×1024 (1:1) |
| 04 | `public/backgrounds/room.png` | 기본 룸 배경 (특정 장면 지정 없을 때) | 1080×2340 (9:19.5) |
| 05 | `public/backgrounds/intro_alley.png` | 오프닝 — 골목/지하 입구 | 1080×2340 |
| 06 | `public/backgrounds/baksa_handoff.png` | 박사장이 열쇠를 던져주는 장면 | 1080×2340 |
| 07 | `public/backgrounds/taesik_aircon.png` | 태식 — 에어컨 시비 | 1080×2340 |
| 08 | `public/backgrounds/jaehoon_enter.png` | 재훈 등장 | 1080×2340 |
| 09 | `public/backgrounds/yongchul_enter.png` | 용철 등장 | 1080×2340 |
| 10 | `public/backgrounds/night_montage.png` | 밤 영업 몽타주 (테이블 가득) | 1080×2340 |
| 11 | `public/backgrounds/yongchul_demand.png` | 미수 요청 — 용철이 소리치는 핵심 장면 | 1080×2340 |
| 12 | `public/backgrounds/yongchul_kicked_out.png` | 용철이 쫓겨나는 장면 (선택지③ 분기) | 1080×2340 |
| 13 | `public/backgrounds/taesik_defense_order.png` | 태식이 "방어해"라며 압박 | 1080×2340 |
| 14 | `public/backgrounds/defense_start_pov.png` | 방어전 — 플레이어 시점 핸드 진행 | 1080×2340 |
| 15 | `public/backgrounds/defense_win.png` | 방어전 승리 — 팟을 가져오는 순간 | 1080×2340 |
| 16 | `public/backgrounds/dawn_alone.png` | 새벽, 혼자 남는 엔딩 | 1080×2340 |

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

**배경 이미지 공통 세이프존** (05~16번 모두 해당)
- 화면 **맨 위 ~6%**는 상태바(ROOM POINT/CASH/MENTAL/REP)에 가려짐 →
  단순하고 어두운 영역으로
- 화면 **아래쪽 35~40%**는 대화창/선택지 패널 + 어두운 그라데이션에
  가려짐 → 디테일은 여기 말고 **중간 20~65% 구간**에 집중
- 세로 9:19.5 비율 정확히 지킬 것 (다르면 잘림)

**일관성 유지 팁**
- 04번(기본 룸 배경)을 가장 먼저 만들고, 이후 05~16번을 만들 때 04번을
  스타일/공간 레퍼런스로 같이 넣어서(이미지-투-이미지) 같은 방처럼 보이게
  할 것. 레퍼런스 기능이 없으면 16장을 **한 세션 안에 연달아** 생성.
- 01~03번 초상화와 05~16번 배경 속 인물 얼굴/의상 묘사가 서로 어긋나지
  않게 — 아래 프롬프트에 캐릭터 설명을 매번 동일하게 반복해뒀다.
- 파일 포맷: **PNG**.
- 주인공은 화면에 얼굴이 등장하지 않는 1인칭 시점 캐릭터다. 배경 CG에
  "주인공"이 필요한 장면(06, 13, 14)은 **주인공의 시점(POV)** 으로
  그리고, 주인공 본인의 몸/얼굴은 그리지 마.

---

# 초상화 (1:1, 1024×1024)

## 01. 태식 — `public/portraits/taesik.png`

가슴 위 흉상 컷. 인물이 프레임 세로의 55~65%를 차지하도록 중앙 배치.

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

## 02. 재훈 — `public/portraits/jaehoon.png`

01번과 동일한 흉상 컷/카메라 거리/조명.

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

## 03. 용철 — `public/portraits/yongchul.png`

01/02와 동일한 흉상 컷/카메라 거리.

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

# 배경 / 장면 CG (9:19.5, 1080×2340)

## 04. 기본 룸 배경 — `public/backgrounds/room.png`

특정 장면이 지정되지 않은 모든 대화/선택지에서 쓰이는 기본값. 사람 없는
빈 방 전경.

```
[공통 스타일 가이드]

A wide establishing shot of an empty small underground poker room: one
worn poker table with mismatched chairs, a single flickering fluorescent
tube light on the ceiling as the clear focal light source (roughly 10-20%
down from the top, centered), a small old fridge in one back corner, a
soccer team wall calendar and a handwritten warning/joke poster taped to
the concrete wall, a shelf with soju and beer bottles, an old CRT TV,
poker chips and playing cards scattered on the table. Concrete basement
wall texture, no people in the shot. [배경 세이프존 참고]
```

## 05. 오프닝 골목 — `public/backgrounds/intro_alley.png`

게임 시작 직후, 주인공이 이 방으로 처음 걸어 내려가는 순간의 장면.
타이틀 화면 배경으로도 쓰인다.

```
[공통 스타일 가이드]

A narrow dim alley two blocks off a busy Seoul street, at night. A plain
steel door beside a building leads down a dark stairwell into a basement.
On the room's door at the bottom of the stairs, a handwritten sign on
A4 paper reads "♠ ACE ♠" (render this exact short text naturally on a
taped-up paper sign, worn and slightly crooked). No people visible.
Moody streetlight and a sliver of light leaking from under the basement
door. [배경 세이프존 참고]
```

## 06. 박사장이 열쇠를 던져주는 장면 — `public/backgrounds/baksa_handoff.png`

박사장이 주인공(=플레이어 시점, 얼굴/몸 없음)에게 열쇠를 던져주는 순간.

```
[공통 스타일 가이드]

Point-of-view shot from the player character's eyes, inside the dim empty
poker room. A middle-aged Korean man (박사장 / "Boss Park"), stocky build,
plain worn jacket, tired expression, is mid-motion tossing a small keyring
with a few keys directly toward the camera/viewer. No visible protagonist
body or hands in frame — this is a pure POV shot. [배경 세이프존 참고]
```

## 07. 태식 — 에어컨 시비 — `public/backgrounds/taesik_aircon.png`

태식이 벽에 붙은 낡은 에어컨을 가리키며 짜증내는 장면. 태식의 외형은
01번 초상화와 동일하게 유지.

```
[공통 스타일 가이드]

Taesik (same man as described in the portrait: 39-year-old Korean man,
buzzcut hair, tattoo sleeves, tight black athletic t-shirt) standing and
pointing irritably at an old wall-mounted air conditioner unit that's
visibly worn/dusty, mouth open mid-complaint, annoyed exaggerated
expression. The rest of the dim poker room visible around him — table,
mismatched chairs. Medium shot, waist-up, subject slightly off-center to
leave room for dialogue UI at the bottom. [배경 세이프존 참고]
```

## 08. 재훈 등장 — `public/backgrounds/jaehoon_enter.png`

재훈이 문으로 들어와 조용히 자리를 확인하는 장면. 재훈 외형은 02번과
동일.

```
[공통 스타일 가이드]

Jaehoon (same man as described in the portrait: 28-year-old Korean man,
cap pulled low, plain dark hoodie) just stepping through the room's door,
one hand still on the doorknob, scanning the table with a quiet guarded
look, phone in his other hand. The dim poker room interior visible around
him. Medium shot, waist-up, subject slightly off-center to leave room for
dialogue UI at the bottom. [배경 세이프존 참고]
```

## 09. 용철 등장 — `public/backgrounds/yongchul_enter.png`

용철이 큰 목소리로 요란하게 들어오는 장면. 용철 외형은 03번과 동일.

```
[공통 스타일 가이드]

Yongchul (same man as described in the portrait: 46-year-old Korean man,
balding with side hair, gold chain, worn maroon tracksuit jacket) bursting
through the door with both arms wide open, loud and jovial mid-greeting
expression, gold tooth visible. The dim poker room interior visible around
him. Medium shot, waist-up, subject slightly off-center to leave room for
dialogue UI at the bottom. [배경 세이프존 참고]
```

## 10. 밤 영업 몽타주 — `public/backgrounds/night_montage.png`

칩이 오가고 여러 손님이 활기차게 게임 중인 한밤중 테이블 전경. 이번엔
사람이 있어도 됨 (등을 보이거나 실루엣 처리, 얼굴 디테일 불필요).

```
[공통 스타일 가이드]

A lively wide shot of the same poker table now full of players mid-game
late at night: 5-6 Korean men of varying ages seated around the table,
shown mostly from behind or in silhouette/soft focus (no need for clear
individual faces), chips being pushed across the felt, cards on the table,
a hazy cigarette-smoke atmosphere, the fluorescent light overhead casting
hard shadows. Energetic, slightly chaotic late-night mood. [배경 세이프존
참고]
```

## 11. 미수 요청 (핵심 장면) — `public/backgrounds/yongchul_demand.png`

이 게임에서 가장 중요한 장면. 용철이 갑자기 소리치며 외상을 요구하는
순간. 용철 외형은 03번과 동일.

```
[공통 스타일 가이드]

Yongchul (same man as described in the portrait: 46-year-old Korean man,
balding with side hair, gold chain, worn maroon tracksuit jacket) leaning
forward aggressively over the poker table, mid-shout, pointing a lit
cigarette toward the camera/viewer, angry-but-comedic exaggerated
expression demanding something. Other blurred patrons visible in the dim
background at a second table. Poker chips, cards, an ashtray, and a green
soju bottle visible on the near table in foreground. Dramatic, slightly
low camera angle looking up at him for tension. [배경 세이프존 참고]
```

## 12. 용철이 쫓겨나는 장면 — `public/backgrounds/yongchul_kicked_out.png`

(선택지 ③ "나가세요" 선택시에만 등장) 용철이 화가 나서 문을 세게 닫고
나가는 순간.

```
[공통 스타일 가이드]

Yongchul (same man as described in the portrait) shown from behind/side,
mid-stride storming toward the room's door, one arm raised in an angry
gesture, the door caught mid-slam with motion blur on the door itself
only (not the whole image). Other patrons (Taesik, Jaehoon) visible
sitting stiffly at the table in the background, tense reaction. Moody,
slightly chaotic composition. [배경 세이프존 참고]
```

## 13. 태식이 "방어해"라며 압박 — `public/backgrounds/taesik_defense_order.png`

테이블 인원이 부족해지자 태식이 주인공에게 직접 앉으라고 압박하는 순간.
플레이어 시점.

```
[공통 스타일 가이드]

Point-of-view shot from the player character's eyes, seated at the poker
table. Taesik (same man as described in the portrait: buzzcut, tattoo
sleeves, black t-shirt) sitting across the table, leaning back, pointing
firmly at an empty chair directly in front of the camera/viewer, serious
insistent expression (no longer joking). An empty poker table seat with
some chips already placed in front of it, cards face-down, visible in the
immediate foreground. No visible protagonist body — pure POV shot.
[배경 세이프존 참고]
```

## 14. 방어전 — 플레이어 시점 핸드 — `public/backgrounds/defense_start_pov.png`

방어전(포커 미니게임) 진행 중 배경. 카드/액션 버튼은 앱이 그 위에 별도로
그리므로, 이 이미지는 분위기용 테이블 전경.

```
[공통 스타일 가이드]

Point-of-view shot from the player character's eyes, looking down at the
poker table during a tense hand: two hole cards face-down close to camera
in the foreground (slightly blurred, cards themselves need no readable
pips/text), stacks of poker chips, a few community cards further away on
the felt, blurred opponents' hands and arms at the edges of frame. Tense,
focused mood, slightly narrower depth of field than other shots. No
visible protagonist body beyond maybe forearms/hands resting near the
cards. [배경 세이프존 참고 — 특히 화면 하단 40% 이상은 액션 버튼(FOLD/
CALL/RAISE)에 가려지므로 카드/칩 디테일은 화면 중상단에 배치]
```

## 15. 방어전 승리 — `public/backgrounds/defense_win.png`

방어전에서 필요한 포인트를 확보하고 팟을 가져오는 승리의 순간.

```
[공통 스타일 가이드]

A satisfying wide shot of poker chips being pulled/raked across the felt
table toward the camera/player's side, a scattered losing hand of cards
face-up on the other side of the table, Taesik in the background with a
resigned/annoyed "아 씨" (dang it) reaction, slight motion blur on the
moving chips only. Warm, slightly triumphant lighting accent despite the
same overall dim fluorescent scene. [배경 세이프존 참고]
```

## 16. 새벽, 혼자 남는 엔딩 — `public/backgrounds/dawn_alone.png`

새벽 05:47, 손님들이 다 나가고 주인공 혼자 테이블에 앉아있는 조용한
엔딩 장면. 플레이어 시점이거나, 혹은 뒷모습/실루엣으로 처리 (얼굴 노출
금지).

```
[공통 스타일 가이드]

The same poker room now completely empty at dawn, chairs pushed in
messily, chips and cards left scattered on the table, a single figure
seen only from behind/in silhouette sitting alone at the table (no face
visible), the flickering fluorescent tube light dimmer/quieter than
before as if the night is finally over. Very quiet, melancholic, faint
blue-grey pre-dawn light starting to mix with the fluorescent glow.
[배경 세이프존 참고]
```

---

## 넣는 방법

1. 위 16개 파일을 정확한 경로/이름으로 저장 (경로는 위 표 참고).
2. 브라우저 새로고침만 하면 바로 적용됨 (개발 서버 재시작 불필요).
3. 마음에 안 드는 특정 장면만 파일을 지우면 그 장면만 자동으로
   픽셀아트로 돌아가고, 나머지는 그대로 유지된다 (장면별로 독립적).
4. 우선순위를 두고 싶다면: **04(기본 배경) → 11(미수 요청) → 01~03(초상화)
   → 나머지 순**으로 만드는 걸 추천 (제일 자주/오래 노출되는 장면부터).
