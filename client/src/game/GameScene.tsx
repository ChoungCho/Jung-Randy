// ===== MAIN GAME SCENE =====
// Modular entry point - all logic is split into separate modules
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Terrain
import { Platform } from './terrain';

// Entities
import { Character, Monster } from './entities';

// Components
import { MoveIndicator } from './components';

// Controllers
import { RTSCameraController, SelectionHandler } from './controllers';

// UI
import {
  StatusPanel,
  WaveInfo,
  GameOverOverlay,
  ControlsPanel,
  SpawnButton,
  SelectionBox,
} from './ui';

// Chat
import { ChatBox } from '../chat';

// Hooks
import { useWaveSystem, useCharacterSystem } from './hooks';

// Constants
import { LANE_OFFSET } from './constants';

export default function GameScene() {
  // Character system (selection, spawning, movement)
  const {
    characters,
    spawnCount,
    selectedCharacterIds,
    setSelectedCharacterIds,
    selectionTarget,
    setSelectionTarget,
    selectionBox,
    setSelectionBox,
    moveIndicators,
    spawnCharacter,
    handleSelectCharacter,
    handleSelectSingleCharacter,
    handleSelectAllSameType,
    handleSelectMonster,
    handleMoveCommand,
    handleIndicatorComplete,
    handleUseActiveSkill,
    handleStateChange,
    handleStopCommand,
    handleSaveGroup,
    handleSelectGroup,
  } = useCharacterSystem();

  // Wave system (monsters, waves, game state)
  const {
    gameState,
    currentWave,
    monstersSpawnedInWave,
    monstersKilledInWave,
    totalMonstersKilled,
    monsters,
    monsterPosRefs,
    handleMonsterDeath,
    handleAttackMonster,
    handleRestart,
  } = useWaveSystem(selectionTarget, setSelectionTarget);

  // Sync selection target with selectedCharacterIds
  useEffect(() => {
    if (selectedCharacterIds.size > 0) {
      setSelectionTarget({ type: 'character', ids: Array.from(selectedCharacterIds) });
    } else if (selectionTarget?.type === 'character') {
      setSelectionTarget(null);
    }
  }, [selectedCharacterIds, selectionTarget, setSelectionTarget]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      {/* Selection Box Overlay */}
      <SelectionBox selectionBox={selectionBox} />

      {/* Game Over Overlay */}
      {gameState === 'gameover' && (
        <GameOverOverlay
          totalMonstersKilled={totalMonstersKilled}
          onRestart={handleRestart}
        />
      )}

      {/* Top UI - Wave Info */}
      <WaveInfo
        currentWave={currentWave}
        monstersKilledInWave={monstersKilledInWave}
        monstersSpawnedInWave={monstersSpawnedInWave}
      />

      {/* Left UI Panel */}
      <ControlsPanel
        characters={characters}
        monsters={monsters}
        totalMonstersKilled={totalMonstersKilled}
      />

      {/* Spawn Button */}
      <SpawnButton
        spawnCount={spawnCount}
        onSpawn={spawnCharacter}
      />

      {/* Status Panel */}
      <StatusPanel
        selectionTarget={selectionTarget}
        characters={characters}
        monsters={monsters}
        onUseActiveSkill={handleUseActiveSkill}
        onSelectCharacter={handleSelectSingleCharacter}
      />

      {/* Chat Box */}
      <ChatBox
        onSendMessage={(message) => {
          console.log('Chat message:', message);
          // TODO: Implement chat message handling (e.g., send to server, display in game)
        }}
      />

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 12, 10]} fov={50} />
        <RTSCameraController />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Platform />

        {/* Render all monsters */}
        {monsters.map(monster => {
          // Get or create position ref for this monster
          if (!monsterPosRefs.current.has(monster.id)) {
            monsterPosRefs.current.set(monster.id, new THREE.Vector3(-LANE_OFFSET, 0, -LANE_OFFSET));
          }
          const posRef = { current: monsterPosRefs.current.get(monster.id)! };
          return (
            <Monster
              key={monster.id}
              data={monster}
              positionRef={posRef}
              onDeath={() => handleMonsterDeath(monster.id)}
              onClick={() => handleSelectMonster(monster.id)}
              isSelected={selectionTarget?.type === 'monster' && selectionTarget.id === monster.id}
            />
          );
        })}

        {/* Render all characters */}
        {characters.map(char => (
          <Character
            key={char.id}
            data={char}
            isSelected={selectedCharacterIds.has(char.id)}
            onSelect={handleSelectCharacter}
            onSelectAllSameType={handleSelectAllSameType}
            monsters={monsters}
            monsterPosRefs={monsterPosRefs.current}
            onAttackMonster={handleAttackMonster}
            onStateChange={handleStateChange}
          />
        ))}

        {/* Move indicators */}
        {moveIndicators.map(indicator => (
          <MoveIndicator
            key={indicator.id}
            data={indicator}
            onComplete={() => handleIndicatorComplete(indicator.id)}
          />
        ))}

        {/* Selection handler (handles input) */}
        <SelectionHandler
          selectedCharacterIds={selectedCharacterIds}
          setSelectedCharacterIds={setSelectedCharacterIds}
          characters={characters}
          selectionBox={selectionBox}
          setSelectionBox={setSelectionBox}
          onMoveCommand={handleMoveCommand}
          onStopCommand={handleStopCommand}
          onSaveGroup={handleSaveGroup}
          onSelectGroup={handleSelectGroup}
        />
      </Canvas>
    </div>
  );
}
