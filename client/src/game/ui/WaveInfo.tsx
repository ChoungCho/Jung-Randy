// ===== WAVE INFO UI =====
import { WAVE_CONFIG } from '../gameData';

interface WaveInfoProps {
  currentWave: number;
  monstersKilledInWave: number;
}

export function WaveInfo({ currentWave, monstersKilledInWave }: WaveInfoProps) {
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
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9900' }}>
        Wave {currentWave} / {WAVE_CONFIG.totalWaves}
      </div>
      <div style={{ fontSize: '14px', color: '#888' }}>
        Monsters: {monstersKilledInWave} / {WAVE_CONFIG.monstersPerWave} killed
      </div>
    </div>
  );
}
