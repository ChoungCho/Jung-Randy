// ===== WAVE SYSTEM HOOK =====
import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { MonsterData, GameState, SelectionTarget } from '../types';
import { LANE_OFFSET } from '../constants';
import { getMonsterStatsForWave, WAVE_CONFIG, getMonstersPerWave, getSpawnIntervalForWave, isBossWave } from '../gameData';

interface UseWaveSystemReturn {
  // Game state
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  currentWave: number;
  monstersSpawnedInWave: number;
  monstersKilledInWave: number;
  totalMonstersKilled: number;

  // Monsters
  monsters: MonsterData[];
  setMonsters: React.Dispatch<React.SetStateAction<MonsterData[]>>;
  monsterPosRefs: React.MutableRefObject<Map<string, THREE.Vector3>>;

  // Callbacks
  handleMonsterDeath: (id: string) => void;
  handleAttackMonster: (attackerId: string, monsterId: string, damage: number) => void;
  handleRestart: () => void;
}

export function useWaveSystem(selectionTarget: SelectionTarget, setSelectionTarget: (target: SelectionTarget) => void): UseWaveSystemReturn {
  // Game state
  const [gameState, setGameState] = useState<GameState>('playing');
  const [currentWave, setCurrentWave] = useState(1);
  const [monstersSpawnedInWave, setMonstersSpawnedInWave] = useState(0);
  const [monstersKilledInWave, setMonstersKilledInWave] = useState(0);
  const [totalMonstersKilled, setTotalMonstersKilled] = useState(0);

  // Monster state
  const [monsters, setMonsters] = useState<MonsterData[]>([]);
  const monsterPosRefs = useRef<Map<string, THREE.Vector3>>(new Map());

  // Refs for tracking
  const monsterIdCounterRef = useRef(0);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waveTransitioningRef = useRef(false);

  // Create a monster with wave-based stats
  const createMonster = useCallback((wave: number, isBoss: boolean = false): MonsterData => {
    const stats = getMonsterStatsForWave(wave);
    const id = isBoss ? `boss-${monsterIdCounterRef.current++}` : `monster-${monsterIdCounterRef.current++}`;
    monsterPosRefs.current.set(id, new THREE.Vector3(-LANE_OFFSET, 0, -LANE_OFFSET));
    return {
      id,
      hp: stats.hp,
      maxHp: stats.hp,
      defense: stats.defense,
      damage: stats.damage,
      wave,
      sizeMultiplier: stats.sizeMultiplier,
      progress: 0,
      isDying: false,
      isBoss,
    };
  }, []);

  // Spawn monsters for current wave
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (currentWave > WAVE_CONFIG.totalWaves) return;

    // Reset counters for new wave
    setMonstersSpawnedInWave(0);
    setMonstersKilledInWave(0);

    // Check if this is a boss wave
    const isBoss = isBossWave(currentWave);
    let cancelled = false; // Declare cancelled outside if/else for cleanup

    if (isBoss) {
      // Boss wave: spawn only 1 boss monster
      const bossMonster = createMonster(currentWave, true);
      setMonsters(prev => [...prev, bossMonster]);
      setMonstersSpawnedInWave(1);
    } else {
      // Normal wave: spawn regular monsters
      const monstersForThisWave = getMonstersPerWave(currentWave);
      const spawnIntervalForThisWave = getSpawnIntervalForWave(currentWave);

      // Start spawning monsters
      let spawned = 0;

      const spawnNext = () => {
        if (cancelled) return;
        if (spawned >= monstersForThisWave) {
          return;
        }
        const newMonster = createMonster(currentWave, false);
        setMonsters(prev => [...prev, newMonster]);
        spawned++;
        setMonstersSpawnedInWave(spawned);

        if (spawned < monstersForThisWave) {
          spawnTimerRef.current = setTimeout(spawnNext, spawnIntervalForThisWave);
        }
      };

      // Start spawning after a small delay
      spawnTimerRef.current = setTimeout(spawnNext, 500);
    }

    return () => {
      cancelled = true;
      if (spawnTimerRef.current) {
        clearTimeout(spawnTimerRef.current);
      }
    };
  }, [currentWave, gameState, createMonster]);

  // Check for wave completion
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (waveTransitioningRef.current) return;
    
    const isBoss = isBossWave(currentWave);
    const monstersForThisWave = isBoss ? 1 : getMonstersPerWave(currentWave);
    
    if (monstersKilledInWave >= monstersForThisWave && monstersSpawnedInWave >= monstersForThisWave) {
      if (currentWave >= WAVE_CONFIG.totalWaves) {
        setGameState('gameover');
      } else {
        waveTransitioningRef.current = true;
        setTimeout(() => {
          waveTransitioningRef.current = false;
          setCurrentWave(currentWave + 1);
        }, WAVE_CONFIG.waveDelay);
      }
    }
  }, [monstersKilledInWave, monstersSpawnedInWave, currentWave, gameState]);

  // Attack monster (called when character attack animation finishes)
  const handleAttackMonster = useCallback((_attackerId: string, monsterId: string, damage: number) => {
    setMonsters(prev => prev.map(m => {
      if (m.id !== monsterId || m.isDying) return m;
      const newHp = Math.max(0, m.hp - damage);
      if (newHp <= 0) {
        return { ...m, hp: 0, isDying: true };
      }
      return { ...m, hp: newHp };
    }));
  }, []);

  // Monster death callback
  const handleMonsterDeath = useCallback((id: string) => {
    setMonsters(prev => prev.filter(m => m.id !== id));
    monsterPosRefs.current.delete(id);
    setMonstersKilledInWave(prev => prev + 1);
    setTotalMonstersKilled(prev => prev + 1);

    // If the dead monster was selected, clear selection
    if (selectionTarget?.type === 'monster' && selectionTarget.id === id) {
      setSelectionTarget(null);
    }
  }, [selectionTarget, setSelectionTarget]);

  // Restart game
  const handleRestart = useCallback(() => {
    waveTransitioningRef.current = false;
    setGameState('playing');
    setCurrentWave(0);
    setMonstersSpawnedInWave(0);
    setMonstersKilledInWave(0);
    setTotalMonstersKilled(0);
    setMonsters([]);
    monsterPosRefs.current.clear();
    monsterIdCounterRef.current = 0;
    setTimeout(() => setCurrentWave(1), 100);
  }, []);

  return {
    gameState,
    setGameState,
    currentWave,
    monstersSpawnedInWave,
    monstersKilledInWave,
    totalMonstersKilled,
    monsters,
    setMonsters,
    monsterPosRefs,
    handleMonsterDeath,
    handleAttackMonster,
    handleRestart,
  };
}
