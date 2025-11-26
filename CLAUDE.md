# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

정랜디 (정치인 랜덤 디펜스) - A web-based hero defense style game inspired by Warcraft 3 custom maps (원랜디/나랜디). Players collect and combine politician cards to defend against waves of enemies.

## Commands

```bash
# Development
cd client && npm install && npm run dev   # Start dev server at http://localhost:3000

# Build & Preview
cd client && npm run build                # TypeScript check + production build
cd client && npm run preview              # Preview production build

# Lint
cd client && npm run lint                 # ESLint

# Docker
docker-compose up                         # Dev environment
docker-compose --profile production up client-prod  # Production build
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + Phaser 3 + TypeScript + Vite
- **State**: Zustand (planned)
- **Routing**: React Router DOM
- **Backend**: NestJS (not implemented yet, planned for multiplayer)

### Key Directories
```
client/src/
├── game/           # Phaser game engine code
│   ├── core/       # Pure game logic (server-portable)
│   └── scenes/     # Phaser rendering scenes
├── data/           # Game data definitions (characters, recipes, mobs, config)
├── types/          # TypeScript type definitions
└── components/     # React UI components
```

### Core Architecture Pattern

**Separation of Concerns**: Game logic (`core/`) is intentionally separated from rendering (`scenes/`) for future server migration in multiplayer mode.

- `GameCore` - Pure game state and logic (no Phaser dependencies)
- `CombineSystem` - Character combination/evolution logic
- `GameScene` - Phaser rendering and input handling, delegates to GameCore

**Event-Driven Communication**: GameCore emits events (`gameStart`, `roll`, `waveStart`, `mobSpawn`, `mobKilled`, etc.) that GameScene subscribes to for rendering updates.

### Data Model

**Party System**:
- `KUK` (국민의힘/People Power Party) - Attack-focused synergies
- `MIN` (더불어민주당/Democratic Party) - Survival-focused synergies

**Rarity Tiers**: Common → Special → Rare → Legendary → Mythic

**Character Types**:
- Generic party cards (combining material)
- Unique politicians with evolution forms (e.g., 안철수: 교수 → CEO → 후보 → 국회의원 → 대선후보)

**Combination Rules**:
- Generic: Common×3 → Special, Special×2 + Common×1 → Rare
- Unique: Requires specific character + party materials

### Gacha System
Weighted random rolls for rarity (60% common, 25% special, 12% rare, 2.5% legendary, 0.5% mythic) and party (50/50).

### Naming Conventions
- Party codes: `kuk` (국민의힘), `min` (더불어민주당)
- Rarity tiers: `common`, `special`, `rare`, `legendary`, `mythic`

## Key Files

- `client/src/types/game.ts` - All TypeScript interfaces and enums
- `client/src/data/config.ts` - Game balance configuration
- `client/src/data/characters.ts` - Character definitions including evolution lines
- `client/src/data/recipes.ts` - Combination recipe definitions
- `client/src/game/core/GameCore.ts` - Central game logic
- `client/src/game/scenes/GameScene.ts` - Main Phaser scene

## Path Aliases

TypeScript uses `@/` alias for `client/src/` (configured in `tsconfig.json` and `vite.config.ts`).
