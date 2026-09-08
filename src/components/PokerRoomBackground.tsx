// 게임 화면 전체에 깔리는 포커룸 배경 일러스트.
// 지하 상가 특유의 낡은 벽, 달력, 냉장고, 짝짝이 의자와 테이블,
// 그리고 깜빡이는 형광등을 픽셀풍으로 그린다. SceneFrame/TitleScreen에서
// 화면 뒤에 항상 깔려서 "대화창+NPC만 둥둥 떠 있는" 느낌을 없앤다.

export default function PokerRoomBackground() {
  return (
    <svg viewBox="0 0 90 195" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
      <defs>
        <radialGradient id="lightGlow" cx="50%" cy="20%" r="65%">
          <stop offset="0%" stopColor="#eef3d8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#eef3d8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 벽 / 바닥 */}
      <rect x="0" y="0" width="90" height="152" fill="#1c2015" />
      <rect x="0" y="152" width="90" height="43" fill="#14150f" />
      {[38, 64, 90, 116].map((y) => (
        <rect key={y} x="0" y={y} width="90" height="0.6" fill="#262b1d" fillOpacity="0.6" />
      ))}
      {[160, 172, 184].map((y) => (
        <rect key={y} x="0" y={y} width="90" height="0.5" fill="#0d0e09" fillOpacity="0.7" />
      ))}

      {/* 축구팀 달력 */}
      <g transform="translate(8,18)">
        <rect x="0" y="0" width="19" height="25" fill="#d9dbc4" />
        <rect x="0" y="0" width="19" height="6" fill="#8a3128" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={2.5 + col * 3.6}
              y={9 + row * 4.6}
              width="2.4"
              height="2.6"
              fill="#b7b79a"
            />
          ))
        )}
      </g>

      {/* 냉장고 */}
      <g transform="translate(61,88)">
        <rect x="0" y="0" width="21" height="48" fill="#242819" stroke="#333a26" strokeWidth="0.8" />
        <rect x="0" y="19" width="21" height="1.2" fill="#14150f" />
        <rect x="2" y="6" width="1.6" height="9" fill="#4a5238" />
        <rect x="2" y="25" width="1.6" height="9" fill="#4a5238" />
        <circle cx="16" cy="8" r="1" fill="#c9d2a4" fillOpacity="0.5" />
        <circle cx="13" cy="11" r="0.7" fill="#c9d2a4" fillOpacity="0.4" />
      </g>

      {/* 형광등 (깜빡임) */}
      <g className="fluoro-flicker">
        <ellipse cx="45" cy="24" rx="34" ry="20" fill="url(#lightGlow)" />
        <rect x="26" y="5" width="38" height="3" fill="#0d0e09" />
        <rect x="28" y="8" width="34" height="2.4" fill="#eef3d8" />
      </g>

      {/* 짝짝이 의자 (테이블 뒤) */}
      <rect x="14" y="140" width="8" height="16" fill="#3a3020" stroke="#12140f" strokeWidth="0.6" />
      <rect x="68" y="138" width="8" height="17" fill="#2c3320" stroke="#12140f" strokeWidth="0.6" />
      <rect x="42" y="136" width="7" height="15" fill="#33281c" stroke="#12140f" strokeWidth="0.6" />

      {/* 포커 테이블 */}
      <g>
        <polygon
          points="10,168 80,168 86,178 80,190 10,190 4,178"
          fill="#3a4a30"
          stroke="#20241a"
          strokeWidth="1.4"
        />
        <polygon
          points="15,171 75,171 79,178 75,186 15,186 11,178"
          fill="#455a37"
        />
        {/* 칩 스택 */}
        <rect x="30" y="176" width="4" height="2.4" fill="#a5342a" />
        <rect x="30" y="173.6" width="4" height="2.4" fill="#eef3d8" />
        <rect x="42" y="175" width="4" height="2.4" fill="#2f5f7a" />
        <rect x="42" y="172.6" width="4" height="2.4" fill="#a5342a" />
        <rect x="54" y="176.5" width="4" height="2.4" fill="#eef3d8" />
      </g>
    </svg>
  );
}
