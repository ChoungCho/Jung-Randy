// ===== GAME OVER OVERLAY =====

interface GameOverOverlayProps {
  totalMonstersKilled: number;
  onRestart: () => void;
}

export function GameOverOverlay({ totalMonstersKilled, onRestart }: GameOverOverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}>
      <h1 style={{ color: '#ff6666', fontSize: '48px', marginBottom: '20px', fontFamily: 'monospace' }}>
        GAME OVER
      </h1>
      <p style={{ color: '#ccc', fontSize: '24px', marginBottom: '10px', fontFamily: 'monospace' }}>
        All waves completed!
      </p>
      <p style={{ color: '#888', fontSize: '18px', marginBottom: '30px', fontFamily: 'monospace' }}>
        Monsters killed: {totalMonstersKilled}
      </p>
      <button
        onClick={onRestart}
        style={{
          padding: '15px 40px',
          fontSize: '20px',
          fontWeight: 'bold',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}
      >
        Restart Game
      </button>
    </div>
  );
}
