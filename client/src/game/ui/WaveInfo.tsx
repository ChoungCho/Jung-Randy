// ===== WAVE INFO UI =====
import { WAVE_CONFIG, getMonstersPerWave, isBossWave } from '../gameData';

interface WaveInfoProps {
  currentWave: number;
  monstersKilledInWave: number;
  monstersSpawnedInWave: number;
}

export function WaveInfo({ currentWave, monstersKilledInWave, monstersSpawnedInWave }: WaveInfoProps) {
  const isBoss = isBossWave(currentWave);
  const totalMonsters = isBoss ? 1 : getMonstersPerWave(currentWave);
  
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px 30px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: isBoss ? '#ff0000' : '#ff9900' }}>
        {isBoss ? '🔥 BOSS WAVE' : 'Wave'} {currentWave} / {WAVE_CONFIG.totalWaves}
      </div>
      <div style={{ fontSize: '14px', color: '#888' }}>
        {isBoss ? (
          <>Boss: {monstersKilledInWave > 0 ? 'Defeated ✅' : 'Alive ⚠️'}</>
        ) : (
          <>Monsters: {monstersKilledInWave} / {totalMonsters} killed</>
        )}
      </div>
    </div>
  );
}
