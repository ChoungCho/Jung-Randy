// ===== STATUS PANEL UI (Bottom Panel) =====
import { CharacterData, MonsterData, SelectionTarget } from '../types';

interface StatusPanelProps {
  selectionTarget: SelectionTarget;
  characters: CharacterData[];
  monsters: MonsterData[];
  onUseActiveSkill: (charId: string) => void;
  onSelectCharacter: (id: string) => void;
}

export function StatusPanel({ selectionTarget, characters, monsters, onUseActiveSkill, onSelectCharacter }: StatusPanelProps) {
  if (!selectionTarget) return null;

  // Monster selected
  if (selectionTarget.type === 'monster') {
    const monster = monsters.find(m => m.id === selectionTarget.id);
    if (!monster || monster.isDying) return null;

    return (
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(40, 10, 10, 0.95)',
        border: '2px solid #8b0000',
        borderRadius: '12px',
        padding: '15px 25px',
        color: 'white',
        fontFamily: 'monospace',
        minWidth: '300px',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Monster portrait placeholder */}
          <div style={{
            width: '64px',
            height: '64px',
            background: '#1a1a1a',
            border: '2px solid #660000',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            👹
          </div>
          {/* Monster info */}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#ff6666' }}>
              Wave {monster.wave} Monster
            </h3>
            {/* HP bar */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '2px' }}>
                HP: {monster.hp} / {monster.maxHp}
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: '#333',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(monster.hp / monster.maxHp) * 100}%`,
                  height: '100%',
                  background: monster.hp > monster.maxHp / 2 ? '#4CAF50' : '#f44336',
                  transition: 'width 0.2s',
                }} />
              </div>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#ccc' }}>
              <span>⚔️ ATK: {monster.damage}</span>
              <span>🛡️ DEF: {monster.defense}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Characters selected
  const selectedChars = characters.filter(c => selectionTarget.ids.includes(c.id));
  if (selectedChars.length === 0) return null;

  // Multi-select: show portrait grid
  if (selectedChars.length > 1) {
    return (
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(10, 30, 10, 0.95)',
        border: '2px solid #4a7c4a',
        borderRadius: '12px',
        padding: '15px 20px',
        color: 'white',
        fontFamily: 'monospace',
        zIndex: 100,
      }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>
          Selected: {selectedChars.length} units
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
          maxWidth: '400px',
        }}>
          {selectedChars.slice(0, 12).map(char => (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char.id)}
              style={{
                width: '48px',
                height: '48px',
                background: '#1a3a1a',
                border: '2px solid #4a7c4a',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '20px' }}>
                {char.type === 1 ? '🥊' : '💪'}
              </div>
              {/* Mini HP bar */}
              <div style={{
                position: 'absolute',
                bottom: '2px',
                left: '2px',
                right: '2px',
                height: '4px',
                background: '#333',
                borderRadius: '2px',
              }}>
                <div style={{
                  width: `${(char.currentHp / char.stats.maxHp) * 100}%`,
                  height: '100%',
                  background: char.currentHp > char.stats.maxHp / 2 ? '#4CAF50' : '#f44336',
                }} />
              </div>
            </div>
          ))}
          {/* Show +N indicator if more than 12 units selected */}
          {selectedChars.length > 12 && (
            <div style={{
              width: '48px',
              height: '48px',
              background: '#2a2a2a',
              border: '2px solid #666',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#aaa',
              fontWeight: 'bold',
            }}>
              +{selectedChars.length - 12}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Single character selected - detailed view
  const char = selectedChars[0];
  const stats = char.stats;
  const activeSkill = stats.skills.active;
  const passiveSkill = stats.skills.passive;
  const canUseActive = activeSkill && (Date.now() - char.lastActiveSkillTime > activeSkill.cooldown);
  const activeCooldownRemaining = activeSkill
    ? Math.max(0, activeSkill.cooldown - (Date.now() - char.lastActiveSkillTime))
    : 0;

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(10, 30, 10, 0.95)',
      border: '2px solid #4a7c4a',
      borderRadius: '12px',
      padding: '15px 25px',
      color: 'white',
      fontFamily: 'monospace',
      minWidth: '400px',
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Character portrait */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#1a3a1a',
          border: '2px solid #4a7c4a',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
        }}>
          {char.type === 1 ? '🥊' : '💪'}
        </div>

        {/* Character info */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#90EE90' }}>
            {stats.name}
          </h3>
          {/* HP bar */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '2px' }}>
              HP: {char.currentHp} / {stats.maxHp}
            </div>
            <div style={{
              width: '100%',
              height: '12px',
              background: '#333',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(char.currentHp / stats.maxHp) * 100}%`,
                height: '100%',
                background: char.currentHp > stats.maxHp / 2 ? '#4CAF50' : '#f44336',
                transition: 'width 0.2s',
              }} />
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#ccc' }}>
            <span>⚔️ ATK: {stats.attack}</span>
            <span>🛡️ DEF: {stats.defense}</span>
            <span>⚡ SPD: {stats.attackSpeed.toFixed(1)}/s</span>
          </div>
        </div>

        {/* Skills section */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Passive skill */}
          {passiveSkill && (
            <div
              title={`${passiveSkill.name}: ${passiveSkill.description}\n${Math.round(passiveSkill.triggerChance * 100)}% chance, ${passiveSkill.damageMultiplier}x damage`}
              style={{
                width: '50px',
                height: '50px',
                background: '#2a2a4a',
                border: '2px solid #6a6a8a',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'help',
              }}
            >
              ⚡
            </div>
          )}
          {/* Active skill */}
          {activeSkill && (
            <div
              onClick={() => canUseActive && onUseActiveSkill(char.id)}
              title={`${activeSkill.name}: ${activeSkill.description}\nCooldown: ${activeSkill.cooldown / 1000}s, ${activeSkill.damageMultiplier}x damage`}
              style={{
                width: '50px',
                height: '50px',
                background: canUseActive ? '#4a2a2a' : '#2a2a2a',
                border: `2px solid ${canUseActive ? '#ff6666' : '#666'}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: canUseActive ? 'pointer' : 'not-allowed',
                position: 'relative',
                opacity: canUseActive ? 1 : 0.6,
              }}
            >
              🔥
              {/* Cooldown overlay */}
              {activeCooldownRemaining > 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '-18px',
                  fontSize: '10px',
                  color: '#ff6666',
                }}>
                  {(activeCooldownRemaining / 1000).toFixed(1)}s
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
