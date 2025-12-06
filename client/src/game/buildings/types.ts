// ===== BUILDING TYPES =====

export type BuildingType = 'gacha' | 'upgrade' | 'quest';

export interface BuildingData {
  id: BuildingType;
  name: string;
  description: string;
  icon: string;
  glbPath: string;
}

export const BUILDINGS: Record<BuildingType, BuildingData> = {
  gacha: {
    id: 'gacha',
    name: '공천위원회',
    description: '당심으로 후보를 정합니다.',
    icon: '🏛️',
    glbPath: '/assets/terrain/third_platform_national_assembly.glb',
  },
  upgrade: {
    id: 'upgrade',
    name: '정치스쿨',
    description: '역량을 갈고닦아 차기 승진을 노리세요.',
    icon: '🎓',
    glbPath: '/assets/terrain/third_platform_blue_house.glb',
  },
  quest: {
    id: 'quest',
    name: '출마 캠프',
    description: '선거는 곧 보스전! 난이도별로 보상을 챙기세요.',
    icon: '🗳️',
    glbPath: '/assets/terrain/third_platform_gyeongbokgung_gate.glb',
  },
};

// Building order on the platform (left to right)
export const BUILDING_ORDER: BuildingType[] = ['gacha', 'upgrade', 'quest'];
