// ===== SPAWN BUTTON UI =====
import { LV1_POLITICIANS, PARTY_COLORS, TIER_NAMES } from '../data/politicians';

interface SpawnButtonProps {
  spawnCount: number;
  onSpawn: () => void;
  onSpawnPolitician: (politicianId: string) => void;
}

export function SpawnButton({ spawnCount, onSpawn, onSpawnPolitician }: SpawnButtonProps) {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* Legacy spawn button */}
      <button
        onClick={onSpawn}
        style={{
          padding: '12px 20px',
          fontSize: '14px',
          fontWeight: 'bold',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        }}
      >
        Spawn Character {spawnCount % 2 + 1}
      </button>

      {/* Divider */}
      <div style={{
        height: 1,
        background: 'rgba(255,255,255,0.2)',
        margin: '5px 0',
      }} />

      {/* Politician spawn section */}
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <div style={{
          color: '#ffd700',
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 4,
        }}>
          {TIER_NAMES.lv1} 소환
        </div>

        {LV1_POLITICIANS.map(politician => (
          <button
            key={politician.id}
            onClick={() => onSpawnPolitician(politician.id)}
            style={{
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 'bold',
              background: PARTY_COLORS[politician.party],
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            }}
          >
            <span style={{
              width: 20,
              height: 20,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
            }}>
              👤
            </span>
            {politician.name}
          </button>
        ))}

        {/* Stats info */}
        <div style={{
          marginTop: 4,
          padding: 8,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 4,
          fontSize: 10,
          color: '#888',
          textAlign: 'center',
        }}>
          ATK: 5 | DEF: 3 | HP: 30
        </div>
      </div>
    </div>
  );
}
