// ===== POLITICIAN DATA FOR COMBINATION SYSTEM =====
// Lv1 ~ Lv3 Politicians based on Korean National Assembly

export type Party = 'kuk' | 'min' | 'minor' | 'independent';
export type PoliticianTier = 'lv1' | 'lv2' | 'lv3';

export interface Politician {
  id: string;
  name: string;
  tier: PoliticianTier;
  party: Party;
  partyDetail?: string; // For minor parties
  terms?: number; // Number of terms (선수)
  committee?: string; // Committee assignment
  role?: string; // line_dps, boss_dps, hold, buffer, debuffer, economy
  attack: number;
  defense: number;
  hp: number;
  description: string;
  modelPath: string;
  color: string; // Tint color for model
  hasSkill: boolean;
  skillName?: string;
  skillDescription?: string;
}

export interface PoliticianRecipe {
  id: string;
  materials: string[]; // politician ids (2 or 3)
  result: string | 'random_lv2'; // specific politician id or random pool
  resultPool?: string[]; // if result is random, pick from this pool
}

// Tier colors for UI
export const TIER_COLORS: Record<PoliticianTier, string> = {
  lv1: '#9ca3af',     // gray - 기초 지지층
  lv2: '#22c55e',     // green - 일반 의원
  lv3: '#3b82f6',     // blue - 핵심 중진
};

export const TIER_BG_COLORS: Record<PoliticianTier, string> = {
  lv1: '#374151',
  lv2: '#14532d',
  lv3: '#1e3a5f',
};

export const TIER_NAMES: Record<PoliticianTier, string> = {
  lv1: '기초 지지층',
  lv2: '일반 의원',
  lv3: '핵심 중진',
};

export const PARTY_COLORS: Record<Party, string> = {
  kuk: '#E61E2B',    // 국민의힘 - red
  min: '#004EA2',    // 더불어민주당 - blue
  minor: '#FFD700',  // 군소정당 - gold
  independent: '#808080', // 무소속 - gray
};

export const PARTY_NAMES: Record<Party, string> = {
  kuk: '국민의힘',
  min: '더불어민주당',
  minor: '군소정당',
  independent: '무소속',
};

// Dummy model path (will be replaced with actual models later)
const DUMMY_MODEL = '/assets/characters/stylized_base.glb';

// ===== Lv1: 기초 지지층 (2 types) =====
export const LV1_POLITICIANS: Politician[] = [
  {
    id: 'L1_KH',
    name: '국힘 지지자',
    tier: 'lv1',
    party: 'kuk',
    attack: 5,
    defense: 3,
    hp: 30,
    description: '국민의힘을 지지하는 기초 지지층.',
    modelPath: DUMMY_MODEL,
    color: '#E61E2B',
    hasSkill: false,
  },
  {
    id: 'L1_DM',
    name: '민주 지지자',
    tier: 'lv1',
    party: 'min',
    attack: 5,
    defense: 3,
    hp: 30,
    description: '더불어민주당을 지지하는 기초 지지층.',
    modelPath: DUMMY_MODEL,
    color: '#004EA2',
    hasSkill: false,
  },
];

// ===== Lv2: 일반 의원 (27 types) =====

// 더불어민주당 Lv2 (14명)
export const LV2_MIN_POLITICIANS: Politician[] = [
  {
    id: 'kwon_chilseung',
    name: '권칠승',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '행안위',
    role: 'buffer',
    attack: 15,
    defense: 12,
    hp: 80,
    description: '3선 의원. 행정안전위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1E40AF',
    hasSkill: false,
  },
  {
    id: 'kim_gyoheung',
    name: '김교흥',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '문체위',
    role: 'buffer',
    attack: 14,
    defense: 13,
    hp: 85,
    description: '3선 의원. 문화체육관광위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1E3A8A',
    hasSkill: false,
  },
  {
    id: 'kim_byungki',
    name: '김병기',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '정보위·국방위',
    role: 'line_dps',
    attack: 18,
    defense: 10,
    hp: 75,
    description: '3선 의원. 정보위원회·국방위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1D4ED8',
    hasSkill: false,
  },
  {
    id: 'kim_sunghwan',
    name: '김성환',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '산자중기위',
    role: 'economy',
    attack: 13,
    defense: 14,
    hp: 90,
    description: '3선 의원. 산업통상자원중소벤처기업위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#2563EB',
    hasSkill: false,
  },
  {
    id: 'kim_youngjin',
    name: '김영진',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '기재위·정보위',
    role: 'economy',
    attack: 14,
    defense: 13,
    hp: 85,
    description: '3선 의원. 기획재정위원회·정보위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#3B82F6',
    hasSkill: false,
  },
  {
    id: 'kim_youngho',
    name: '김영호',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '교육위',
    role: 'buffer',
    attack: 12,
    defense: 15,
    hp: 95,
    description: '3선 의원. 교육위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#60A5FA',
    hasSkill: false,
  },
  {
    id: 'kim_yoondeok',
    name: '김윤덕',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '문체위',
    role: 'buffer',
    attack: 13,
    defense: 14,
    hp: 88,
    description: '3선 의원. 문화체육관광위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#93C5FD',
    hasSkill: false,
  },
  {
    id: 'kim_jungho',
    name: '김정호',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '기후·농해수위',
    role: 'economy',
    attack: 14,
    defense: 12,
    hp: 82,
    description: '3선 의원. 기후에너지환경농림해양수산위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#BFDBFE',
    hasSkill: false,
  },
  {
    id: 'maeng_sunggyu',
    name: '맹성규',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '국토위',
    role: 'hold',
    attack: 11,
    defense: 18,
    hp: 100,
    description: '3선 의원. 국토교통위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1E40AF',
    hasSkill: false,
  },
  {
    id: 'park_jung',
    name: '박정',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '기후에너지환경노동위',
    role: 'debuffer',
    attack: 16,
    defense: 11,
    hp: 78,
    description: '3선 의원. 기후에너지환경노동위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1E3A8A',
    hasSkill: false,
  },
  {
    id: 'park_jumin',
    name: '박주민',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '복지위',
    role: 'buffer',
    attack: 15,
    defense: 13,
    hp: 85,
    description: '3선 의원. 보건복지위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#1D4ED8',
    hasSkill: false,
  },
  {
    id: 'park_chandae',
    name: '박찬대',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '정무위',
    role: 'economy',
    attack: 14,
    defense: 14,
    hp: 88,
    description: '3선 의원. 정무위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#2563EB',
    hasSkill: false,
  },
  {
    id: 'baek_hyeryeon',
    name: '백혜련',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '복지위',
    role: 'buffer',
    attack: 12,
    defense: 16,
    hp: 92,
    description: '3선 의원. 보건복지위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#3B82F6',
    hasSkill: false,
  },
  {
    id: 'seo_samseok',
    name: '서삼석',
    tier: 'lv2',
    party: 'min',
    terms: 3,
    committee: '농해수위',
    role: 'economy',
    attack: 13,
    defense: 15,
    hp: 90,
    description: '3선 의원. 농림해양수산위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#60A5FA',
    hasSkill: false,
  },
];

// 국민의힘 Lv2 (13명)
export const LV2_KUK_POLITICIANS: Politician[] = [
  {
    id: 'kim_seokki',
    name: '김석기',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '외통위',
    role: 'line_dps',
    attack: 17,
    defense: 11,
    hp: 78,
    description: '3선 의원. 외교통일위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#DC2626',
    hasSkill: false,
  },
  {
    id: 'kim_sungwon',
    name: '김성원',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '산자중기위',
    role: 'economy',
    attack: 14,
    defense: 13,
    hp: 85,
    description: '3선 의원. 산업통상자원중소벤처기업위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#EF4444',
    hasSkill: false,
  },
  {
    id: 'kim_jungjae',
    name: '김정재',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '국토위',
    role: 'hold',
    attack: 12,
    defense: 17,
    hp: 95,
    description: '3선 의원. 국토교통위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#F87171',
    hasSkill: false,
  },
  {
    id: 'kim_heejung',
    name: '김희정',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '국토위',
    role: 'buffer',
    attack: 13,
    defense: 15,
    hp: 88,
    description: '3선 의원. 국토교통위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#FCA5A5',
    hasSkill: false,
  },
  {
    id: 'sung_iljong',
    name: '성일종',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '국방위',
    role: 'boss_dps',
    attack: 19,
    defense: 10,
    hp: 72,
    description: '3선 의원. 국방위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#B91C1C',
    hasSkill: false,
  },
  {
    id: 'song_seokjun',
    name: '송석준',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '법사위',
    role: 'debuffer',
    attack: 16,
    defense: 12,
    hp: 80,
    description: '3선 의원. 법제사법위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#991B1B',
    hasSkill: false,
  },
  {
    id: 'song_eonseok',
    name: '송언석',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '정무·운영·외통',
    role: 'buffer',
    attack: 14,
    defense: 14,
    hp: 86,
    description: '3선 의원. 정무위원회·운영위원회·외교통일위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#7F1D1D',
    hasSkill: false,
  },
  {
    id: 'shin_sungbeom',
    name: '신성범',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '과방위·정보위',
    role: 'line_dps',
    attack: 18,
    defense: 10,
    hp: 75,
    description: '3선 의원. 과학기술정보방송통신위원회·정보위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#DC2626',
    hasSkill: false,
  },
  {
    id: 'yoon_hanhong',
    name: '윤한홍',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '정무위',
    role: 'economy',
    attack: 15,
    defense: 13,
    hp: 84,
    description: '3선 의원. 정무위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#EF4444',
    hasSkill: false,
  },
  {
    id: 'lee_manhee',
    name: '이만희',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '농해수위',
    role: 'economy',
    attack: 14,
    defense: 14,
    hp: 87,
    description: '3선 의원. 농림해양수산위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#F87171',
    hasSkill: false,
  },
  {
    id: 'lee_yangsu',
    name: '이양수',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '정무위',
    role: 'buffer',
    attack: 13,
    defense: 15,
    hp: 90,
    description: '3선 의원. 정무위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#FCA5A5',
    hasSkill: false,
  },
  {
    id: 'lee_cheolgyu',
    name: '이철규',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '산자중기위',
    role: 'economy',
    attack: 15,
    defense: 13,
    hp: 85,
    description: '3선 의원. 산업통상자원중소벤처기업위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#FECACA',
    hasSkill: false,
  },
  {
    id: 'im_ija',
    name: '임이자',
    tier: 'lv2',
    party: 'kuk',
    terms: 3,
    committee: '기재위',
    role: 'economy',
    attack: 14,
    defense: 14,
    hp: 86,
    description: '3선 의원. 기획재정위원회 소속.',
    modelPath: DUMMY_MODEL,
    color: '#FEE2E2',
    hasSkill: false,
  },
];

// Combine all Lv2 politicians
export const LV2_POLITICIANS: Politician[] = [...LV2_MIN_POLITICIANS, ...LV2_KUK_POLITICIANS];

// ===== Lv3: 핵심 중진 (26 types) =====

// 더불어민주당 Lv3 (12명)
export const LV3_MIN_POLITICIANS: Politician[] = [
  {
    id: 'kim_taenyeon',
    name: '김태년',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'buffer',
    attack: 35,
    defense: 28,
    hp: 180,
    description: '5선 의원. 전 원내대표.',
    modelPath: DUMMY_MODEL,
    color: '#1E40AF',
    hasSkill: true,
    skillName: '협상의 달인',
    skillDescription: '아군 전체 방어력 10% 증가',
  },
  {
    id: 'park_jiwon',
    name: '박지원',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'debuffer',
    attack: 40,
    defense: 22,
    hp: 160,
    description: '5선 의원. 전 국정원장.',
    modelPath: DUMMY_MODEL,
    color: '#1E3A8A',
    hasSkill: true,
    skillName: '정보 수집',
    skillDescription: '적 전체 방어력 10% 감소',
  },
  {
    id: 'park_honggeun',
    name: '박홍근',
    tier: 'lv3',
    party: 'min',
    terms: 4,
    role: 'line_dps',
    attack: 42,
    defense: 25,
    hp: 170,
    description: '4선 의원. 전 원내대표.',
    modelPath: DUMMY_MODEL,
    color: '#1D4ED8',
    hasSkill: true,
    skillName: '전선 돌파',
    skillDescription: '일반 몬스터 피해량 15% 증가',
  },
  {
    id: 'seo_younggyo',
    name: '서영교',
    tier: 'lv3',
    party: 'min',
    terms: 4,
    role: 'buffer',
    attack: 32,
    defense: 30,
    hp: 185,
    description: '4선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#2563EB',
    hasSkill: true,
    skillName: '복지 정책',
    skillDescription: '아군 전체 HP 5% 회복',
  },
  {
    id: 'ahn_gyubaek',
    name: '안규백',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'hold',
    attack: 28,
    defense: 38,
    hp: 220,
    description: '5선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#3B82F6',
    hasSkill: true,
    skillName: '철벽 수비',
    skillDescription: '3초간 받는 피해 50% 감소',
  },
  {
    id: 'yoon_hojung',
    name: '윤호중',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'boss_dps',
    attack: 48,
    defense: 20,
    hp: 155,
    description: '5선 의원. 전 원내대표.',
    modelPath: DUMMY_MODEL,
    color: '#60A5FA',
    hasSkill: true,
    skillName: '보스 킬러',
    skillDescription: '보스 몬스터 피해량 20% 증가',
  },
  {
    id: 'lee_inyoung',
    name: '이인영',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'buffer',
    attack: 35,
    defense: 28,
    hp: 175,
    description: '5선 의원. 전 통일부 장관.',
    modelPath: DUMMY_MODEL,
    color: '#93C5FD',
    hasSkill: true,
    skillName: '평화 외교',
    skillDescription: '아군 공격 속도 10% 증가',
  },
  {
    id: 'jung_dongyoung',
    name: '정동영',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'economy',
    attack: 30,
    defense: 32,
    hp: 190,
    description: '5선 의원. 전 통일부 장관, 대선 후보.',
    modelPath: DUMMY_MODEL,
    color: '#BFDBFE',
    hasSkill: true,
    skillName: '경제 활성화',
    skillDescription: '골드 획득량 15% 증가',
  },
  {
    id: 'jung_sungho',
    name: '정성호',
    tier: 'lv3',
    party: 'min',
    terms: 5,
    role: 'economy',
    attack: 32,
    defense: 30,
    hp: 185,
    description: '5선 의원. 전 예결위원장.',
    modelPath: DUMMY_MODEL,
    color: '#DBEAFE',
    hasSkill: true,
    skillName: '예산 관리',
    skillDescription: '유닛 조합 비용 10% 감소',
  },
  {
    id: 'jung_chungrae',
    name: '정청래',
    tier: 'lv3',
    party: 'min',
    terms: 4,
    role: 'debuffer',
    attack: 45,
    defense: 18,
    hp: 145,
    description: '4선 의원. 현 법사위원장.',
    modelPath: DUMMY_MODEL,
    color: '#1E40AF',
    hasSkill: true,
    skillName: '날카로운 질타',
    skillDescription: '적 단일 대상 공격력 20% 감소',
  },
  {
    id: 'cho_jungsik',
    name: '조정식',
    tier: 'lv3',
    party: 'min',
    terms: 6,
    role: 'buffer',
    attack: 38,
    defense: 32,
    hp: 200,
    description: '6선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#1E3A8A',
    hasSkill: true,
    skillName: '원로의 지혜',
    skillDescription: '아군 전체 능력치 5% 증가',
  },
  {
    id: 'chu_miae',
    name: '추미애',
    tier: 'lv3',
    party: 'min',
    terms: 6,
    role: 'boss_dps',
    attack: 50,
    defense: 22,
    hp: 165,
    description: '6선 의원. 전 당대표, 전 법무부 장관.',
    modelPath: DUMMY_MODEL,
    color: '#1D4ED8',
    hasSkill: true,
    skillName: '정의 구현',
    skillDescription: '보스 몬스터 피해량 25% 증가',
  },
];

// 국민의힘 Lv3 (8명)
export const LV3_KUK_POLITICIANS: Politician[] = [
  {
    id: 'kwon_sungdong',
    name: '권성동',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'debuffer',
    attack: 42,
    defense: 24,
    hp: 165,
    description: '5선 의원. 전 원내대표.',
    modelPath: DUMMY_MODEL,
    color: '#B91C1C',
    hasSkill: true,
    skillName: '법적 공세',
    skillDescription: '적 전체 방어력 12% 감소',
  },
  {
    id: 'kwon_youngsae',
    name: '권영세',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'buffer',
    attack: 35,
    defense: 30,
    hp: 185,
    description: '5선 의원. 전 통일부 장관.',
    modelPath: DUMMY_MODEL,
    color: '#991B1B',
    hasSkill: true,
    skillName: '외교 역량',
    skillDescription: '아군 전체 방어력 12% 증가',
  },
  {
    id: 'kim_kihyeon',
    name: '김기현',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'line_dps',
    attack: 45,
    defense: 22,
    hp: 160,
    description: '5선 의원. 전 당대표.',
    modelPath: DUMMY_MODEL,
    color: '#7F1D1D',
    hasSkill: true,
    skillName: '공세 전환',
    skillDescription: '일반 몬스터 피해량 18% 증가',
  },
  {
    id: 'na_kyungwon',
    name: '나경원',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'buffer',
    attack: 38,
    defense: 28,
    hp: 175,
    description: '5선 의원. 전 원내대표.',
    modelPath: DUMMY_MODEL,
    color: '#DC2626',
    hasSkill: true,
    skillName: '리더십',
    skillDescription: '아군 공격력 10% 증가',
  },
  {
    id: 'yoon_sanghyeon',
    name: '윤상현',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'boss_dps',
    attack: 48,
    defense: 20,
    hp: 155,
    description: '5선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#EF4444',
    hasSkill: true,
    skillName: '집중 포화',
    skillDescription: '보스 몬스터 피해량 22% 증가',
  },
  {
    id: 'cho_kyungtae',
    name: '조경태',
    tier: 'lv3',
    party: 'kuk',
    terms: 6,
    role: 'hold',
    attack: 30,
    defense: 40,
    hp: 230,
    description: '6선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#F87171',
    hasSkill: true,
    skillName: '불굴의 의지',
    skillDescription: 'HP 30% 이하 시 방어력 50% 증가',
  },
  {
    id: 'cho_baesuk',
    name: '조배숙',
    tier: 'lv3',
    party: 'kuk',
    terms: 5,
    role: 'buffer',
    attack: 33,
    defense: 32,
    hp: 190,
    description: '5선 의원.',
    modelPath: DUMMY_MODEL,
    color: '#FCA5A5',
    hasSkill: true,
    skillName: '화합의 정치',
    skillDescription: '아군 HP 회복 효과 20% 증가',
  },
  {
    id: 'ju_hoyoung',
    name: '주호영',
    tier: 'lv3',
    party: 'kuk',
    terms: 6,
    role: 'economy',
    attack: 36,
    defense: 34,
    hp: 200,
    description: '6선 의원. 전 원내대표, 전 비대위원장.',
    modelPath: DUMMY_MODEL,
    color: '#FECACA',
    hasSkill: true,
    skillName: '재정 전문가',
    skillDescription: '골드 획득량 18% 증가',
  },
];

// 군소정당·무소속 Lv3 (6명)
export const LV3_MINOR_POLITICIANS: Politician[] = [
  {
    id: 'hwang_unha',
    name: '황운하',
    tier: 'lv3',
    party: 'minor',
    partyDetail: '조국혁신당',
    terms: 2,
    role: 'line_dps',
    attack: 44,
    defense: 22,
    hp: 158,
    description: '조국혁신당 의원. 전 경찰청 대전청장.',
    modelPath: DUMMY_MODEL,
    color: '#F59E0B',
    hasSkill: true,
    skillName: '수사 본능',
    skillDescription: '크리티컬 확률 15% 증가',
  },
  {
    id: 'yoon_jongo',
    name: '윤종오',
    tier: 'lv3',
    party: 'minor',
    partyDetail: '진보당',
    terms: 2,
    role: 'debuffer',
    attack: 40,
    defense: 25,
    hp: 165,
    description: '진보당 의원.',
    modelPath: DUMMY_MODEL,
    color: '#EF4444',
    hasSkill: true,
    skillName: '계급 투쟁',
    skillDescription: '적 보스 공격력 15% 감소',
  },
  {
    id: 'yong_hyein',
    name: '용혜인',
    tier: 'lv3',
    party: 'minor',
    partyDetail: '기본소득당',
    terms: 2,
    role: 'economy',
    attack: 28,
    defense: 30,
    hp: 175,
    description: '기본소득당 의원.',
    modelPath: DUMMY_MODEL,
    color: '#10B981',
    hasSkill: true,
    skillName: '기본소득',
    skillDescription: '웨이브 종료 시 추가 골드 획득',
  },
  {
    id: 'lee_junseok',
    name: '이준석',
    tier: 'lv3',
    party: 'minor',
    partyDetail: '개혁신당',
    terms: 1,
    role: 'line_dps',
    attack: 46,
    defense: 18,
    hp: 150,
    description: '개혁신당 대표. 전 국민의힘 당대표.',
    modelPath: DUMMY_MODEL,
    color: '#6366F1',
    hasSkill: true,
    skillName: 'SNS 공세',
    skillDescription: '공격 시 추가 피해 확률 20%',
  },
  {
    id: 'han_changmin',
    name: '한창민',
    tier: 'lv3',
    party: 'minor',
    partyDetail: '사회민주당',
    terms: 1,
    role: 'buffer',
    attack: 30,
    defense: 32,
    hp: 180,
    description: '사회민주당 의원.',
    modelPath: DUMMY_MODEL,
    color: '#EC4899',
    hasSkill: true,
    skillName: '사회 연대',
    skillDescription: '주변 아군 방어력 8% 증가',
  },
  {
    id: 'woo_wonsik',
    name: '우원식',
    tier: 'lv3',
    party: 'independent',
    terms: 5,
    role: 'hold',
    attack: 32,
    defense: 38,
    hp: 215,
    description: '무소속 의원. 현 국회의장.',
    modelPath: DUMMY_MODEL,
    color: '#6B7280',
    hasSkill: true,
    skillName: '국회 수호',
    skillDescription: '전체 아군 받는 피해 8% 감소',
  },
];

// Combine all Lv3 politicians
export const LV3_POLITICIANS: Politician[] = [
  ...LV3_MIN_POLITICIANS,
  ...LV3_KUK_POLITICIANS,
  ...LV3_MINOR_POLITICIANS,
];

// All politicians combined
export const ALL_POLITICIANS: Politician[] = [
  ...LV1_POLITICIANS,
  ...LV2_POLITICIANS,
  ...LV3_POLITICIANS,
];

// ===== RECIPES =====

// Get all Lv2 politician IDs for random pool
const LV2_IDS = LV2_POLITICIANS.map(p => p.id);

// Lv1 → Lv2 recipes (any 2 Lv1 = random Lv2)
export const LV1_TO_LV2_RECIPES: PoliticianRecipe[] = [
  {
    id: 'lv1_kh_kh',
    materials: ['L1_KH', 'L1_KH'],
    result: 'random_lv2',
    resultPool: LV2_IDS,
  },
  {
    id: 'lv1_dm_dm',
    materials: ['L1_DM', 'L1_DM'],
    result: 'random_lv2',
    resultPool: LV2_IDS,
  },
  {
    id: 'lv1_kh_dm',
    materials: ['L1_KH', 'L1_DM'],
    result: 'random_lv2',
    resultPool: LV2_IDS,
  },
];

// Lv2 → Lv3 recipes (specific combinations)
// 더불어민주당 Lv3
export const LV2_TO_LV3_MIN_RECIPES: PoliticianRecipe[] = [
  { id: 'recipe_kim_taenyeon', materials: ['kim_youngho', 'park_jung', 'L1_DM'], result: 'kim_taenyeon' },
  { id: 'recipe_park_jiwon', materials: ['kwon_chilseung', 'park_chandae', 'L1_DM'], result: 'park_jiwon' },
  { id: 'recipe_park_honggeun', materials: ['kim_sunghwan', 'park_jumin', 'L1_DM'], result: 'park_honggeun' },
  { id: 'recipe_seo_younggyo', materials: ['kwon_chilseung', 'kim_byungki', 'L1_DM'], result: 'seo_younggyo' },
  { id: 'recipe_ahn_gyubaek', materials: ['kim_jungho', 'park_chandae', 'L1_DM'], result: 'ahn_gyubaek' },
  { id: 'recipe_yoon_hojung', materials: ['kim_yoondeok', 'park_jumin', 'L1_DM'], result: 'yoon_hojung' },
  { id: 'recipe_lee_inyoung', materials: ['kim_gyoheung', 'kim_youngjin', 'L1_DM'], result: 'lee_inyoung' },
  { id: 'recipe_jung_dongyoung', materials: ['kim_byungki', 'kim_youngjin', 'L1_DM'], result: 'jung_dongyoung' },
  { id: 'recipe_jung_sungho', materials: ['kim_sunghwan', 'maeng_sunggyu', 'L1_DM'], result: 'jung_sungho' },
  { id: 'recipe_jung_chungrae', materials: ['kim_byungki', 'park_jumin', 'L1_DM'], result: 'jung_chungrae' },
  { id: 'recipe_cho_jungsik', materials: ['kim_sunghwan', 'seo_samseok', 'L1_DM'], result: 'cho_jungsik' },
  { id: 'recipe_chu_miae', materials: ['kim_youngjin', 'kim_yoondeok', 'L1_DM'], result: 'chu_miae' },
];

// 국민의힘 Lv3
export const LV2_TO_LV3_KUK_RECIPES: PoliticianRecipe[] = [
  { id: 'recipe_kwon_sungdong', materials: ['kim_sungwon', 'song_seokjun', 'L1_KH'], result: 'kwon_sungdong' },
  { id: 'recipe_kwon_youngsae', materials: ['kim_heejung', 'im_ija', 'L1_KH'], result: 'kwon_youngsae' },
  { id: 'recipe_kim_kihyeon', materials: ['kim_seokki', 'kim_jungjae', 'L1_KH'], result: 'kim_kihyeon' },
  { id: 'recipe_na_kyungwon', materials: ['kim_seokki', 'im_ija', 'L1_KH'], result: 'na_kyungwon' },
  { id: 'recipe_yoon_sanghyeon', materials: ['kim_heejung', 'shin_sungbeom', 'L1_KH'], result: 'yoon_sanghyeon' },
  { id: 'recipe_cho_kyungtae', materials: ['song_seokjun', 'lee_manhee', 'L1_KH'], result: 'cho_kyungtae' },
  { id: 'recipe_cho_baesuk', materials: ['shin_sungbeom', 'im_ija', 'L1_KH'], result: 'cho_baesuk' },
  { id: 'recipe_ju_hoyoung', materials: ['kim_jungjae', 'yoon_hanhong', 'L1_KH'], result: 'ju_hoyoung' },
];

// 군소정당·무소속 Lv3
export const LV2_TO_LV3_MINOR_RECIPES: PoliticianRecipe[] = [
  { id: 'recipe_hwang_unha', materials: ['kwon_chilseung', 'kim_seokki', 'L1_DM'], result: 'hwang_unha' },
  { id: 'recipe_yoon_jongo', materials: ['kim_gyoheung', 'kim_sungwon', 'L1_DM'], result: 'yoon_jongo' },
  { id: 'recipe_yong_hyein', materials: ['kim_byungki', 'kim_jungjae', 'L1_DM'], result: 'yong_hyein' },
  { id: 'recipe_lee_junseok', materials: ['kim_sunghwan', 'kim_heejung', 'L1_KH'], result: 'lee_junseok' },
  { id: 'recipe_han_changmin', materials: ['kim_youngjin', 'sung_iljong', 'L1_DM'], result: 'han_changmin' },
  { id: 'recipe_woo_wonsik', materials: ['kim_youngho', 'song_seokjun', 'L1_DM'], result: 'woo_wonsik' },
];

// All Lv2 → Lv3 recipes
export const LV2_TO_LV3_RECIPES: PoliticianRecipe[] = [
  ...LV2_TO_LV3_MIN_RECIPES,
  ...LV2_TO_LV3_KUK_RECIPES,
  ...LV2_TO_LV3_MINOR_RECIPES,
];

// All recipes combined
export const ALL_RECIPES: PoliticianRecipe[] = [
  ...LV1_TO_LV2_RECIPES,
  ...LV2_TO_LV3_RECIPES,
];

// ===== Helper Functions =====

export function getPoliticianById(id: string): Politician | undefined {
  return ALL_POLITICIANS.find(p => p.id === id);
}

export function getPoliticiansByTier(tier: PoliticianTier): Politician[] {
  return ALL_POLITICIANS.filter(p => p.tier === tier);
}

export function getPoliticiansByParty(party: Party): Politician[] {
  return ALL_POLITICIANS.filter(p => p.party === party);
}

export function getRecipeByResult(resultId: string): PoliticianRecipe | undefined {
  return ALL_RECIPES.find(r => r.result === resultId);
}

export function getRecipesByMaterial(materialId: string): PoliticianRecipe[] {
  return ALL_RECIPES.filter(r => r.materials.includes(materialId));
}

// Find matching recipe for given materials (order doesn't matter)
export function findMatchingRecipe(materialIds: string[]): PoliticianRecipe | undefined {
  const sortedInput = [...materialIds].sort();

  return ALL_RECIPES.find(recipe => {
    const sortedRecipe = [...recipe.materials].sort();
    if (sortedInput.length !== sortedRecipe.length) return false;
    return sortedInput.every((id, index) => id === sortedRecipe[index]);
  });
}

// Execute combination and return result politician
export function executeCombination(materialIds: string[]): Politician | null {
  const recipe = findMatchingRecipe(materialIds);
  if (!recipe) return null;

  if (recipe.result === 'random_lv2' && recipe.resultPool) {
    // Random selection from pool
    const randomIndex = Math.floor(Math.random() * recipe.resultPool.length);
    const resultId = recipe.resultPool[randomIndex];
    return getPoliticianById(resultId) || null;
  }

  return getPoliticianById(recipe.result) || null;
}
