import {
  GameState,
  GameConfig,
  CharacterInstance,
  MobInstance,
  Character,
  Mob,
  Wave,
  Party,
  Rarity,
  Stats,
} from '@/types';
import { defaultGameConfig, rarityWeights, partyWeights } from '@/data/config';
import { allCharacters, getCharactersByPartyAndRarity } from '@/data/characters';
import { getMobById, getWave } from '@/data/mobs';

/**
 * GameCore - Pure game logic, no rendering
 *
 * This class handles all game state and logic.
 * Later, this can be moved to server for multiplayer.
 */
export class GameCore {
  private state: GameState;
  private config: GameConfig;
  private eventCallbacks: Map<string, Function[]> = new Map();

  constructor(playerId: string, config: GameConfig = defaultGameConfig) {
    this.config = config;
    this.state = this.createInitialState(playerId);
  }

  // ===== STATE INITIALIZATION =====

  private createInitialState(playerId: string): GameState {
    return {
      gameId: this.generateId(),
      playerId,
      isRunning: false,
      isPaused: false,

      currentWave: 0,
      totalWaves: this.config.totalWaves,
      waveInProgress: false,

      playerLives: this.config.startingLives,
      inventory: {
        characters: [],
        gold: this.config.startingGold,
        freeRolls: this.config.freeRollsPerWave,
      },
      deployedCharacters: [],
      activeMobs: [],

      gold: this.config.startingGold,
      rollCost: this.config.rollCost,

      elapsedTime: 0,
      waveStartTime: 0,
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ===== STATE ACCESS =====

  getState(): Readonly<GameState> {
    return this.state;
  }

  getConfig(): Readonly<GameConfig> {
    return this.config;
  }

  // ===== GAME FLOW =====

  startGame(): void {
    this.state.isRunning = true;
    this.state.currentWave = 0;
    this.emit('gameStart', this.state);

    // Give initial free rolls
    this.grantFreeRolls(3);
  }

  pauseGame(): void {
    this.state.isPaused = true;
    this.emit('gamePause', this.state);
  }

  resumeGame(): void {
    this.state.isPaused = false;
    this.emit('gameResume', this.state);
  }

  endGame(victory: boolean): void {
    this.state.isRunning = false;
    this.emit('gameEnd', { state: this.state, victory });
  }

  // ===== WAVE MANAGEMENT =====

  startNextWave(): Wave | null {
    if (this.state.waveInProgress) return null;

    this.state.currentWave++;
    const wave = getWave(this.state.currentWave);

    if (!wave) {
      this.endGame(true);
      return null;
    }

    this.state.waveInProgress = true;
    this.state.waveStartTime = this.state.elapsedTime;

    // Grant free rolls for wave
    this.grantFreeRolls(this.config.freeRollsPerWave);

    this.emit('waveStart', { wave, waveNumber: this.state.currentWave });
    return wave;
  }

  spawnMob(mobId: string, statMultiplier: number = 1.0): MobInstance | null {
    const mob = getMobById(mobId);
    if (!mob) return null;

    const instance: MobInstance = {
      instanceId: this.generateId(),
      mob,
      currentStats: this.scaleStats(mob.baseStats, statMultiplier),
      position: { x: 0, y: 0 }, // Set by renderer
      pathProgress: 0,
      activeDebuffs: [],
    };

    this.state.activeMobs.push(instance);
    this.emit('mobSpawn', instance);
    return instance;
  }

  private scaleStats(base: Stats, multiplier: number): Stats {
    return {
      ...base,
      hp: Math.floor(base.hp * multiplier),
      maxHp: Math.floor(base.maxHp * multiplier),
      atk: Math.floor(base.atk * multiplier),
      def: Math.floor(base.def * multiplier),
    };
  }

  onMobReachedEnd(mobId: string): void {
    const index = this.state.activeMobs.findIndex(m => m.instanceId === mobId);
    if (index === -1) return;

    this.state.activeMobs.splice(index, 1);
    this.state.playerLives--;

    this.emit('mobReachedEnd', { mobId, livesRemaining: this.state.playerLives });

    if (this.state.playerLives <= 0) {
      this.endGame(false);
    }
  }

  onMobKilled(mobId: string, killerId: string): void {
    const index = this.state.activeMobs.findIndex(m => m.instanceId === mobId);
    if (index === -1) return;

    const mob = this.state.activeMobs[index];
    this.state.activeMobs.splice(index, 1);

    // Award gold
    this.addGold(mob.mob.goldReward);

    this.emit('mobKilled', { mob, killerId });

    // Check wave complete
    if (this.state.activeMobs.length === 0 && this.state.waveInProgress) {
      this.completeWave();
    }
  }

  private completeWave(): void {
    this.state.waveInProgress = false;
    const wave = getWave(this.state.currentWave);

    if (wave?.bonusGold) {
      this.addGold(wave.bonusGold);
    }

    this.emit('waveComplete', { waveNumber: this.state.currentWave });

    // Check victory
    if (this.state.currentWave >= this.state.totalWaves) {
      this.endGame(true);
    }
  }

  // ===== GACHA / ROLLING =====

  canRoll(): boolean {
    return (
      this.state.inventory.freeRolls > 0 ||
      this.state.gold >= this.state.rollCost
    );
  }

  roll(): CharacterInstance | null {
    if (!this.canRoll()) return null;

    // Deduct cost
    if (this.state.inventory.freeRolls > 0) {
      this.state.inventory.freeRolls--;
    } else {
      this.state.gold -= this.state.rollCost;
    }

    // Roll for character
    const character = this.rollCharacter();
    const instance = this.createCharacterInstance(character);

    this.state.inventory.characters.push(instance);
    this.emit('roll', { character: instance });

    return instance;
  }

  private rollCharacter(): Character {
    // Roll rarity
    const rarity = this.rollRarity();
    // Roll party
    const party = this.rollParty();

    // Get available characters
    let candidates = getCharactersByPartyAndRarity(party, rarity);

    // If no generic cards, try to find any character with matching criteria
    if (candidates.length === 0) {
      candidates = allCharacters.filter(
        c => c.party === party && c.rarity === rarity
      );
    }

    // Fallback to common if nothing found
    if (candidates.length === 0) {
      candidates = allCharacters.filter(
        c => c.party === party && c.rarity === Rarity.COMMON
      );
    }

    // Random selection
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  private rollRarity(): Rarity {
    const roll = Math.random() * 100;
    let cumulative = 0;

    const rarities: [Rarity, number][] = [
      [Rarity.COMMON, rarityWeights.common],
      [Rarity.SPECIAL, rarityWeights.special],
      [Rarity.RARE, rarityWeights.rare],
      [Rarity.LEGENDARY, rarityWeights.legendary],
      [Rarity.MYTHIC, rarityWeights.mythic],
    ];

    for (const [rarity, weight] of rarities) {
      cumulative += weight;
      if (roll < cumulative) {
        return rarity;
      }
    }

    return Rarity.COMMON;
  }

  private rollParty(): Party {
    const roll = Math.random() * 100;
    return roll < partyWeights.kuk ? Party.KUK : Party.MIN;
  }

  private createCharacterInstance(character: Character): CharacterInstance {
    return {
      instanceId: this.generateId(),
      character,
      currentStats: { ...character.baseStats },
      position: { x: 0, y: 0 },
      skillCooldowns: new Map(),
      activeBuffs: [],
      isDeployed: false,
    };
  }

  grantFreeRolls(count: number): void {
    this.state.inventory.freeRolls += count;
    this.emit('freeRollsGranted', { count, total: this.state.inventory.freeRolls });
  }

  // ===== CHARACTER MANAGEMENT =====

  deployCharacter(instanceId: string, x: number, y: number): boolean {
    if (this.state.deployedCharacters.length >= this.config.maxDeployedCharacters) {
      return false;
    }

    const char = this.state.inventory.characters.find(
      c => c.instanceId === instanceId
    );
    if (!char || char.isDeployed) return false;

    char.isDeployed = true;
    char.position = { x, y };
    this.state.deployedCharacters.push(char);

    this.emit('characterDeployed', char);
    return true;
  }

  undeployCharacter(instanceId: string): boolean {
    const index = this.state.deployedCharacters.findIndex(
      c => c.instanceId === instanceId
    );
    if (index === -1) return false;

    const char = this.state.deployedCharacters[index];
    char.isDeployed = false;
    this.state.deployedCharacters.splice(index, 1);

    this.emit('characterUndeployed', char);
    return true;
  }

  moveCharacter(instanceId: string, x: number, y: number): boolean {
    const char = this.state.deployedCharacters.find(
      c => c.instanceId === instanceId
    );
    if (!char) return false;

    char.position = { x, y };
    this.emit('characterMoved', { char, x, y });
    return true;
  }

  // ===== COMBAT =====

  dealDamage(attackerId: string, targetId: string, damage: number): void {
    const target = this.state.activeMobs.find(m => m.instanceId === targetId);
    if (!target) return;

    const actualDamage = Math.max(1, damage - target.currentStats.def);
    target.currentStats.hp -= actualDamage;

    this.emit('damage', { attackerId, targetId, damage: actualDamage });

    if (target.currentStats.hp <= 0) {
      this.onMobKilled(targetId, attackerId);
    }
  }

  useSkill(characterId: string, skillId: string, targetId?: string): boolean {
    const char = this.state.deployedCharacters.find(
      c => c.instanceId === characterId
    );
    if (!char) return false;

    const skill = char.character.skills.find(s => s.id === skillId);
    if (!skill) return false;

    // Check cooldown
    const cooldownEnd = char.skillCooldowns.get(skillId) ?? 0;
    if (this.state.elapsedTime < cooldownEnd) return false;

    // Set cooldown
    char.skillCooldowns.set(skillId, this.state.elapsedTime + skill.cooldown);

    this.emit('skillUsed', { char, skill, targetId });
    return true;
  }

  // ===== ECONOMY =====

  addGold(amount: number): void {
    this.state.gold += amount;
    this.state.inventory.gold = this.state.gold;
    this.emit('goldChanged', { amount, total: this.state.gold });
  }

  spendGold(amount: number): boolean {
    if (this.state.gold < amount) return false;
    this.state.gold -= amount;
    this.state.inventory.gold = this.state.gold;
    this.emit('goldChanged', { amount: -amount, total: this.state.gold });
    return true;
  }

  // ===== GAME LOOP UPDATE =====

  update(deltaTime: number): void {
    if (!this.state.isRunning || this.state.isPaused) return;

    this.state.elapsedTime += deltaTime;

    // Update mob positions along path
    this.updateMobs(deltaTime);

    // Update character cooldowns
    this.updateCooldowns(deltaTime);
  }

  private updateMobs(deltaTime: number): void {
    for (const mob of this.state.activeMobs) {
      // Path progress (0 to 1)
      const progressPerSecond = mob.currentStats.speed / 1000;
      mob.pathProgress += progressPerSecond * (deltaTime / 1000);

      if (mob.pathProgress >= 1) {
        this.onMobReachedEnd(mob.instanceId);
      }
    }
  }

  private updateCooldowns(_deltaTime: number): void {
    // Cooldowns are timestamp-based, no update needed
  }

  // ===== EVENT SYSTEM =====

  on(event: string, callback: Function): void {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, []);
    }
    this.eventCallbacks.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.eventCallbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.eventCallbacks.get(event);
    if (callbacks) {
      for (const cb of callbacks) {
        cb(data);
      }
    }
  }
}
