// ===== GAME MODULE BARREL EXPORT =====
// Main entry point
export { default as GameScene } from './GameScene';

// Re-export submodules for direct access if needed
export * from './types';
export * from './constants';
export * from './gameData';

// Submodule barrel exports
export * from './terrain';
export * from './entities';
export * from './components';
export * from './controllers';
export * from './ui';
export * from './hooks';
export * from './utils';
