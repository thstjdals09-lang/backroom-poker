import type { ScenarioSet } from '../types';

// ============================================================
// 방어(DEFENSE) 포커 상황 데이터.
// 실제 홀덤 엔진이 아니라, 미리 정의된 핸드를 순서대로 보여주고
// FOLD / CALL / RAISE 선택에 따라 결과가 갈리는 "연출된" 포커.
// ============================================================

export const day1Defense: ScenarioSet = {
  id: 'day1_defense',
  hands: [
    {
      id: 'hand_vs_jaehoon',
      title: 'vs 재훈',
      heroCards: ['A♣', 'J♣'],
      position: 'BTN',
      stackLabel: '43 BB',
      startStep: 'preflop',
      steps: {
        preflop: {
          id: 'preflop',
          description: '태식이 앞에서 레이즈. 재훈 콜. 당신 차례.',
          opponents: [
            { name: '태식', note: '최근 플레이: 공격적 · 현재 감정: 기분 좋음' },
            { name: '재훈', note: '최근 플레이: 조용함 · 현재 감정: ???' },
          ],
          actions: ['FOLD', 'CALL', 'RAISE'],
          outcomes: {
            FOLD: {
              resultText: '무리하지 않고 접었다.',
              effects: [
                { target: 'roomPoint', delta: -2000 },
                { target: 'ledger', key: 'pokerRevenue', delta: -2000 },
                { target: 'mental', delta: -1 },
              ],
              endHand: true,
            },
            CALL: { resultText: '콜.', next: 'flop' },
            RAISE: { resultText: '레이즈. 두 사람 다 따라온다.', next: 'flop_raised' },
          },
        },
        flop: {
          id: 'flop',
          board: ['J♦', '7♣', '3♣'],
          description: '탑페어와 플러시 드로우를 잡았다. 태식 CHECK. 재훈 BET.',
          opponents: [
            { name: '태식', note: '최근 플레이: 체크 · 현재 감정: 기분 좋음' },
            { name: '재훈', note: '최근 플레이: 베팅 · 현재 감정: ???' },
          ],
          actions: ['FOLD', 'CALL', 'RAISE'],
          outcomes: {
            FOLD: {
              resultText: '탑페어를 접었다. 아쉽지만 무리하지 않았다.',
              effects: [
                { target: 'roomPoint', delta: -3200 },
                { target: 'ledger', key: 'pokerRevenue', delta: -3200 },
                { target: 'mental', delta: -1 },
              ],
              endHand: true,
            },
            CALL: { resultText: '콜.', next: 'turn' },
            RAISE: {
              resultText: '레이즈! 재훈이 잠시 고민하다 폴드한다.',
              effects: [
                { target: 'roomPoint', delta: 9600 },
                { target: 'ledger', key: 'pokerRevenue', delta: 9600 },
                { target: 'mental', delta: 2 },
              ],
              endHand: true,
            },
          },
        },
        flop_raised: {
          id: 'flop_raised',
          board: ['J♦', '7♣', '3♣'],
          description: '탑페어와 플러시 드로우. 태식 CHECK. 재훈이 크게 BET.',
          opponents: [
            { name: '태식', note: '최근 플레이: 체크 · 현재 감정: 살짝 긴장' },
            { name: '재훈', note: '최근 플레이: 큰 베팅 · 현재 감정: ???' },
          ],
          read: '재훈은 아까부터 거의 게임을 안 했다. 생각보다 타이트한가?',
          actions: ['FOLD', 'CALL'],
          outcomes: {
            FOLD: {
              resultText: '이번엔 접었다. 재훈이 조용히 칩을 가져간다.',
              effects: [
                { target: 'roomPoint', delta: -6400 },
                { target: 'ledger', key: 'pokerRevenue', delta: -6400 },
                { target: 'mental', delta: -2 },
              ],
              endHand: true,
            },
            CALL: {
              resultText: '콜! 재훈이 카드를 던지며 일어난다 — 이번엔 이겼다.',
              effects: [
                { target: 'roomPoint', delta: 21400 },
                { target: 'ledger', key: 'pokerRevenue', delta: 21400 },
                { target: 'mental', delta: 3 },
              ],
              endHand: true,
            },
          },
        },
        turn: {
          id: 'turn',
          board: ['J♦', '7♣', '3♣', '2♠'],
          description: '재훈이 다시 크게 베팅한다.',
          opponents: [
            { name: '태식', note: '최근 플레이: 관전 · 현재 감정: 심심함' },
            { name: '재훈', note: '최근 플레이: 큰 베팅 · 현재 감정: ???' },
          ],
          read: '재훈은 아까부터 거의 게임을 안 했다. 이 사람, 생각보다 타이트한가?',
          actions: ['FOLD', 'CALL'],
          outcomes: {
            FOLD: {
              resultText: '태식: "야 그걸 접어?" 재훈이 아무 말 없이 칩을 가져간다.',
              effects: [
                { target: 'roomPoint', delta: -8400 },
                { target: 'ledger', key: 'pokerRevenue', delta: -8400 },
                { target: 'mental', delta: -3 },
              ],
              endHand: true,
            },
            CALL: {
              resultText: '콜. 재훈이 조용히 더 좋은 카드를 펼친다.',
              effects: [
                { target: 'roomPoint', delta: -15600 },
                { target: 'ledger', key: 'pokerRevenue', delta: -15600 },
                { target: 'mental', delta: -6 },
              ],
              endHand: true,
            },
          },
        },
      },
    },
    {
      id: 'hand_vs_taesik',
      title: 'vs 태식',
      heroCards: ['8♠', '8♥'],
      position: 'CO',
      stackLabel: '31 BB',
      startStep: 'preflop2',
      steps: {
        preflop2: {
          id: 'preflop2',
          description: '태식이 크게 베팅한다.',
          opponents: [{ name: '태식', note: '최근 플레이: 큰 베팅 · 현재 감정: 흥분' }],
          read: '"얘가 사장 됐다고 까부네?" — 태식은 당신에게 평소보다 공격적으로 플레이하는 것 같습니다.',
          actions: ['FOLD', 'CALL'],
          outcomes: {
            FOLD: {
              resultText: '무리하지 않고 접었다. 태식이 씩 웃는다.',
              effects: [{ target: 'mental', delta: 1 }],
              endHand: true,
            },
            CALL: {
              resultText: '콜! 태식: "아 씨." — 팟을 가져왔다.',
              effects: [
                { target: 'roomPoint', delta: 47200 },
                { target: 'ledger', key: 'pokerRevenue', delta: 47200 },
                { target: 'mental', delta: 5 },
              ],
              endHand: true,
            },
          },
        },
      },
    },
  ],
};
