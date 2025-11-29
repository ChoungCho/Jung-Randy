// ===== SPAWN BUTTON UI =====

interface SpawnButtonProps {
  spawnCount: number;
  onSpawn: () => void;
}

export function SpawnButton({ spawnCount, onSpawn }: SpawnButtonProps) {
  return (
    <button
      onClick={onSpawn}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 100,
        padding: '15px 25px',
        fontSize: '16px',
        fontWeight: 'bold',
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}
    >
      Spawn Character {spawnCount % 2 + 1}
    </button>
  );
}
