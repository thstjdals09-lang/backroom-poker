# ACE — 오늘 포가 비었다

뒷골목의 작은 포커룸을 운영하면서 주인공도 포커 플레이어로 성장하는
싱글플레이 게임의 첫 플레이어블 프로토타입 (Day 1 튜토리얼 챕터).

실제 텍사스 홀덤 엔진이 아니라, 미리 정의된 스토리/포커 상황을 보여주고
FOLD / CALL / RAISE 선택에 따라 결과가 갈리는 방식으로 "포커를 치고 있다는
감각"을 전달하는 것이 목표다. 모바일 세로 화면 기준.

## 실행 방법

```bash
npm install
npm run dev
```

`npm run build` 로 프로덕션 빌드, `npm run preview` 로 빌드 결과 미리보기.

## 구조

- `src/types` — Player / Room / NPC / Beat(스토리 노드) / PokerScenario 등 핵심 타입
- `src/data/npcs.ts` — 태식 / 재훈 / 용철 NPC 데이터
- `src/data/day1Script.ts` — Day 1 전체 대사·분기·이벤트 스크립트 (Beat 그래프)
- `src/data/pokerScenarios.ts` — 방어(DEFENSE) 포커 상황 데이터
- `src/state/gameContext.tsx` — 게임 상태(Context+Reducer) 및 로컬 저장
- `src/screens` — TitleScreen / StoryPlayer(스토리 엔진) / DefenseScreen / DayResultScreen / HomeScreen
- `src/components` — StatusBar, StatPopup, PortraitFrame, PokerCard 등 UI 조각
- `src/audio/soundManager.ts` — 사운드 placeholder (실제 mp3가 `public/sfx/`에 추가되면 자동 재생)

Day 2 이후를 추가하려면 `day1Script.ts`와 같은 형태의 스크립트 파일을 새로
만들고, `initialNPCs`에 신규 NPC를 추가하면 된다.
