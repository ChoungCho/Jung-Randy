// ===== CHARACTER SYSTEM HOOK =====
import { useState, useCallback } from 'react';
import * as THREE from 'three';
import { CharacterData, SelectionTarget, MoveIndicatorData } from '../types';
import { LANE_OFFSET } from '../constants';
import { getCharacterStats } from '../gameData';

interface UseCharacterSystemReturn {
  // Characters
  characters: CharacterData[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterData[]>>;
  spawnCount: number;

  // Selection
  selectedCharacterIds: Set<string>;
  setSelectedCharacterIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectionTarget: SelectionTarget;
  setSelectionTarget: React.Dispatch<React.SetStateAction<SelectionTarget>>;
  selectionBox: { start: { x: number; y: number }; end: { x: number; y: number } } | null;
  setSelectionBox: React.Dispatch<React.SetStateAction<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>>;

  // Move indicators
  moveIndicators: MoveIndicatorData[];
  setMoveIndicators: React.Dispatch<React.SetStateAction<MoveIndicatorData[]>>;

  // Callbacks
  spawnCharacter: () => void;
  handleSelectCharacter: (id: string, addToSelection: boolean) => void;
  handleSelectSingleCharacter: (id: string) => void;
  handleSelectMonster: (id: string) => void;
  handleMoveCommand: (position: THREE.Vector3) => void;
  handleIndicatorComplete: (id: string) => void;
  handleUseActiveSkill: (charId: string) => void;
  handleStateChange: (charId: string, state: CharacterData['state']) => void;
}

export function useCharacterSystem(): UseCharacterSystemReturn {
  // Character state
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [spawnCount, setSpawnCount] = useState(0);

  // Selection state
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<Set<string>>(new Set());
  const [selectionTarget, setSelectionTarget] = useState<SelectionTarget>(null);
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);

  // Move indicators
  const [moveIndicators, setMoveIndicators] = useState<MoveIndicatorData[]>([]);

  // Handle move command - create indicator effect
  const handleMoveCommand = useCallback((position: THREE.Vector3) => {
    const newIndicator: MoveIndicatorData = {
      id: `move-${Date.now()}`,
      position,
      startTime: Date.now()
    };
    setMoveIndicators(prev => [...prev, newIndicator]);
  }, []);

  // Remove completed indicator
  const handleIndicatorComplete = useCallback((id: string) => {
    setMoveIndicators(prev => prev.filter(ind => ind.id !== id));
  }, []);

  // Spawn character
  const spawnCharacter = useCallback(() => {
    const type = (spawnCount % 2) + 1 as 1 | 2;
    const stats = getCharacterStats(type);
    const innerBound = LANE_OFFSET - 1.5;
    const spawnX = (Math.random() - 0.5) * innerBound * 1.5;
    const spawnZ = (Math.random() - 0.5) * innerBound * 1.5;

    const newChar: CharacterData = {
      id: `char-${Date.now()}`,
      type,
      position: new THREE.Vector3(spawnX, 0, spawnZ),
      targetPosition: null,
      waypointQueue: [],
      state: 'idle',
      lastAttackTime: 0,
      lastActiveSkillTime: -10000, // Allow immediate use
      stats,
      currentHp: stats.maxHp,
    };

    setCharacters(prev => [...prev, newChar]);
    setSpawnCount(prev => prev + 1);
  }, [spawnCount]);

  // Select character
  const handleSelectCharacter = useCallback((id: string, addToSelection: boolean) => {
    // Clear monster selection when selecting character
    setSelectionTarget(null);
    if (addToSelection) {
      setSelectedCharacterIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } else {
      setSelectedCharacterIds(new Set([id]));
    }
  }, []);

  // Select single character from multi-select panel
  const handleSelectSingleCharacter = useCallback((id: string) => {
    setSelectedCharacterIds(new Set([id]));
  }, []);

  // Select monster
  const handleSelectMonster = useCallback((id: string) => {
    setSelectedCharacterIds(new Set()); // Clear character selection
    setSelectionTarget({ type: 'monster', id });
  }, []);

  // Use active skill
  const handleUseActiveSkill = useCallback((charId: string) => {
    setCharacters(prev => prev.map(c => {
      if (c.id !== charId) return c;
      const skill = c.stats.skills.active;
      if (!skill) return c;
      if (Date.now() - c.lastActiveSkillTime < skill.cooldown) return c;
      return {
        ...c,
        lastActiveSkillTime: Date.now(),
        state: 'active_skill' as const,
        targetPosition: null,
      };
    }));
  }, []);

  // Handle character state changes
  const handleStateChange = useCallback((charId: string, state: CharacterData['state']) => {
    setCharacters(prev => prev.map(c => {
      if (c.id !== charId) return c;
      return { ...c, state };
    }));
  }, []);

  return {
    characters,
    setCharacters,
    spawnCount,
    selectedCharacterIds,
    setSelectedCharacterIds,
    selectionTarget,
    setSelectionTarget,
    selectionBox,
    setSelectionBox,
    moveIndicators,
    setMoveIndicators,
    spawnCharacter,
    handleSelectCharacter,
    handleSelectSingleCharacter,
    handleSelectMonster,
    handleMoveCommand,
    handleIndicatorComplete,
    handleUseActiveSkill,
    handleStateChange,
  };
}
