// ===== BUILDING PANEL UI =====
// Shows different panels based on selected building type
// Rebranded: 공천위원회 (Gacha), 정치스쿨 (Upgrade), 출마 캠프 (Quest)

import { useState } from 'react';
import { BuildingType, BUILDINGS } from '../buildings/types';
import {
  LV2_POLITICIANS,
  LV3_POLITICIANS,
  LV4_POLITICIANS,
  LV5_POLITICIANS,
  LV6_POLITICIANS,
  TIER_COLORS,
  TIER_BG_COLORS,
  TIER_NAMES,
  PARTY_COLORS,
  PARTY_NAMES,
  type Politician,
  type PoliticianTier,
} from '../data/politicians';

interface BuildingPanelProps {
  selectedBuilding: BuildingType | null;
  onClose: () => void;
}

export function BuildingPanel({ selectedBuilding, onClose }: BuildingPanelProps) {
  if (!selectedBuilding) return null;

  const building = BUILDINGS[selectedBuilding];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 320,
        backgroundColor: 'rgba(20, 20, 40, 0.95)',
        borderTop: '2px solid #444',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 200,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderBottom: '1px solid #333',
          backgroundColor: 'rgba(30, 30, 60, 0.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>{building.icon}</span>
          <div>
            <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>{building.name}</h3>
            <p style={{ margin: 0, color: '#888', fontSize: 12 }}>{building.description}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 24,
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          ✕
        </button>
      </div>

      {/* Content - different for each building type */}
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {selectedBuilding === 'gacha' && <GachaContent />}
        {selectedBuilding === 'upgrade' && <UpgradeContent />}
        {selectedBuilding === 'quest' && <QuestContent />}
      </div>
    </div>
  );
}

// ===== GACHA CONTENT - 공천위원회 =====
// Tier-based politician gacha: Lv2, Lv3, Lv4
type GachaTier = 'lv2' | 'lv3' | 'lv4';

const GACHA_CONFIG: Record<GachaTier, { pool: Politician[]; cost: number; label: string; icon: string; color: string }> = {
  lv2: {
    pool: LV2_POLITICIANS,
    cost: 200,
    label: '일반의원 공천',
    icon: '🔷',
    color: TIER_COLORS.lv2,
  },
  lv3: {
    pool: LV3_POLITICIANS,
    cost: 500,
    label: '핵심중진 공천',
    icon: '🔮',
    color: TIER_COLORS.lv3,
  },
  lv4: {
    pool: LV4_POLITICIANS,
    cost: 1200,
    label: '원외거물 공천',
    icon: '⭐',
    color: TIER_COLORS.lv4,
  },
};

function GachaContent() {
  const [selectedTier, setSelectedTier] = useState<GachaTier>('lv2');
  const [lastPull, setLastPull] = useState<Politician | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePull = () => {
    const config = GACHA_CONFIG[selectedTier];
    setIsAnimating(true);
    setLastPull(null);

    // Simulate gacha animation
    setTimeout(() => {
      const result = config.pool[Math.floor(Math.random() * config.pool.length)];
      setLastPull(result);
      setIsAnimating(false);
    }, 1200);
  };

  const config = GACHA_CONFIG[selectedTier];

  return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      {/* Tier selection tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
        <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4, fontWeight: 'bold' }}>
          📋 공천 심사
        </div>
        {(Object.keys(GACHA_CONFIG) as GachaTier[]).map((tier) => {
          const tierConfig = GACHA_CONFIG[tier];
          const isSelected = selectedTier === tier;
          return (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              disabled={isAnimating}
              style={{
                padding: '12px 16px',
                backgroundColor: isSelected ? tierConfig.color : 'rgba(50, 50, 70, 0.8)',
                border: `2px solid ${isSelected ? tierConfig.color : '#444'}`,
                borderRadius: 8,
                color: '#fff',
                fontWeight: isSelected ? 'bold' : 'normal',
                fontSize: 13,
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                opacity: isAnimating ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{tierConfig.icon}</span>
                <span>{tierConfig.label}</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
                💰 {tierConfig.cost.toLocaleString()} 정치자금
              </div>
            </button>
          );
        })}
      </div>

      {/* Pull button and result */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 12,
          padding: 20,
        }}
      >
        {isAnimating ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12, animation: 'pulse 0.3s infinite alternate' }}>
              🏛️
            </div>
            <div style={{ color: '#ffd700', fontSize: 16 }}>공천 심사 중...</div>
            <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
              "당심을 반영하여 후보를 선정합니다"
            </div>
          </div>
        ) : lastPull ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                margin: '0 auto 16px',
                borderRadius: 12,
                border: `4px solid ${TIER_COLORS[lastPull.tier]}`,
                backgroundColor: TIER_BG_COLORS[lastPull.tier],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                boxShadow: `0 0 20px ${TIER_COLORS[lastPull.tier]}40`,
              }}
            >
              👤
            </div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>
              {lastPull.name}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  backgroundColor: TIER_BG_COLORS[lastPull.tier],
                  color: TIER_COLORS[lastPull.tier],
                  fontSize: 11,
                }}
              >
                {TIER_NAMES[lastPull.tier]}
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  backgroundColor: `${PARTY_COLORS[lastPull.party]}20`,
                  color: PARTY_COLORS[lastPull.party],
                  fontSize: 11,
                }}
              >
                {PARTY_NAMES[lastPull.party]}
              </span>
            </div>
            <div style={{ color: '#888', fontSize: 12 }}>
              🗳️ 공천 확정!
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>📜</div>
            <div style={{ color: '#666', fontSize: 14 }}>공천 버튼을 눌러 후보를 선정하세요</div>
          </div>
        )}

        <button
          onClick={handlePull}
          disabled={isAnimating}
          style={{
            marginTop: 20,
            padding: '14px 32px',
            backgroundColor: isAnimating ? '#444' : config.color,
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 15,
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: isAnimating ? 'none' : `0 4px 15px ${config.color}40`,
          }}
        >
          🏛️ 공천!
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>
            {config.cost.toLocaleString()} 정치자금
          </div>
        </button>
      </div>

      {/* Info panel */}
      <div
        style={{
          padding: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 8,
          fontSize: 12,
          color: '#888',
          minWidth: 180,
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#aaa' }}>
          📊 {config.label} 정보
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ color: '#666', marginBottom: 4 }}>후보 풀</div>
          <div style={{ color: config.color, fontWeight: 'bold' }}>
            {config.pool.length}명
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ color: '#666', marginBottom: 4 }}>공천 비용</div>
          <div style={{ color: '#ffd700' }}>
            💰 {config.cost.toLocaleString()}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: 8, marginTop: 8 }}>
          <div style={{ color: '#666', marginBottom: 4 }}>당별 분포</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {(['kuk', 'min', 'minor'] as const).map((party) => {
              const count = config.pool.filter((p) => p.party === party).length;
              if (count === 0) return null;
              return (
                <div key={party} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: PARTY_COLORS[party] }}>{PARTY_NAMES[party]}</span>
                  <span>{count}명</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== UPGRADE CONTENT - 정치스쿨 =====
// Two modes: Tier-based global enhancement OR Individual politician upgrades
type UpgradeMode = 'tier' | 'individual';
type UpgradeTier = 'lv2' | 'lv3' | 'lv4' | 'lv5';

interface TierUpgradeConfig {
  tier: PoliticianTier;
  label: string;
  tierName: string;
  icon: string;
  trainingName: string;
  baseCost: number;
  bonusPerLevel: { attack: number; defense: number; hp: number };
}

const UPGRADE_CONFIG: Record<UpgradeTier, TierUpgradeConfig> = {
  lv2: {
    tier: 'lv2',
    label: '일반의원 강화',
    tierName: TIER_NAMES.lv2,
    icon: '🔷',
    trainingName: '연설 훈련',
    baseCost: 300,
    bonusPerLevel: { attack: 3, defense: 2, hp: 15 },
  },
  lv3: {
    tier: 'lv3',
    label: '핵심중진 강화',
    tierName: TIER_NAMES.lv3,
    icon: '🔮',
    trainingName: '토론 스파링',
    baseCost: 800,
    bonusPerLevel: { attack: 5, defense: 3, hp: 25 },
  },
  lv4: {
    tier: 'lv4',
    label: '원외거물 강화',
    tierName: TIER_NAMES.lv4,
    icon: '⭐',
    trainingName: '지역구 조직관리',
    baseCost: 2000,
    bonusPerLevel: { attack: 8, defense: 5, hp: 40 },
  },
  lv5: {
    tier: 'lv5',
    label: '전직대통령 강화',
    tierName: TIER_NAMES.lv5,
    icon: '👑',
    trainingName: '회고록 집필',
    baseCost: 5000,
    bonusPerLevel: { attack: 12, defense: 8, hp: 60 },
  },
};

// Individual upgrade config for Lv5/Lv6
interface IndividualUpgradeConfig {
  baseCost: number;
  bonusPerLevel: { attack: number; defense: number; hp: number };
}

const INDIVIDUAL_UPGRADE_CONFIG: Record<'lv5' | 'lv6', IndividualUpgradeConfig> = {
  lv5: {
    baseCost: 3000,
    bonusPerLevel: { attack: 8, defense: 6, hp: 45 },
  },
  lv6: {
    baseCost: 8000,
    bonusPerLevel: { attack: 15, defense: 12, hp: 80 },
  },
};

function UpgradeContent() {
  const [mode, setMode] = useState<UpgradeMode>('tier');
  // Global tier upgrade levels (affects all units of that tier)
  const [tierLevels, setTierLevels] = useState<Record<UpgradeTier, number>>({
    lv2: 0,
    lv3: 0,
    lv4: 0,
    lv5: 0,
  });
  // Individual politician upgrade levels
  const [individualLevels, setIndividualLevels] = useState<Record<string, number>>({});

  const handleTierUpgrade = (tier: UpgradeTier) => {
    setTierLevels({
      ...tierLevels,
      [tier]: tierLevels[tier] + 1,
    });
  };

  const handleIndividualUpgrade = (politicianId: string) => {
    setIndividualLevels({
      ...individualLevels,
      [politicianId]: (individualLevels[politicianId] || 0) + 1,
    });
  };

  const getTierUpgradeCost = (tier: UpgradeTier) => {
    const config = UPGRADE_CONFIG[tier];
    const level = tierLevels[tier];
    return Math.floor(config.baseCost * Math.pow(1.5, level));
  };

  const getIndividualUpgradeCost = (politician: Politician) => {
    const config = INDIVIDUAL_UPGRADE_CONFIG[politician.tier as 'lv5' | 'lv6'];
    const level = individualLevels[politician.id] || 0;
    return Math.floor(config.baseCost * Math.pow(1.6, level));
  };

  const getTierTotalBonus = (tier: UpgradeTier) => {
    const config = UPGRADE_CONFIG[tier];
    const level = tierLevels[tier];
    return {
      attack: config.bonusPerLevel.attack * level,
      defense: config.bonusPerLevel.defense * level,
      hp: config.bonusPerLevel.hp * level,
    };
  };

  const getIndividualTotalBonus = (politician: Politician) => {
    const config = INDIVIDUAL_UPGRADE_CONFIG[politician.tier as 'lv5' | 'lv6'];
    const level = individualLevels[politician.id] || 0;
    return {
      attack: config.bonusPerLevel.attack * level,
      defense: config.bonusPerLevel.defense * level,
      hp: config.bonusPerLevel.hp * level,
    };
  };

  const getTierUnitCount = (tier: UpgradeTier) => {
    switch (tier) {
      case 'lv2': return LV2_POLITICIANS.length;
      case 'lv3': return LV3_POLITICIANS.length;
      case 'lv4': return LV4_POLITICIANS.length;
      case 'lv5': return LV5_POLITICIANS.length;
    }
  };

  // Render tier upgrade cards
  const renderTierUpgradeMode = () => (
    <div style={{ display: 'flex', gap: 12, height: '100%', overflowX: 'auto' }}>
      {(Object.keys(UPGRADE_CONFIG) as UpgradeTier[]).map((tier) => {
        const config = UPGRADE_CONFIG[tier];
        const level = tierLevels[tier];
        const cost = getTierUpgradeCost(tier);
        const bonus = getTierTotalBonus(tier);
        const unitCount = getTierUnitCount(tier);

        return (
          <div
            key={tier}
            style={{
              flex: '0 0 180px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 12,
              padding: 14,
              border: `2px solid ${TIER_COLORS[config.tier]}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{config.icon}</div>
              <div style={{ color: TIER_COLORS[config.tier], fontWeight: 'bold', fontSize: 13 }}>
                {config.label}
              </div>
              <div style={{ color: '#888', fontSize: 10 }}>
                {config.tierName} ({unitCount}명)
              </div>
            </div>

            {/* Current Level */}
            <div
              style={{
                backgroundColor: `${TIER_COLORS[config.tier]}22`,
                borderRadius: 8,
                padding: 8,
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#ffd700', fontSize: 18, fontWeight: 'bold' }}>
                Lv. {level}
              </div>
              <div style={{ color: '#888', fontSize: 9, marginTop: 2 }}>
                🎓 {config.trainingName}
              </div>
            </div>

            {/* Current Bonuses */}
            <div style={{ marginBottom: 10, flex: 1 }}>
              <div style={{ color: '#aaa', fontSize: 9, marginBottom: 4 }}>현재 보너스</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#888' }}>공격력</span>
                  <span style={{ color: '#ff6b6b' }}>+{bonus.attack}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#888' }}>방어력</span>
                  <span style={{ color: '#4dabf7' }}>+{bonus.defense}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#888' }}>체력</span>
                  <span style={{ color: '#51cf66' }}>+{bonus.hp}</span>
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            {level < 10 ? (
              <button
                onClick={() => handleTierUpgrade(tier)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: TIER_COLORS[config.tier],
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ⬆️ 강화
                <div style={{ fontSize: 9, opacity: 0.8, marginTop: 2 }}>
                  💰 {cost.toLocaleString()}
                </div>
              </button>
            ) : (
              <div
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#333',
                  borderRadius: 8,
                  color: '#ffd700',
                  fontWeight: 'bold',
                  fontSize: 11,
                  textAlign: 'center',
                }}
              >
                ✨ MAX
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Render individual politician upgrades for Lv5/Lv6
  const renderIndividualUpgradeMode = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
        {/* Lv5 Section */}
        <div>
          <div style={{
            color: TIER_COLORS.lv5,
            fontWeight: 'bold',
            fontSize: 13,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            👑 {TIER_NAMES.lv5} ({LV5_POLITICIANS.length}명)
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
          }}>
            {LV5_POLITICIANS.map((p) => {
              const level = individualLevels[p.id] || 0;
              const cost = getIndividualUpgradeCost(p);
              const bonus = getIndividualTotalBonus(p);

              return (
                <div
                  key={p.id}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 8,
                    padding: 8,
                    border: `1px solid ${TIER_COLORS.lv5}40`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 11 }}>{p.name}</span>
                    <span style={{ color: '#ffd700', fontSize: 10 }}>Lv.{level}</span>
                  </div>
                  <div style={{ color: '#888', fontSize: 9, marginBottom: 4 }}>
                    +공{bonus.attack} +방{bonus.defense} +HP{bonus.hp}
                  </div>
                  {level < 10 ? (
                    <button
                      onClick={() => handleIndividualUpgrade(p.id)}
                      style={{
                        width: '100%',
                        padding: '4px 6px',
                        backgroundColor: TIER_COLORS.lv5,
                        border: 'none',
                        borderRadius: 4,
                        color: '#fff',
                        fontSize: 9,
                        cursor: 'pointer',
                      }}
                    >
                      강화 💰{cost.toLocaleString()}
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#ffd700', fontSize: 9 }}>✨ MAX</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lv6 Section */}
        <div>
          <div style={{
            color: TIER_COLORS.lv6,
            fontWeight: 'bold',
            fontSize: 13,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            🔥 {TIER_NAMES.lv6} ({LV6_POLITICIANS.length}명)
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 8,
          }}>
            {LV6_POLITICIANS.map((p) => {
              const level = individualLevels[p.id] || 0;
              const cost = getIndividualUpgradeCost(p);
              const bonus = getIndividualTotalBonus(p);

              return (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 10,
                    padding: 12,
                    border: `2px solid ${TIER_COLORS.lv6}`,
                    boxShadow: `0 0 10px ${TIER_COLORS.lv6}30`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ color: TIER_COLORS.lv6, fontWeight: 'bold', fontSize: 14 }}>{p.name}</span>
                    <span style={{
                      color: '#ffd700',
                      fontSize: 12,
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(255, 215, 0, 0.2)',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}>Lv.{level}</span>
                  </div>
                  <div style={{ color: '#aaa', fontSize: 10, marginBottom: 6 }}>
                    +공격력 {bonus.attack} · +방어력 {bonus.defense} · +HP {bonus.hp}
                  </div>
                  {level < 10 ? (
                    <button
                      onClick={() => handleIndividualUpgrade(p.id)}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        backgroundColor: TIER_COLORS.lv6,
                        border: 'none',
                        borderRadius: 6,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 11,
                        cursor: 'pointer',
                      }}
                    >
                      ⬆️ 개별 강화 💰{cost.toLocaleString()}
                    </button>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      color: '#ffd700',
                      fontSize: 11,
                      fontWeight: 'bold',
                      padding: '6px 10px',
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      borderRadius: 6,
                    }}>
                      ✨ MAX LEVEL
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
      {/* Mode Tab Navigation */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setMode('tier')}
          style={{
            flex: 1,
            padding: '10px 16px',
            backgroundColor: mode === 'tier' ? '#4a5568' : 'rgba(0, 0, 0, 0.3)',
            border: mode === 'tier' ? '2px solid #63b3ed' : '2px solid transparent',
            borderRadius: 8,
            color: mode === 'tier' ? '#fff' : '#888',
            fontWeight: mode === 'tier' ? 'bold' : 'normal',
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          📊 등급별 강화
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
            Lv2~Lv5 전체 유닛 강화
          </div>
        </button>
        <button
          onClick={() => setMode('individual')}
          style={{
            flex: 1,
            padding: '10px 16px',
            backgroundColor: mode === 'individual' ? '#4a5568' : 'rgba(0, 0, 0, 0.3)',
            border: mode === 'individual' ? '2px solid #f6ad55' : '2px solid transparent',
            borderRadius: 8,
            color: mode === 'individual' ? '#fff' : '#888',
            fontWeight: mode === 'individual' ? 'bold' : 'normal',
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          👤 개별 강화
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
            Lv5/Lv6 개별 유닛 강화
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {mode === 'tier' ? renderTierUpgradeMode() : renderIndividualUpgradeMode()}
      </div>
    </div>
  );
}

// ===== QUEST CONTENT - 출마 캠프 =====
// Election campaign quests with difficulty levels
interface CampaignQuest {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  requirement: string;
  reward: string;
  rewardAmount: number;
  icon: string;
  unlocked: boolean;
}

const CAMPAIGN_QUESTS: CampaignQuest[] = [
  {
    id: 'quest_1',
    name: '기초의원 보궐선거',
    description: '작은 지역구에서 첫 선거를 치릅니다.',
    difficulty: 1,
    requirement: 'Lv3 1장 이상',
    reward: '정치자금',
    rewardAmount: 500,
    icon: '🏘️',
    unlocked: true,
  },
  {
    id: 'quest_2',
    name: '광역의회 재보선',
    description: '광역 단위 선거에 도전합니다.',
    difficulty: 2,
    requirement: 'Lv3 3장 이상',
    reward: '정치자금',
    rewardAmount: 1200,
    icon: '🏛️',
    unlocked: true,
  },
  {
    id: 'quest_3',
    name: '국회의원 재선거',
    description: '국회에 입성하기 위한 치열한 경쟁입니다.',
    difficulty: 3,
    requirement: 'Lv4 1장 이상',
    reward: '정치자금',
    rewardAmount: 2500,
    icon: '🏰',
    unlocked: true,
  },
  {
    id: 'quest_4',
    name: '광역단체장 보궐',
    description: '시·도지사를 향한 도전입니다.',
    difficulty: 4,
    requirement: 'Lv4 3장 이상',
    reward: '정치자금',
    rewardAmount: 5000,
    icon: '🌆',
    unlocked: false,
  },
  {
    id: 'quest_5',
    name: '조기 대선 모의전',
    description: '최고 난이도! 대권을 향한 마지막 관문입니다.',
    difficulty: 5,
    requirement: 'Lv5 1장 이상',
    reward: '정치자금',
    rewardAmount: 10000,
    icon: '🇰🇷',
    unlocked: false,
  },
];

function QuestContent() {
  const [selectedQuest, setSelectedQuest] = useState<CampaignQuest | null>(null);
  const [questProgress, setQuestProgress] = useState<Record<string, { completed: boolean; claimed: boolean }>>({
    quest_1: { completed: true, claimed: false },
  });

  const handleStartCampaign = (quest: CampaignQuest) => {
    // TODO: Trigger boss wave in game
    console.log('Starting campaign:', quest.name);
    setSelectedQuest(quest);
  };

  const handleClaimReward = (questId: string) => {
    setQuestProgress({
      ...questProgress,
      [questId]: { ...questProgress[questId], claimed: true },
    });
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
    return colors[difficulty - 1] || '#888';
  };

  return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      {/* Quest list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4, fontWeight: 'bold' }}>
          🗳️ 선거 출마
        </div>
        {CAMPAIGN_QUESTS.map((quest) => {
          const progress = questProgress[quest.id];
          const isCompleted = progress?.completed;
          const isClaimed = progress?.claimed;

          return (
            <div
              key={quest.id}
              onClick={() => quest.unlocked && setSelectedQuest(quest)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                backgroundColor: !quest.unlocked
                  ? 'rgba(50, 50, 50, 0.5)'
                  : isCompleted
                  ? 'rgba(34, 197, 94, 0.1)'
                  : selectedQuest?.id === quest.id
                  ? 'rgba(100, 100, 150, 0.3)'
                  : 'rgba(0, 0, 0, 0.3)',
                borderRadius: 8,
                border: isCompleted
                  ? '1px solid #22c55e'
                  : selectedQuest?.id === quest.id
                  ? '1px solid #666'
                  : '1px solid #333',
                cursor: quest.unlocked ? 'pointer' : 'not-allowed',
                opacity: quest.unlocked ? 1 : 0.5,
                transition: 'all 0.2s',
              }}
            >
              {/* Quest icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#22c55e' : getDifficultyColor(quest.difficulty),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                {isCompleted ? '✓' : quest.icon}
              </div>

              {/* Quest info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
                    {quest.name}
                  </span>
                  {!quest.unlocked && (
                    <span style={{ color: '#f97316', fontSize: 10 }}>🔒 잠김</span>
                  )}
                </div>
                <div style={{ color: '#888', fontSize: 11 }}>
                  {getDifficultyStars(quest.difficulty)}
                </div>
              </div>

              {/* Reward */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#ffd700', fontSize: 11 }}>
                  💰 {quest.rewardAmount.toLocaleString()}
                </div>
                {isCompleted && !isClaimed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaimReward(quest.id);
                    }}
                    style={{
                      marginTop: 4,
                      padding: '3px 10px',
                      backgroundColor: '#22c55e',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: 10,
                      cursor: 'pointer',
                    }}
                  >
                    수령
                  </button>
                )}
                {isClaimed && (
                  <div style={{ color: '#888', fontSize: 10, marginTop: 4 }}>
                    ✓ 수령완료
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quest detail panel */}
      <div
        style={{
          width: 280,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 12,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedQuest ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: '0 auto 12px',
                  borderRadius: '50%',
                  backgroundColor: getDifficultyColor(selectedQuest.difficulty),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                }}
              >
                {selectedQuest.icon}
              </div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                {selectedQuest.name}
              </div>
              <div style={{ color: getDifficultyColor(selectedQuest.difficulty), fontSize: 12 }}>
                {getDifficultyStars(selectedQuest.difficulty)}
              </div>
            </div>

            <div style={{ color: '#aaa', fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>
              {selectedQuest.description}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#888', fontSize: 11 }}>필요 조건</span>
                <span style={{ color: '#fff', fontSize: 11 }}>{selectedQuest.requirement}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888', fontSize: 11 }}>보상</span>
                <span style={{ color: '#ffd700', fontSize: 11 }}>
                  💰 {selectedQuest.rewardAmount.toLocaleString()} {selectedQuest.reward}
                </span>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <button
              onClick={() => handleStartCampaign(selectedQuest)}
              disabled={!selectedQuest.unlocked}
              style={{
                padding: '12px 20px',
                backgroundColor: selectedQuest.unlocked ? getDifficultyColor(selectedQuest.difficulty) : '#444',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14,
                cursor: selectedQuest.unlocked ? 'pointer' : 'not-allowed',
              }}
            >
              🗳️ 출마하기
            </button>

            <div style={{ color: '#666', fontSize: 10, textAlign: 'center', marginTop: 8 }}>
              출마 시 보스 웨이브가 발생합니다
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>🗳️</div>
            <div style={{ fontSize: 13 }}>선거를 선택하세요</div>
          </div>
        )}
      </div>
    </div>
  );
}
