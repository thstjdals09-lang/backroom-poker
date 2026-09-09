// Day3 beat id -> 초상화 표정 변형 매핑. 기존 Plan A 세트의 표정
// 변형만 재사용한다(새 이미지는 만들지 않음).

export const day3Portraits: Record<string, string> = {
  d3_a5: 'taesik_laugh', // "……ㅋㅋㅋ"
  d3_farewell_3: 'taesik_serious', // "오늘 재밌었다."
  d3_b4: 'taesik_annoyed', // "……아 그래?" (머쓱)
  d3_yc_kicked_4: 'taesik_serious', // 용철에게 깍듯하게
  d3_yc_kicked_5: 'taesik_serious',

  // 재훈데이
  d3j_game_9: 'jaehoon_tense', // 큰 팟을 잃고 "……"
  d3j_close_9: 'jaehoon_uncomfortable', // "제가 왜 콜했는지 모르겠어서."
  d3j_farewell_5: 'jaehoon_uncomfortable', // "……네."
};
