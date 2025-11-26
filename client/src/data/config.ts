import { GameConfig } from '@/types';

/**
 * Default game configuration
 * These values can be adjusted for balancing
 */
export const defaultGameConfig: GameConfig = {
  // Economy
  startingGold: 100,
  rollCost: 10,
  freeRollsPerWave: 1,

  // Player
  startingLives: 20,
  maxDeployedCharacters: 5,

  // Game
  totalWaves: 20,

  // Map dimensions (in pixels)
  mapWidth: 1280,
  mapHeight: 720,
};

/**
 * Rarity weights for gacha/rolling
 * Higher number = more common
 */
export const rarityWeights = {
  common: 60,     // 60%
  special: 25,    // 25%
  rare: 12,       // 12%
  legendary: 2.5, // 2.5%
  mythic: 0.5,    // 0.5%
};

/**
 * Party weights for rolling
 * 50/50 by default
 */
export const partyWeights = {
  kuk: 50,
  min: 50,
};

/**
 * Level scaling multipliers
 * Applied per wave for difficulty progression
 */
export const difficultyScaling = {
  hpPerWave: 1.08,      // 8% HP increase per wave
  atkPerWave: 1.05,     // 5% ATK increase per wave
  speedPerWave: 1.02,   // 2% speed increase per wave
};

/**
 * Synergy thresholds
 * Number of same-party characters needed for bonus
 */
export const synergyThresholds = {
  tier1: 2,  // 2 of same party
  tier2: 3,  // 3 of same party
  tier3: 5,  // 5 of same party
};

/**
 * Synergy bonuses by tier
 */
export const synergyBonuses = {
  // 국민의힘 synergy: Attack focused
  kuk: {
    tier1: { atk: 5 },        // +5% ATK
    tier2: { atk: 10, critRate: 5 },  // +10% ATK, +5% Crit
    tier3: { atk: 20, critRate: 10, critDamage: 20 }, // +20% ATK, +10% Crit, +20% Crit DMG
  },
  // 민주당 synergy: Survival focused
  min: {
    tier1: { maxHp: 5 },      // +5% HP
    tier2: { maxHp: 10, def: 5 },     // +10% HP, +5% DEF
    tier3: { maxHp: 20, def: 15, speed: 10 }, // +20% HP, +15% DEF, +10% Speed
  },
};

/**
 * Animation frame rates
 */
export const animationConfig = {
  idle: { frameRate: 8, repeat: -1 },
  walk: { frameRate: 12, repeat: -1 },
  attack: { frameRate: 16, repeat: 0 },
  skill: { frameRate: 16, repeat: 0 },
  death: { frameRate: 10, repeat: 0 },
};

/**
 * Combat timing (in ms)
 */
export const combatConfig = {
  globalCooldown: 200,        // Minimum time between actions
  projectileSpeed: 400,       // Pixels per second
  damageNumberDuration: 1000, // How long damage numbers show
  buffIconSize: 24,           // Size of buff icons
};
