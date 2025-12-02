import { useState, useMemo } from 'react';
import { Users, Shuffle, ArrowRight, Shield, Crown, Info } from 'lucide-react';
import politiciansData from '@/game/data/politicians.json';
import recipesData from '@/game/data/recipes.json';

const DM_COLOR = "bg-blue-600";
const KH_COLOR = "bg-red-600";
const MINOR_COLOR = "bg-gray-600";
const REFORM_COLOR = "bg-orange-500";
const JINBO_COLOR = "bg-red-800";
const KOREA_COLOR = "bg-blue-800";

type Party = 'DM' | 'KH' | 'MINOR' | 'REFORM' | 'JINBO' | 'KOREA' | 'BASIC' | 'INDEP';

interface Unit {
  name: string;
  party: Party;
  role?: string;
  desc?: string;
}

interface Recipe {
  target: Unit;
  materials: string[];
  base: 'L1_DM' | 'L1_KH';
}

// Map partyDetail to Party type for minor politicians
const getMinorParty = (partyDetail?: string): Party => {
  if (!partyDetail) return 'MINOR';
  if (partyDetail.includes('조국혁신')) return 'KOREA';
  if (partyDetail.includes('진보')) return 'JINBO';
  if (partyDetail.includes('개혁')) return 'REFORM';
  if (partyDetail.includes('무소속')) return 'INDEP';
  return 'MINOR';
};

// Get politician name by ID
const getPoliticianName = (id: string): string => {
  // Check Lv1
  const lv1 = politiciansData.lv1.find(p => p.id === id);
  if (lv1) return lv1.name;

  // Check Lv2
  const lv2Min = politiciansData.lv2.min.find(p => p.id === id);
  if (lv2Min) return lv2Min.name;
  const lv2Kuk = politiciansData.lv2.kuk.find(p => p.id === id);
  if (lv2Kuk) return lv2Kuk.name;

  // Check Lv3
  const lv3Min = politiciansData.lv3.min.find(p => p.id === id);
  if (lv3Min) return lv3Min.name;
  const lv3Kuk = politiciansData.lv3.kuk.find(p => p.id === id);
  if (lv3Kuk) return lv3Kuk.name;
  const lv3Minor = politiciansData.lv3.minor.find(p => p.id === id);
  if (lv3Minor) return lv3Minor.name;

  return id;
};

// Get Lv3 politician info
const getLv3Info = (id: string) => {
  const lv3Min = politiciansData.lv3.min.find(p => p.id === id);
  if (lv3Min) return { ...lv3Min, party: 'DM' as Party };

  const lv3Kuk = politiciansData.lv3.kuk.find(p => p.id === id);
  if (lv3Kuk) return { ...lv3Kuk, party: 'KH' as Party };

  const lv3Minor = politiciansData.lv3.minor.find(p => p.id === id);
  if (lv3Minor) return { ...lv3Minor, party: getMinorParty(lv3Minor.partyDetail) };

  return null;
};

const RecipesGuide = () => {
  const [activeTab, setActiveTab] = useState<'lv1' | 'lv2' | 'lv3'>('lv3');

  // Generate data from JSON
  const { lv2_dm, lv2_kh, lv2Total, lv3_recipes_dm, lv3_recipes_kh, lv3_recipes_minor } = useMemo(() => {
    // Lv2 lists
    const lv2_dm: Unit[] = politiciansData.lv2.min.map(p => ({
      name: p.name,
      party: 'DM' as Party,
      role: p.committee,
    }));

    const lv2_kh: Unit[] = politiciansData.lv2.kuk.map(p => ({
      name: p.name,
      party: 'KH' as Party,
      role: p.committee,
    }));

    const lv2Total = lv2_dm.length + lv2_kh.length;

    // Lv3 recipes - Democratic
    const lv3_recipes_dm: Recipe[] = recipesData.lv2_to_lv3.min.map(r => {
      const resultInfo = getLv3Info(r.result);
      const lv2Materials = r.materials.filter(m => !m.startsWith('L1_'));
      const lv1Material = r.materials.find(m => m.startsWith('L1_')) as 'L1_DM' | 'L1_KH';

      return {
        target: {
          name: resultInfo?.name || r.result,
          party: 'DM' as Party,
          desc: resultInfo ? `${resultInfo.terms}선` : '',
        },
        materials: lv2Materials.map(getPoliticianName),
        base: lv1Material,
      };
    });

    // Lv3 recipes - PPP
    const lv3_recipes_kh: Recipe[] = recipesData.lv2_to_lv3.kuk.map(r => {
      const resultInfo = getLv3Info(r.result);
      const lv2Materials = r.materials.filter(m => !m.startsWith('L1_'));
      const lv1Material = r.materials.find(m => m.startsWith('L1_')) as 'L1_DM' | 'L1_KH';

      return {
        target: {
          name: resultInfo?.name || r.result,
          party: 'KH' as Party,
          desc: resultInfo ? `${resultInfo.terms}선` : '',
        },
        materials: lv2Materials.map(getPoliticianName),
        base: lv1Material,
      };
    });

    // Lv3 recipes - Minor parties
    const lv3_recipes_minor: Recipe[] = recipesData.lv2_to_lv3.minor.map(r => {
      const resultInfo = getLv3Info(r.result);
      const lv2Materials = r.materials.filter(m => !m.startsWith('L1_'));
      const lv1Material = r.materials.find(m => m.startsWith('L1_')) as 'L1_DM' | 'L1_KH';

      return {
        target: {
          name: resultInfo?.name || r.result,
          party: resultInfo?.party || 'MINOR',
          desc: (resultInfo as { partyDetail?: string })?.partyDetail || '',
        },
        materials: lv2Materials.map(getPoliticianName),
        base: lv1Material,
      };
    });

    return { lv2_dm, lv2_kh, lv2Total, lv3_recipes_dm, lv3_recipes_kh, lv3_recipes_minor };
  }, []);

  // Get material party from politician name
  const getMaterialParty = (name: string): 'DM' | 'KH' => {
    if (lv2_dm.some(u => u.name === name)) return 'DM';
    return 'KH';
  };

  // --- Helper Components ---
  const PartyBadge = ({ party }: { party: Party }) => {
    let color = "bg-gray-500";
    let text = "";

    switch(party) {
      case 'DM': color = DM_COLOR; text = "민주"; break;
      case 'KH': color = KH_COLOR; text = "국힘"; break;
      case 'REFORM': color = REFORM_COLOR; text = "개혁"; break;
      case 'KOREA': color = KOREA_COLOR; text = "조국"; break;
      case 'JINBO': color = JINBO_COLOR; text = "진보"; break;
      case 'INDEP': color = "bg-gray-500"; text = "무소속"; break;
      case 'BASIC': color = "bg-slate-600"; text = "기초"; break;
      default: color = MINOR_COLOR; text = "군소";
    }

    return (
      <span className={`${color} text-white text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap`}>
        {text}
      </span>
    );
  };

  const Lv1Badge = ({ type }: { type: 'L1_DM' | 'L1_KH' }) => (
    <div className={`flex items-center gap-1 px-2 py-1 rounded border ${type === 'L1_DM' ? 'border-blue-400 bg-blue-900/30 text-blue-200' : 'border-red-400 bg-red-900/30 text-red-200'}`}>
      <Users size={12} />
      <span className="text-xs font-bold">{type === 'L1_DM' ? '민주 지지층' : '국힘 지지층'}</span>
    </div>
  );

  const Lv2Card = ({ name, party }: { name: string, party: 'DM' | 'KH' }) => (
    <div className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border ${party === 'DM' ? 'border-blue-600 bg-blue-900/40' : 'border-red-600 bg-red-900/40'}`}>
      <span className={`w-2 h-2 rounded-full ${party === 'DM' ? 'bg-blue-400' : 'bg-red-400'}`}></span>
      <span className="text-xs text-gray-200 font-medium">{name}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900 text-gray-100 p-6 font-sans overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 text-transparent bg-clip-text">
            정랜디 (PRD) 조합 가이드 v1
          </h1>
          <p className="text-slate-400 text-sm">Politician Random Defense - Combination Formula</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'lv1', label: 'Lv1 ~ Lv2 기초' },
            { id: 'lv2', label: 'Lv2 유닛 목록' },
            { id: 'lv3', label: 'Lv3 조합식 (핵심)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'lv1' | 'lv2' | 'lv3')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 min-h-[500px]">

          {/* TAB: Lv1 -> Lv2 */}
          {activeTab === 'lv1' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shuffle className="text-green-400" />
                기초 조합 (Random Synthesis)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Recipe 1 */}
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-16 h-20 bg-red-900/50 border border-red-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-red-400 mb-1"/>
                        <span className="text-xs text-red-200">국힘</span>
                        <span className="text-[10px] text-slate-400">Lv1</span>
                      </div>
                      <div className="flex items-center text-slate-500">+</div>
                      <div className="w-16 h-20 bg-red-900/50 border border-red-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-red-400 mb-1"/>
                        <span className="text-xs text-red-200">국힘</span>
                        <span className="text-[10px] text-slate-400">Lv1</span>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-500 rotate-90 md:rotate-0" />
                    <div className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-center">
                      <p className="font-bold text-gray-200">랜덤 Lv2 의원</p>
                      <p className="text-xs text-slate-500 mt-1">({lv2Total}종 중 1명)</p>
                    </div>
                 </div>

                 {/* Recipe 2 */}
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-16 h-20 bg-blue-900/50 border border-blue-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-blue-400 mb-1"/>
                        <span className="text-xs text-blue-200">민주</span>
                        <span className="text-[10px] text-slate-400">Lv1</span>
                      </div>
                      <div className="flex items-center text-slate-500">+</div>
                      <div className="w-16 h-20 bg-blue-900/50 border border-blue-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-blue-400 mb-1"/>
                        <span className="text-xs text-blue-200">민주</span>
                        <span className="text-[10px] text-slate-400">Lv1</span>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-500 rotate-90 md:rotate-0" />
                    <div className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-center">
                      <p className="font-bold text-gray-200">랜덤 Lv2 의원</p>
                      <p className="text-xs text-slate-500 mt-1">({lv2Total}종 중 1명)</p>
                    </div>
                 </div>

                 {/* Recipe 3 */}
                 <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-16 h-20 bg-red-900/50 border border-red-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-red-400 mb-1"/>
                        <span className="text-xs text-red-200">국힘</span>
                      </div>
                      <div className="flex items-center text-slate-500">+</div>
                      <div className="w-16 h-20 bg-blue-900/50 border border-blue-500 rounded flex flex-col items-center justify-center">
                        <Users size={20} className="text-blue-400 mb-1"/>
                        <span className="text-xs text-blue-200">민주</span>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-500 rotate-90 md:rotate-0" />
                    <div className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-center">
                      <p className="font-bold text-gray-200">랜덤 Lv2 의원</p>
                      <p className="text-xs text-slate-500 mt-1">({lv2Total}종 중 1명)</p>
                    </div>
                 </div>
              </div>

              <div className="bg-indigo-900/30 p-4 rounded border border-indigo-500/30 text-center text-indigo-200 text-sm">
                <Info size={16} className="inline mr-2 mb-1"/>
                어떤 Lv1 카드 2장을 섞어도 결과는 무조건 <strong>전체 Lv2 풀({lv2Total}명) 중 랜덤 1명</strong>입니다.
              </div>
            </div>
          )}

          {/* TAB: Lv2 List */}
          {activeTab === 'lv2' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="text-yellow-400" />
                Lv2 일반 의원 목록 ({lv2Total}종)
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Democratic List */}
                <div className="bg-blue-950/30 rounded-xl p-4 border border-blue-800">
                  <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    더불어민주당 ({lv2_dm.length}명)
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {lv2_dm.map((unit, idx) => (
                      <div key={idx} className="bg-slate-800 p-2 rounded flex justify-between items-center text-sm hover:bg-slate-700 transition-colors">
                        <span className="text-gray-200">{unit.name}</span>
                        <span className="text-[10px] text-slate-500">{unit.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PPP List */}
                <div className="bg-red-950/30 rounded-xl p-4 border border-red-800">
                  <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    국민의힘 ({lv2_kh.length}명)
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {lv2_kh.map((unit, idx) => (
                      <div key={idx} className="bg-slate-800 p-2 rounded flex justify-between items-center text-sm hover:bg-slate-700 transition-colors">
                        <span className="text-gray-200">{unit.name}</span>
                        <span className="text-[10px] text-slate-500">{unit.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Lv3 Recipes */}
          {activeTab === 'lv3' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Crown className="text-purple-400" />
                  Lv3 핵심 중진 조합식 ({lv3_recipes_dm.length + lv3_recipes_kh.length + lv3_recipes_minor.length}종)
                </h2>
                <span className="text-xs text-slate-400">Lv2 A + Lv2 B + Lv1(재료) = Lv3</span>
              </div>

              {/* Democratic Section */}
              <div className="space-y-4">
                <h3 className="text-blue-400 font-bold border-b border-blue-900 pb-2">더불어민주당 계열 ({lv3_recipes_dm.length}명)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {lv3_recipes_dm.map((recipe, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg flex flex-col gap-2 hover:border-blue-600 transition-colors group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white group-hover:text-blue-400">{recipe.target.name}</span>
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{recipe.target.desc}</span>
                        </div>
                        <PartyBadge party='DM' />
                      </div>
                      <div className="h-px bg-slate-700/50 w-full"></div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Lv2Card name={recipe.materials[0]} party='DM' />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv2Card name={recipe.materials[1]} party='DM' />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv1Badge type={recipe.base} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PPP Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-red-400 font-bold border-b border-red-900 pb-2">국민의힘 계열 ({lv3_recipes_kh.length}명)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {lv3_recipes_kh.map((recipe, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg flex flex-col gap-2 hover:border-red-600 transition-colors group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white group-hover:text-red-400">{recipe.target.name}</span>
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{recipe.target.desc}</span>
                        </div>
                        <PartyBadge party='KH' />
                      </div>
                      <div className="h-px bg-slate-700/50 w-full"></div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Lv2Card name={recipe.materials[0]} party='KH' />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv2Card name={recipe.materials[1]} party='KH' />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv1Badge type={recipe.base} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minor/Indep Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-yellow-400 font-bold border-b border-yellow-900/30 pb-2">군소정당 및 무소속 ({lv3_recipes_minor.length}명)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {lv3_recipes_minor.map((recipe, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg flex flex-col gap-2 hover:border-yellow-600 transition-colors group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white group-hover:text-yellow-400">{recipe.target.name}</span>
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 truncate max-w-[80px]">{recipe.target.desc}</span>
                        </div>
                        <PartyBadge party={recipe.target.party} />
                      </div>
                      <div className="h-px bg-slate-700/50 w-full"></div>
                      <div className="flex items-center flex-wrap gap-1.5 text-sm">
                        <Lv2Card name={recipe.materials[0]} party={getMaterialParty(recipe.materials[0])} />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv2Card name={recipe.materials[1]} party={getMaterialParty(recipe.materials[1])} />
                        <span className="text-slate-500 text-xs">+</span>
                        <Lv1Badge type={recipe.base} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        <div className="text-center text-slate-500 text-xs">
           Jeong-Ran-Di Data Visualization v1.0
        </div>
      </div>
    </div>
  );
};

export default RecipesGuide;
