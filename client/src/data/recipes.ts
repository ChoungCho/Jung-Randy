import { Recipe, Party, Rarity } from '@/types';

/**
 * Recipe definitions for character combining
 *
 * Basic party evolution:
 *   Common x3 → Special
 *   Special x2 + Common x1 → Rare
 *   Rare x2 → Legendary
 *   Legendary + Rare x2 → Mythic
 *
 * Unique politician evolution:
 *   Base form + party materials → Next form
 */

// ===== GENERIC PARTY RECIPES =====

export const genericRecipes: Recipe[] = [
  // === 국민의힘 (KUK) Generic Evolution ===
  {
    id: 'kuk_common_to_special',
    name: '국힘 재선 합성',
    description: '국힘 초선 3명을 합쳐 재선을 만든다',
    ingredients: [
      { party: Party.KUK, rarity: Rarity.COMMON, count: 3 }
    ],
    resultCharacterId: 'kuk_special_a'
  },
  {
    id: 'kuk_special_to_rare',
    name: '국힘 다선 합성',
    description: '국힘 재선 2명 + 초선 1명을 합쳐 다선을 만든다',
    ingredients: [
      { party: Party.KUK, rarity: Rarity.SPECIAL, count: 2 },
      { party: Party.KUK, rarity: Rarity.COMMON, count: 1 }
    ],
    resultCharacterId: 'kuk_rare_a'
  },

  // === 더불어민주당 (MIN) Generic Evolution ===
  {
    id: 'min_common_to_special',
    name: '민주 재선 합성',
    description: '민주 초선 3명을 합쳐 재선을 만든다',
    ingredients: [
      { party: Party.MIN, rarity: Rarity.COMMON, count: 3 }
    ],
    resultCharacterId: 'min_special_a'
  },
  {
    id: 'min_special_to_rare',
    name: '민주 다선 합성',
    description: '민주 재선 2명 + 초선 1명을 합쳐 다선을 만든다',
    ingredients: [
      { party: Party.MIN, rarity: Rarity.SPECIAL, count: 2 },
      { party: Party.MIN, rarity: Rarity.COMMON, count: 1 }
    ],
    resultCharacterId: 'min_rare_a'
  },
];

// ===== 안철수 UNIQUE RECIPES =====

export const ahnRecipes: Recipe[] = [
  {
    id: 'ahn_professor_to_ceo',
    name: '안철수 CEO 진화',
    description: '안철수(교수) + 국힘 초선 2명 → 안철수(CEO)',
    ingredients: [
      { characterId: 'ahn_professor', count: 1 },
      { party: Party.KUK, rarity: Rarity.COMMON, count: 2 }
    ],
    resultCharacterId: 'ahn_ceo'
  },
  {
    id: 'ahn_ceo_to_candidate',
    name: '안철수 후보 진화',
    description: '안철수(CEO) + 국힘 재선 1명 → 안철수(후보)',
    ingredients: [
      { characterId: 'ahn_ceo', count: 1 },
      { party: Party.KUK, rarity: Rarity.SPECIAL, count: 1 }
    ],
    resultCharacterId: 'ahn_candidate'
  },
  {
    id: 'ahn_candidate_to_assemblyman',
    name: '안철수 국회의원 진화',
    description: '안철수(후보) + 국힘 다선 2명 → 안철수(국회의원)',
    ingredients: [
      { characterId: 'ahn_candidate', count: 1 },
      { party: Party.KUK, rarity: Rarity.RARE, count: 2 }
    ],
    resultCharacterId: 'ahn_assemblyman'
  },
  {
    id: 'ahn_assemblyman_to_presidential',
    name: '안철수 대선후보 진화',
    description: '안철수(국회의원) + 국힘 전설 1명 → 안철수(대선후보)',
    ingredients: [
      { characterId: 'ahn_assemblyman', count: 1 },
      { party: Party.KUK, rarity: Rarity.LEGENDARY, count: 1 }
    ],
    resultCharacterId: 'ahn_presidential'
  }
];

// ===== 이재명 UNIQUE RECIPES =====

export const leeRecipes: Recipe[] = [
  {
    id: 'lee_lawyer_to_mayor',
    name: '이재명 시장 진화',
    description: '이재명(변호사) + 민주 초선 2명 → 이재명(시장)',
    ingredients: [
      { characterId: 'lee_lawyer', count: 1 },
      { party: Party.MIN, rarity: Rarity.COMMON, count: 2 }
    ],
    resultCharacterId: 'lee_mayor'
  },
  {
    id: 'lee_mayor_to_governor',
    name: '이재명 지사 진화',
    description: '이재명(시장) + 민주 재선 1명 → 이재명(지사)',
    ingredients: [
      { characterId: 'lee_mayor', count: 1 },
      { party: Party.MIN, rarity: Rarity.SPECIAL, count: 1 }
    ],
    resultCharacterId: 'lee_governor'
  },
  {
    id: 'lee_governor_to_leader',
    name: '이재명 당대표 진화',
    description: '이재명(지사) + 민주 다선 2명 → 이재명(당대표)',
    ingredients: [
      { characterId: 'lee_governor', count: 1 },
      { party: Party.MIN, rarity: Rarity.RARE, count: 2 }
    ],
    resultCharacterId: 'lee_leader'
  },
  {
    id: 'lee_leader_to_presidential',
    name: '이재명 대선후보 진화',
    description: '이재명(당대표) + 민주 전설 1명 → 이재명(대선후보)',
    ingredients: [
      { characterId: 'lee_leader', count: 1 },
      { party: Party.MIN, rarity: Rarity.LEGENDARY, count: 1 }
    ],
    resultCharacterId: 'lee_presidential'
  }
];

// ===== CROSS-PARTY RECIPES (중립 유닛) =====

export const crossPartyRecipes: Recipe[] = [
  // Future: Cross-party combination recipes
  // {
  //   id: 'neutral_bipartisan_hero',
  //   name: '초당적 영웅',
  //   description: '국힘 다선 + 민주 다선 → 초당적 영웅',
  //   ingredients: [
  //     { party: Party.KUK, rarity: Rarity.RARE, count: 1 },
  //     { party: Party.MIN, rarity: Rarity.RARE, count: 1 }
  //   ],
  //   resultCharacterId: 'neutral_hero'
  // }
];

// ===== ALL RECIPES =====

export const allRecipes: Recipe[] = [
  ...genericRecipes,
  ...ahnRecipes,
  ...leeRecipes,
  ...crossPartyRecipes,
];

/** Get recipe by ID */
export function getRecipeById(id: string): Recipe | undefined {
  return allRecipes.find(r => r.id === id);
}

/** Get all recipes that result in a specific character */
export function getRecipesForCharacter(characterId: string): Recipe[] {
  return allRecipes.filter(r => r.resultCharacterId === characterId);
}

/** Get all recipes that use a specific character as ingredient */
export function getRecipesUsingCharacter(characterId: string): Recipe[] {
  return allRecipes.filter(r =>
    r.ingredients.some(i => i.characterId === characterId)
  );
}
