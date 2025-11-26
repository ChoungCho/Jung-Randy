import { Mob, Wave } from '@/types';

/**
 * Enemy mob definitions
 * Political theme: Corruption, scandal, etc.
 */

export const mobs: Mob[] = [
  // === Normal Mobs ===
  {
    id: 'mob_corruption_small',
    name: '소형 부정부패',
    type: 'normal',
    baseStats: {
      hp: 50, maxHp: 50,
      atk: 5, def: 2,
      speed: 60, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 5,
    spriteKey: 'mob_corruption_small'
  },
  {
    id: 'mob_scandal',
    name: '스캔들',
    type: 'normal',
    baseStats: {
      hp: 80, maxHp: 80,
      atk: 8, def: 3,
      speed: 70, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 8,
    spriteKey: 'mob_scandal'
  },
  {
    id: 'mob_fake_news',
    name: '가짜뉴스',
    type: 'normal',
    baseStats: {
      hp: 60, maxHp: 60,
      atk: 10, def: 1,
      speed: 90, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 7,
    spriteKey: 'mob_fake_news'
  },

  // === Elite Mobs ===
  {
    id: 'mob_corruption_large',
    name: '대형 부정부패',
    type: 'elite',
    baseStats: {
      hp: 300, maxHp: 300,
      atk: 20, def: 10,
      speed: 50, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 30,
    spriteKey: 'mob_corruption_large'
  },
  {
    id: 'mob_lobbying',
    name: '로비스트',
    type: 'elite',
    baseStats: {
      hp: 250, maxHp: 250,
      atk: 25, def: 8,
      speed: 55, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 35,
    spriteKey: 'mob_lobbying'
  },

  // === Boss Mobs ===
  {
    id: 'mob_major_scandal',
    name: '대형 스캔들',
    type: 'boss',
    baseStats: {
      hp: 1000, maxHp: 1000,
      atk: 50, def: 25,
      speed: 40, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 100,
    spriteKey: 'mob_major_scandal'
  },
  {
    id: 'mob_impeachment',
    name: '탄핵',
    type: 'boss',
    baseStats: {
      hp: 2000, maxHp: 2000,
      atk: 80, def: 40,
      speed: 35, attackSpeed: 0,
      attackRange: 0, critRate: 0, critDamage: 100
    },
    goldReward: 200,
    spriteKey: 'mob_impeachment'
  }
];

/**
 * Wave definitions
 * Difficulty increases with wave number
 */
export const waves: Wave[] = [
  // Wave 1: Tutorial wave
  {
    waveNumber: 1,
    mobs: [
      { mobId: 'mob_corruption_small', count: 5, statMultiplier: 1.0 }
    ],
    spawnInterval: 2000,
    bonusGold: 10
  },

  // Wave 2
  {
    waveNumber: 2,
    mobs: [
      { mobId: 'mob_corruption_small', count: 8, statMultiplier: 1.0 },
      { mobId: 'mob_scandal', count: 2, statMultiplier: 1.0 }
    ],
    spawnInterval: 1800,
    bonusGold: 15
  },

  // Wave 3
  {
    waveNumber: 3,
    mobs: [
      { mobId: 'mob_scandal', count: 6, statMultiplier: 1.0 },
      { mobId: 'mob_fake_news', count: 4, statMultiplier: 1.0 }
    ],
    spawnInterval: 1600,
    bonusGold: 20
  },

  // Wave 4
  {
    waveNumber: 4,
    mobs: [
      { mobId: 'mob_corruption_small', count: 10, statMultiplier: 1.2 },
      { mobId: 'mob_scandal', count: 5, statMultiplier: 1.1 }
    ],
    spawnInterval: 1500,
    bonusGold: 25
  },

  // Wave 5: First elite
  {
    waveNumber: 5,
    mobs: [
      { mobId: 'mob_fake_news', count: 8, statMultiplier: 1.2 },
      { mobId: 'mob_corruption_large', count: 1, statMultiplier: 1.0 }
    ],
    spawnInterval: 1400,
    bonusGold: 40
  },

  // Wave 6
  {
    waveNumber: 6,
    mobs: [
      { mobId: 'mob_scandal', count: 10, statMultiplier: 1.3 },
      { mobId: 'mob_lobbying', count: 2, statMultiplier: 1.0 }
    ],
    spawnInterval: 1300,
    bonusGold: 50
  },

  // Wave 7
  {
    waveNumber: 7,
    mobs: [
      { mobId: 'mob_corruption_small', count: 15, statMultiplier: 1.5 },
      { mobId: 'mob_corruption_large', count: 2, statMultiplier: 1.1 }
    ],
    spawnInterval: 1200,
    bonusGold: 60
  },

  // Wave 8
  {
    waveNumber: 8,
    mobs: [
      { mobId: 'mob_fake_news', count: 12, statMultiplier: 1.5 },
      { mobId: 'mob_lobbying', count: 3, statMultiplier: 1.2 }
    ],
    spawnInterval: 1100,
    bonusGold: 70
  },

  // Wave 9
  {
    waveNumber: 9,
    mobs: [
      { mobId: 'mob_scandal', count: 15, statMultiplier: 1.6 },
      { mobId: 'mob_corruption_large', count: 3, statMultiplier: 1.3 },
      { mobId: 'mob_lobbying', count: 2, statMultiplier: 1.3 }
    ],
    spawnInterval: 1000,
    bonusGold: 80
  },

  // Wave 10: First boss
  {
    waveNumber: 10,
    mobs: [
      { mobId: 'mob_corruption_small', count: 20, statMultiplier: 1.8 },
      { mobId: 'mob_major_scandal', count: 1, statMultiplier: 1.0 }
    ],
    spawnInterval: 900,
    bonusGold: 150
  },

  // Waves 11-19: Scaling difficulty (placeholder)
  // Add more waves as needed...

  // Wave 20: Final boss
  {
    waveNumber: 20,
    mobs: [
      { mobId: 'mob_corruption_large', count: 5, statMultiplier: 2.0 },
      { mobId: 'mob_lobbying', count: 5, statMultiplier: 2.0 },
      { mobId: 'mob_impeachment', count: 1, statMultiplier: 1.0 }
    ],
    spawnInterval: 800,
    bonusGold: 500
  }
];

/** Get mob by ID */
export function getMobById(id: string): Mob | undefined {
  return mobs.find(m => m.id === id);
}

/** Get wave by number */
export function getWave(waveNumber: number): Wave | undefined {
  return waves.find(w => w.waveNumber === waveNumber);
}

/** Get total wave count */
export function getTotalWaves(): number {
  return waves.length;
}
