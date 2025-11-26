import Phaser from 'phaser';
import { GameCore } from '../core/GameCore';
import { CombineSystem } from '../core/CombineSystem';
import { CharacterInstance, MobInstance, Wave } from '@/types';
import { defaultGameConfig } from '@/data/config';

/**
 * GameScene - Main game scene
 * Handles rendering and input for the defense game
 */
export class GameScene extends Phaser.Scene {
  private gameCore!: GameCore;
  private combineSystem!: CombineSystem;

  // Sprite groups
  private characterSprites: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private mobSprites: Map<string, Phaser.GameObjects.Sprite> = new Map();

  // UI elements
  private goldText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;
  private rollButton!: Phaser.GameObjects.Text;

  // Path for mobs
  private mobPath: Phaser.Curves.Path | null = null;

  // Selected character for deployment
  private selectedCharacter: CharacterInstance | null = null;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    // Initialize game core
    this.gameCore = new GameCore('player1', defaultGameConfig);
    this.combineSystem = new CombineSystem();

    // Setup scene
    this.setupBackground();
    this.setupMobPath();
    this.setupUI();
    this.setupEventListeners();
    this.setupInputHandlers();

    // Start the game
    this.gameCore.startGame();
  }

  private setupBackground(): void {
    // Simple background
    this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x2c3e50
    );

    // Draw deployment zone
    const deployZone = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      800,
      400,
      0x34495e,
      0.5
    );
    deployZone.setStrokeStyle(2, 0x7f8c8d);
  }

  private setupMobPath(): void {
    // Create a simple curved path for mobs
    const { width, height } = this.cameras.main;

    this.mobPath = new Phaser.Curves.Path(0, height / 2);
    this.mobPath.lineTo(width * 0.2, height / 2);
    this.mobPath.splineTo([
      new Phaser.Math.Vector2(width * 0.3, height * 0.3),
      new Phaser.Math.Vector2(width * 0.5, height * 0.7),
      new Phaser.Math.Vector2(width * 0.7, height * 0.3),
      new Phaser.Math.Vector2(width * 0.8, height / 2),
    ]);
    this.mobPath.lineTo(width, height / 2);

    // Draw path (debug visualization)
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xe74c3c, 0.3);
    this.mobPath.draw(graphics, 64);
  }

  private setupUI(): void {
    const { width } = this.cameras.main;

    // Top UI bar
    const uiBar = this.add.rectangle(width / 2, 30, width, 60, 0x1a252f);

    // Gold display
    this.goldText = this.add.text(20, 20, '💰 100', {
      fontSize: '24px',
      color: '#f1c40f',
    });

    // Lives display
    this.livesText = this.add.text(150, 20, '❤️ 20', {
      fontSize: '24px',
      color: '#e74c3c',
    });

    // Wave display
    this.waveText = this.add.text(280, 20, '🌊 Wave 0/20', {
      fontSize: '24px',
      color: '#3498db',
    });

    // Roll button
    this.rollButton = this.add.text(width - 150, 15, '🎲 뽑기 (10g)', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#2ecc71',
      padding: { x: 15, y: 10 },
    });
    this.rollButton.setInteractive({ useHandCursor: true });
    this.rollButton.on('pointerdown', () => this.onRollClick());
    this.rollButton.on('pointerover', () => {
      this.rollButton.setStyle({ backgroundColor: '#27ae60' });
    });
    this.rollButton.on('pointerout', () => {
      this.rollButton.setStyle({ backgroundColor: '#2ecc71' });
    });

    // Start wave button
    const startWaveBtn = this.add.text(width - 300, 15, '▶️ 웨이브 시작', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#e74c3c',
      padding: { x: 15, y: 10 },
    });
    startWaveBtn.setInteractive({ useHandCursor: true });
    startWaveBtn.on('pointerdown', () => this.onStartWaveClick());

    // Inventory panel (bottom)
    this.setupInventoryPanel();
  }

  private setupInventoryPanel(): void {
    const { width, height } = this.cameras.main;

    // Panel background
    this.add.rectangle(width / 2, height - 60, width, 120, 0x1a252f, 0.9);

    // Label
    this.add.text(20, height - 110, '인벤토리:', {
      fontSize: '18px',
      color: '#bdc3c7',
    });
  }

  private setupEventListeners(): void {
    // Listen to game core events
    this.gameCore.on('goldChanged', ({ total }: { total: number }) => {
      this.goldText.setText(`💰 ${total}`);
    });

    this.gameCore.on('roll', ({ character }: { character: CharacterInstance }) => {
      this.addCharacterToInventory(character);
    });

    this.gameCore.on('waveStart', ({ wave, waveNumber }: { wave: Wave; waveNumber: number }) => {
      this.waveText.setText(`🌊 Wave ${waveNumber}/${this.gameCore.getConfig().totalWaves}`);
      this.startWaveSpawning(wave);
    });

    this.gameCore.on('mobSpawn', (mob: MobInstance) => {
      this.createMobSprite(mob);
    });

    this.gameCore.on('mobKilled', ({ mob }: { mob: MobInstance }) => {
      this.destroyMobSprite(mob.instanceId);
    });

    this.gameCore.on('mobReachedEnd', ({ livesRemaining }: { livesRemaining: number }) => {
      this.livesText.setText(`❤️ ${livesRemaining}`);
    });

    this.gameCore.on('characterDeployed', (char: CharacterInstance) => {
      this.createCharacterSprite(char);
    });

    this.gameCore.on('gameEnd', ({ victory }: { victory: boolean }) => {
      this.showGameOver(victory);
    });
  }

  private setupInputHandlers(): void {
    // Click to deploy selected character
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.selectedCharacter && pointer.y < this.cameras.main.height - 120) {
        this.gameCore.deployCharacter(
          this.selectedCharacter.instanceId,
          pointer.x,
          pointer.y
        );
        this.selectedCharacter = null;
      }
    });
  }

  // ===== INVENTORY =====

  private addCharacterToInventory(char: CharacterInstance): void {
    const { height } = this.cameras.main;
    const inventory = this.gameCore.getState().inventory.characters;
    const index = inventory.findIndex(c => c.instanceId === char.instanceId);

    const x = 120 + (index % 10) * 60;
    const y = height - 60;

    const sprite = this.add.sprite(x, y, char.character.spriteKey);
    sprite.setScale(1.5);
    sprite.setInteractive({ useHandCursor: true });

    // Click to select for deployment
    sprite.on('pointerdown', () => {
      if (!char.isDeployed) {
        this.selectedCharacter = char;
        // Visual feedback
        sprite.setTint(0x00ff00);
        this.time.delayedCall(200, () => sprite.clearTint());
      }
    });

    // Hover info
    sprite.on('pointerover', () => {
      this.showCharacterTooltip(char, x, y - 80);
    });
    sprite.on('pointerout', () => {
      this.hideTooltip();
    });
  }

  private tooltipText: Phaser.GameObjects.Text | null = null;

  private showCharacterTooltip(char: CharacterInstance, x: number, y: number): void {
    this.hideTooltip();

    const info = `${char.character.name}\n${char.character.formName || ''}\n` +
      `ATK: ${char.currentStats.atk} | HP: ${char.currentStats.hp}`;

    this.tooltipText = this.add.text(x, y, info, {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 },
    });
    this.tooltipText.setOrigin(0.5, 1);
    this.tooltipText.setDepth(100);
  }

  private hideTooltip(): void {
    if (this.tooltipText) {
      this.tooltipText.destroy();
      this.tooltipText = null;
    }
  }

  // ===== SPRITES =====

  private createCharacterSprite(char: CharacterInstance): void {
    const sprite = this.add.sprite(
      char.position.x,
      char.position.y,
      char.character.spriteKey
    );
    sprite.setOrigin(0.5, 1);
    sprite.setScale(2);

    // HP bar
    const hpBarBg = this.add.rectangle(char.position.x, char.position.y - 50, 40, 6, 0x000000);
    const hpBar = this.add.rectangle(char.position.x, char.position.y - 50, 40, 6, 0x2ecc71);

    this.characterSprites.set(char.instanceId, sprite);
  }

  private createMobSprite(mob: MobInstance): void {
    const sprite = this.add.sprite(0, 0, mob.mob.spriteKey);
    sprite.setOrigin(0.5, 0.5);

    this.mobSprites.set(mob.instanceId, sprite);
  }

  private destroyMobSprite(instanceId: string): void {
    const sprite = this.mobSprites.get(instanceId);
    if (sprite) {
      // Death animation
      this.tweens.add({
        targets: sprite,
        alpha: 0,
        scale: 0,
        duration: 200,
        onComplete: () => sprite.destroy(),
      });
      this.mobSprites.delete(instanceId);
    }
  }

  // ===== WAVE SPAWNING =====

  private startWaveSpawning(wave: Wave): void {
    let spawnIndex = 0;
    const flatMobs: string[] = [];

    // Flatten mob list
    for (const waveMob of wave.mobs) {
      for (let i = 0; i < waveMob.count; i++) {
        flatMobs.push(waveMob.mobId);
      }
    }

    // Spawn timer
    const spawnTimer = this.time.addEvent({
      delay: wave.spawnInterval,
      callback: () => {
        if (spawnIndex < flatMobs.length) {
          const mobId = flatMobs[spawnIndex];
          const waveMobData = wave.mobs.find(w => w.mobId === mobId);
          this.gameCore.spawnMob(mobId, waveMobData?.statMultiplier);
          spawnIndex++;
        } else {
          spawnTimer.destroy();
        }
      },
      loop: true,
    });
  }

  // ===== BUTTON HANDLERS =====

  private onRollClick(): void {
    if (this.gameCore.canRoll()) {
      this.gameCore.roll();
    }
  }

  private onStartWaveClick(): void {
    const state = this.gameCore.getState();
    if (!state.waveInProgress) {
      this.gameCore.startNextWave();
    }
  }

  // ===== GAME OVER =====

  private showGameOver(victory: boolean): void {
    const { width, height } = this.cameras.main;

    // Overlay
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
    overlay.setDepth(200);

    // Result text
    const resultText = this.add.text(
      width / 2,
      height / 2 - 50,
      victory ? '🎉 승리!' : '💀 패배...',
      {
        fontSize: '64px',
        color: victory ? '#2ecc71' : '#e74c3c',
      }
    );
    resultText.setOrigin(0.5);
    resultText.setDepth(201);

    // Stats
    const state = this.gameCore.getState();
    const statsText = this.add.text(
      width / 2,
      height / 2 + 30,
      `클리어 웨이브: ${state.currentWave}/${state.totalWaves}\n` +
      `남은 생명: ${state.playerLives}\n` +
      `총 골드: ${state.gold}`,
      {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center',
      }
    );
    statsText.setOrigin(0.5);
    statsText.setDepth(201);

    // Restart button
    const restartBtn = this.add.text(width / 2, height / 2 + 120, '🔄 다시하기', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#3498db',
      padding: { x: 20, y: 10 },
    });
    restartBtn.setOrigin(0.5);
    restartBtn.setDepth(201);
    restartBtn.setInteractive({ useHandCursor: true });
    restartBtn.on('pointerdown', () => {
      this.scene.restart();
    });
  }

  // ===== UPDATE LOOP =====

  update(time: number, delta: number): void {
    // Update game core
    this.gameCore.update(delta);

    // Update mob positions along path
    this.updateMobPositions();

    // Simple auto-attack logic for deployed characters
    this.processAutoAttacks();
  }

  private updateMobPositions(): void {
    if (!this.mobPath) return;

    const state = this.gameCore.getState();

    for (const mob of state.activeMobs) {
      const sprite = this.mobSprites.get(mob.instanceId);
      if (sprite) {
        const point = this.mobPath.getPoint(mob.pathProgress);
        if (point) {
          sprite.x = point.x;
          sprite.y = point.y;
          mob.position = { x: point.x, y: point.y };
        }
      }
    }
  }

  private processAutoAttacks(): void {
    const state = this.gameCore.getState();

    for (const char of state.deployedCharacters) {
      // Find nearest mob in range
      let nearestMob: MobInstance | null = null;
      let nearestDist = Infinity;

      for (const mob of state.activeMobs) {
        const dist = Phaser.Math.Distance.Between(
          char.position.x,
          char.position.y,
          mob.position.x,
          mob.position.y
        );

        if (dist < char.currentStats.attackRange * 3 && dist < nearestDist) {
          nearestDist = dist;
          nearestMob = mob;
        }
      }

      // Attack if in range
      if (nearestMob) {
        this.gameCore.dealDamage(
          char.instanceId,
          nearestMob.instanceId,
          char.currentStats.atk
        );
      }
    }
  }
}
