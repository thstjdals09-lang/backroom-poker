function isRed(card: string) {
  return card.includes('♥') || card.includes('♦');
}

export default function PokerCard({ card, faceDown }: { card?: string; faceDown?: boolean }) {
  if (faceDown || !card) {
    return (
      <div
        style={{
          width: 42,
          height: 58,
          borderRadius: 4,
          border: '2px solid var(--border)',
          background: 'repeating-linear-gradient(45deg, #2a2f1e, #2a2f1e 4px, #232717 4px, #232717 8px)',
        }}
      />
    );
  }
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);
  const red = isRed(card);
  return (
    <div
      style={{
        width: 42,
        height: 58,
        borderRadius: 4,
        border: '2px solid var(--border)',
        background: '#f2efe1',
        color: red ? '#a5342a' : '#20241a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 15,
        lineHeight: 1.1,
        boxShadow: '0 3px 0 var(--border-dim)',
      }}
    >
      <div>{rank}</div>
      <div style={{ fontSize: 16 }}>{suit}</div>
    </div>
  );
}
