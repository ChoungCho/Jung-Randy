import { Character, Party, Rarity, Role, TargetType, EffectType } from '@/types';

/**
 * Character database
 * - Generic party cards for combining material
 * - Unique politicians with evolution forms
 */

// ===== GENERIC PARTY CARDS (Combining Material) =====

export const genericCharacters: Character[] = [
  // === People Power Party (국민의힘) Generic ===
  {
    id: 'kuk_common_a',
    name: '국힘 초선',
    party: Party.KUK,
    rarity: Rarity.COMMON,
    role: Role.DEALER,
    isUnique: false,
    baseStats: {
      hp: 100, maxHp: 100,
      atk: 10, def: 5,
      speed: 100, attackSpeed: 1,
      attackRange: 50, critRate: 5, critDamage: 150
    },
    skills: [],
    passives: [],
    spriteKey: 'kuk_common',
    portraitKey: 'kuk_common_portrait'
  },
  {
    id: 'kuk_special_a',
    name: '국힘 재선',
    party: Party.KUK,
    rarity: Rarity.SPECIAL,
    role: Role.DEALER,
    isUnique: false,
    baseStats: {
      hp: 180, maxHp: 180,
      atk: 20, def: 10,
      speed: 110, attackSpeed: 1.2,
      attackRange: 55, critRate: 8, critDamage: 160
    },
    skills: [],
    passives: [{
      id: 'kuk_special_passive',
      name: '보수 결집',
      description: '같은 정당 캐릭터가 근처에 있으면 공격력 5% 증가',
      effects: [{ type: EffectType.BUFF, value: 5 }],
      trigger: 'always'
    }],
    spriteKey: 'kuk_special',
    portraitKey: 'kuk_special_portrait'
  },
  {
    id: 'kuk_rare_a',
    name: '국힘 다선',
    party: Party.KUK,
    rarity: Rarity.RARE,
    role: Role.DEALER,
    isUnique: false,
    baseStats: {
      hp: 300, maxHp: 300,
      atk: 35, def: 18,
      speed: 115, attackSpeed: 1.3,
      attackRange: 60, critRate: 12, critDamage: 170
    },
    skills: [{
      id: 'kuk_rare_skill',
      name: '의정활동',
      description: '주변 적에게 데미지를 주고 아군의 쿨타임 감소',
      cooldown: 8000,
      manaCost: 0,
      targetType: TargetType.AOE_ENEMY,
      range: 100,
      effects: [
        { type: EffectType.DAMAGE, value: 50 },
        { type: EffectType.BUFF, value: 10, duration: 3000 }
      ]
    }],
    passives: [],
    spriteKey: 'kuk_rare',
    portraitKey: 'kuk_rare_portrait'
  },

  // === Democratic Party (더불어민주당) Generic ===
  {
    id: 'min_common_a',
    name: '민주 초선',
    party: Party.MIN,
    rarity: Rarity.COMMON,
    role: Role.DEALER,
    isUnique: false,
    baseStats: {
      hp: 100, maxHp: 100,
      atk: 10, def: 5,
      speed: 100, attackSpeed: 1,
      attackRange: 50, critRate: 5, critDamage: 150
    },
    skills: [],
    passives: [],
    spriteKey: 'min_common',
    portraitKey: 'min_common_portrait'
  },
  {
    id: 'min_special_a',
    name: '민주 재선',
    party: Party.MIN,
    rarity: Rarity.SPECIAL,
    role: Role.SUPPORT,
    isUnique: false,
    baseStats: {
      hp: 200, maxHp: 200,
      atk: 15, def: 12,
      speed: 105, attackSpeed: 1.1,
      attackRange: 55, critRate: 6, critDamage: 155
    },
    skills: [],
    passives: [{
      id: 'min_special_passive',
      name: '민심 결집',
      description: '같은 정당 캐릭터가 근처에 있으면 HP 5% 증가',
      effects: [{ type: EffectType.BUFF, value: 5, statModifier: { maxHp: 5 } }],
      trigger: 'always'
    }],
    spriteKey: 'min_special',
    portraitKey: 'min_special_portrait'
  },
  {
    id: 'min_rare_a',
    name: '민주 다선',
    party: Party.MIN,
    rarity: Rarity.RARE,
    role: Role.SUPPORT,
    isUnique: false,
    baseStats: {
      hp: 350, maxHp: 350,
      atk: 28, def: 20,
      speed: 110, attackSpeed: 1.2,
      attackRange: 60, critRate: 10, critDamage: 165
    },
    skills: [{
      id: 'min_rare_skill',
      name: '민생법안',
      description: '아군 전체 HP 회복 및 방어력 증가',
      cooldown: 10000,
      manaCost: 0,
      targetType: TargetType.ALL_ALLIES,
      range: 200,
      effects: [
        { type: EffectType.HEAL, value: 30 },
        { type: EffectType.BUFF, value: 15, duration: 5000, statModifier: { def: 10 } }
      ]
    }],
    passives: [],
    spriteKey: 'min_rare',
    portraitKey: 'min_rare_portrait'
  },
];

// ===== UNIQUE POLITICIANS - 안철수 Evolution Line =====

export const ahnCheolsooLine: Character[] = [
  {
    id: 'ahn_professor',
    name: '안철수',
    party: Party.KUK,
    rarity: Rarity.COMMON,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'ahn_cheolsoo',
    formIndex: 0,
    formName: '교수',
    baseStats: {
      hp: 120, maxHp: 120,
      atk: 12, def: 6,
      speed: 105, attackSpeed: 1.1,
      attackRange: 55, critRate: 10, critDamage: 160
    },
    skills: [],
    passives: [{
      id: 'ahn_professor_passive',
      name: '학자의 통찰',
      description: '스킬 쿨타임 5% 감소',
      effects: [{ type: EffectType.BUFF, value: 5 }],
      trigger: 'always'
    }],
    spriteKey: 'ahn_professor',
    portraitKey: 'ahn_professor_portrait'
  },
  {
    id: 'ahn_ceo',
    name: '안철수',
    party: Party.KUK,
    rarity: Rarity.SPECIAL,
    role: Role.DEALER,
    isUnique: true,
    uniqueId: 'ahn_cheolsoo',
    formIndex: 1,
    formName: 'CEO',
    baseStats: {
      hp: 200, maxHp: 200,
      atk: 25, def: 10,
      speed: 115, attackSpeed: 1.3,
      attackRange: 60, critRate: 15, critDamage: 175
    },
    skills: [{
      id: 'ahn_ceo_skill',
      name: '바이러스 퇴치',
      description: '적 하나에게 큰 데미지 + 디버프 제거',
      cooldown: 6000,
      manaCost: 0,
      targetType: TargetType.SINGLE_ENEMY,
      range: 80,
      effects: [{ type: EffectType.DAMAGE, value: 80 }]
    }],
    passives: [{
      id: 'ahn_ceo_passive',
      name: 'IT 혁신',
      description: '공격 시 10% 확률로 추가 데미지',
      effects: [{ type: EffectType.DAMAGE, value: 20 }],
      trigger: 'on_attack'
    }],
    spriteKey: 'ahn_ceo',
    portraitKey: 'ahn_ceo_portrait'
  },
  {
    id: 'ahn_candidate',
    name: '안철수',
    party: Party.KUK,
    rarity: Rarity.RARE,
    role: Role.DEALER,
    isUnique: true,
    uniqueId: 'ahn_cheolsoo',
    formIndex: 2,
    formName: '후보',
    baseStats: {
      hp: 350, maxHp: 350,
      atk: 45, def: 18,
      speed: 120, attackSpeed: 1.4,
      attackRange: 65, critRate: 18, critDamage: 180
    },
    skills: [{
      id: 'ahn_candidate_skill',
      name: '새정치',
      description: '주변 적 전체에게 데미지',
      cooldown: 8000,
      manaCost: 0,
      targetType: TargetType.AOE_ENEMY,
      range: 120,
      effects: [{ type: EffectType.DAMAGE, value: 60 }]
    }],
    passives: [{
      id: 'ahn_candidate_passive',
      name: '이과 감성',
      description: '스킬 명중률 10% 증가',
      effects: [{ type: EffectType.BUFF, value: 10 }],
      trigger: 'always'
    }],
    spriteKey: 'ahn_candidate',
    portraitKey: 'ahn_candidate_portrait'
  },
  {
    id: 'ahn_assemblyman',
    name: '안철수',
    party: Party.KUK,
    rarity: Rarity.LEGENDARY,
    role: Role.DEALER,
    isUnique: true,
    uniqueId: 'ahn_cheolsoo',
    formIndex: 3,
    formName: '국회의원',
    baseStats: {
      hp: 550, maxHp: 550,
      atk: 70, def: 30,
      speed: 125, attackSpeed: 1.5,
      attackRange: 70, critRate: 20, critDamage: 190
    },
    skills: [
      {
        id: 'ahn_assemblyman_skill1',
        name: '의정활동',
        description: '넓은 범위 적에게 데미지 + 슬로우',
        cooldown: 10000,
        manaCost: 0,
        targetType: TargetType.AOE_ENEMY,
        range: 150,
        effects: [
          { type: EffectType.DAMAGE, value: 100 },
          { type: EffectType.DEBUFF, value: 20, duration: 3000, statModifier: { speed: -20 } }
        ]
      }
    ],
    passives: [{
      id: 'ahn_assemblyman_passive',
      name: '창업 정신',
      description: '적 처치 시 골드 10% 추가 획득',
      effects: [{ type: EffectType.SPECIAL, value: 10 }],
      trigger: 'on_kill'
    }],
    spriteKey: 'ahn_assemblyman',
    portraitKey: 'ahn_assemblyman_portrait'
  },
  {
    id: 'ahn_presidential',
    name: '안철수',
    party: Party.KUK,
    rarity: Rarity.MYTHIC,
    role: Role.DEALER,
    isUnique: true,
    uniqueId: 'ahn_cheolsoo',
    formIndex: 4,
    formName: '대선후보',
    baseStats: {
      hp: 800, maxHp: 800,
      atk: 100, def: 45,
      speed: 130, attackSpeed: 1.6,
      attackRange: 80, critRate: 25, critDamage: 200
    },
    skills: [
      {
        id: 'ahn_presidential_skill1',
        name: '국민면접',
        description: '이번 웨이브 동안 추가 무료 뽑기 1회 제공',
        cooldown: 60000,
        manaCost: 0,
        targetType: TargetType.SELF,
        range: 0,
        effects: [{ type: EffectType.SPECIAL, value: 1 }]
      },
      {
        id: 'ahn_presidential_skill2',
        name: '대통합',
        description: '전체 적에게 대규모 데미지',
        cooldown: 15000,
        manaCost: 0,
        targetType: TargetType.ALL_ENEMIES,
        range: 300,
        effects: [{ type: EffectType.DAMAGE, value: 150 }]
      }
    ],
    passives: [{
      id: 'ahn_presidential_passive',
      name: '혁신의 아이콘',
      description: '모든 아군 스킬 쿨타임 10% 감소',
      effects: [{ type: EffectType.BUFF, value: 10 }],
      trigger: 'always'
    }],
    spriteKey: 'ahn_presidential',
    portraitKey: 'ahn_presidential_portrait'
  }
];

// ===== UNIQUE POLITICIANS - 이재명 Evolution Line =====

export const leeJaemyungLine: Character[] = [
  {
    id: 'lee_lawyer',
    name: '이재명',
    party: Party.MIN,
    rarity: Rarity.COMMON,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'lee_jaemyung',
    formIndex: 0,
    formName: '변호사',
    baseStats: {
      hp: 130, maxHp: 130,
      atk: 10, def: 8,
      speed: 110, attackSpeed: 1,
      attackRange: 50, critRate: 5, critDamage: 150
    },
    skills: [],
    passives: [{
      id: 'lee_lawyer_passive',
      name: '법률 지식',
      description: '받는 디버프 지속시간 10% 감소',
      effects: [{ type: EffectType.BUFF, value: 10 }],
      trigger: 'always'
    }],
    spriteKey: 'lee_lawyer',
    portraitKey: 'lee_lawyer_portrait'
  },
  {
    id: 'lee_mayor',
    name: '이재명',
    party: Party.MIN,
    rarity: Rarity.SPECIAL,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'lee_jaemyung',
    formIndex: 1,
    formName: '시장',
    baseStats: {
      hp: 220, maxHp: 220,
      atk: 18, def: 14,
      speed: 115, attackSpeed: 1.1,
      attackRange: 55, critRate: 8, critDamage: 155
    },
    skills: [{
      id: 'lee_mayor_skill',
      name: '민생정책',
      description: '적 처치 시 골드 추가 획득',
      cooldown: 0,
      manaCost: 0,
      targetType: TargetType.SELF,
      range: 0,
      effects: [{ type: EffectType.SPECIAL, value: 5 }]
    }],
    passives: [{
      id: 'lee_mayor_passive',
      name: '행정 경험',
      description: '이동속도 5% 증가',
      effects: [{ type: EffectType.BUFF, value: 5, statModifier: { speed: 5 } }],
      trigger: 'always'
    }],
    spriteKey: 'lee_mayor',
    portraitKey: 'lee_mayor_portrait'
  },
  {
    id: 'lee_governor',
    name: '이재명',
    party: Party.MIN,
    rarity: Rarity.RARE,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'lee_jaemyung',
    formIndex: 2,
    formName: '지사',
    baseStats: {
      hp: 380, maxHp: 380,
      atk: 30, def: 22,
      speed: 120, attackSpeed: 1.2,
      attackRange: 60, critRate: 10, critDamage: 160
    },
    skills: [{
      id: 'lee_governor_skill',
      name: '기본소득',
      description: '웨이브 시작 시 모든 플레이어 골드 증가',
      cooldown: 30000,
      manaCost: 0,
      targetType: TargetType.ALL_ALLIES,
      range: 999,
      effects: [{ type: EffectType.SPECIAL, value: 20 }]
    }],
    passives: [{
      id: 'lee_governor_passive',
      name: '경기도 경험',
      description: '아군 전체 이동속도 3% 증가',
      effects: [{ type: EffectType.BUFF, value: 3, statModifier: { speed: 3 } }],
      trigger: 'always'
    }],
    spriteKey: 'lee_governor',
    portraitKey: 'lee_governor_portrait'
  },
  {
    id: 'lee_leader',
    name: '이재명',
    party: Party.MIN,
    rarity: Rarity.LEGENDARY,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'lee_jaemyung',
    formIndex: 3,
    formName: '당대표',
    baseStats: {
      hp: 600, maxHp: 600,
      atk: 50, def: 35,
      speed: 125, attackSpeed: 1.3,
      attackRange: 65, critRate: 12, critDamage: 170
    },
    skills: [
      {
        id: 'lee_leader_skill1',
        name: '당무',
        description: '민주당 캐릭터 전체 버프',
        cooldown: 12000,
        manaCost: 0,
        targetType: TargetType.ALL_ALLIES,
        range: 999,
        effects: [
          { type: EffectType.BUFF, value: 15, duration: 5000, statModifier: { atk: 15, def: 10 } }
        ]
      }
    ],
    passives: [{
      id: 'lee_leader_passive',
      name: '강한 리더십',
      description: '민주당 캐릭터 공격력 5% 증가',
      effects: [{ type: EffectType.BUFF, value: 5, statModifier: { atk: 5 } }],
      trigger: 'always'
    }],
    spriteKey: 'lee_leader',
    portraitKey: 'lee_leader_portrait'
  },
  {
    id: 'lee_presidential',
    name: '이재명',
    party: Party.MIN,
    rarity: Rarity.MYTHIC,
    role: Role.SUPPORT,
    isUnique: true,
    uniqueId: 'lee_jaemyung',
    formIndex: 4,
    formName: '대선후보',
    baseStats: {
      hp: 900, maxHp: 900,
      atk: 80, def: 50,
      speed: 130, attackSpeed: 1.4,
      attackRange: 75, critRate: 15, critDamage: 180
    },
    skills: [
      {
        id: 'lee_presidential_skill1',
        name: '민생지원금',
        description: '게임당 1회: 무료 뽑기 2회 제공',
        cooldown: 120000,
        manaCost: 0,
        targetType: TargetType.SELF,
        range: 0,
        effects: [{ type: EffectType.SPECIAL, value: 2 }]
      },
      {
        id: 'lee_presidential_skill2',
        name: '민심',
        description: '아군 전체 대규모 HP 회복',
        cooldown: 15000,
        manaCost: 0,
        targetType: TargetType.ALL_ALLIES,
        range: 999,
        effects: [{ type: EffectType.HEAL, value: 200 }]
      }
    ],
    passives: [{
      id: 'lee_presidential_passive',
      name: '정권교체',
      description: '적 처치 시 15% 확률로 골드 2배 획득',
      effects: [{ type: EffectType.SPECIAL, value: 15 }],
      trigger: 'on_kill'
    }],
    spriteKey: 'lee_presidential',
    portraitKey: 'lee_presidential_portrait'
  }
];

// ===== ALL CHARACTERS =====

export const allCharacters: Character[] = [
  ...genericCharacters,
  ...ahnCheolsooLine,
  ...leeJaemyungLine,
];

/** Get character by ID */
export function getCharacterById(id: string): Character | undefined {
  return allCharacters.find(c => c.id === id);
}

/** Get all characters of a specific party and rarity */
export function getCharactersByPartyAndRarity(party: Party, rarity: Rarity): Character[] {
  return allCharacters.filter(c => c.party === party && c.rarity === rarity && !c.isUnique);
}

/** Get all forms of a unique politician */
export function getUniqueEvolutionLine(uniqueId: string): Character[] {
  return allCharacters
    .filter(c => c.uniqueId === uniqueId)
    .sort((a, b) => (a.formIndex ?? 0) - (b.formIndex ?? 0));
}
