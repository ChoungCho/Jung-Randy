import Phaser from 'phaser';

/**
 * BootScene - Initial scene for loading essential assets
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Display loading text
    const { width, height } = this.cameras.main;
    const loadingText = this.add.text(width / 2, height / 2, '로딩 중...', {
      fontSize: '32px',
      color: '#ffffff',
    });
    loadingText.setOrigin(0.5);

    // Progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 30, 320, 50);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x3498db, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load essential boot assets (if any)
    // this.load.image('logo', 'assets/logo.png');
  }

  create(): void {
    // Transition to preloader
    this.scene.start('PreloadScene');
  }
}
