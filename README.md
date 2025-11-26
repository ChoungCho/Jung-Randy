# 🏛️ Jung-Randy (정랜디 - Politician Random Defense)

A web-based multiplayer hero defense game featuring Korean politicians.

> Inspired by Warcraft 3 custom maps: 원랜디/나랜디 (One-Randy/Na-Randy)

## 🎮 Game Concept

- **Genre**: Hero Action Defense
- **Platform**: Web browser (no installation required)
- **Features**: Politician card combination system + Na-Randy style defense gameplay

## 🚀 Quick Start

### Local Development (npm)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000

### Docker Development

```bash
docker-compose up
```

### Production Build

```bash
docker-compose --profile production up client-prod
```

## 📁 Project Structure

```
Jung-Randy/
├── client/                  # Frontend (React + Phaser)
│   ├── src/
│   │   ├── components/      # React UI components
│   │   ├── game/           # Phaser game code
│   │   │   ├── core/       # Game logic (server-portable)
│   │   │   ├── scenes/     # Phaser scenes
│   │   │   ├── entities/   # Characters, mobs, etc.
│   │   │   └── systems/    # Combination, gacha systems
│   │   ├── data/           # Game data definitions
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utilities
│   └── public/assets/      # Sprites, sounds
├── server/                  # Backend (NestJS) - planned
├── shared/                  # Shared types/constants
└── docker-compose.yml
```

## 🎯 MVP Scope

### Included
- Single player mode
- People Power Party (국민의힘) + Democratic Party (더불어민주당) characters
- 5-tier rarity system (Common → Special → Rare → Legendary → Mythic)
- Unique politician evolution lines (Ahn Cheol-soo, Lee Jae-myung, etc.)
- Basic combination system
- 20-wave defense

### Future Expansion
- Multiplayer
- Additional politicians
- Committee synergies
- Neutral/bipartisan units

## 🔧 Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React 18, Phaser 3, TypeScript |
| State Management | Zustand |
| Build Tool | Vite |
| Backend | NestJS (planned) |
| Database | Firebase Firestore (planned) |
| Deployment | Docker, Firebase Hosting |

## 📊 Rarity Tiers

| Tier | Name | Description |
|------|------|-------------|
| Common | 일반 | Freshman legislators, combination material |
| Special | 특별 | Second-term legislators |
| Rare | 고급 | Multi-term legislators |
| Legendary | 전설 | Party leaders / Ministers |
| Mythic | 신화 | Presidential candidates / Presidents |

## 🔄 Combination Rules

### Basic Evolution
- Common × 3 → Special
- Special × 2 + Common × 1 → Rare
- Rare × 2 → Legendary
- Legendary + Materials → Mythic

### Unique Evolution (e.g., Ahn Cheol-soo)
- Ahn (Professor) + PPP Common × 2 → Ahn (CEO)
- Ahn (CEO) + PPP Special × 1 → Ahn (Candidate)
- ...

## 📝 Development Roadmap

- [x] Project structure design
- [x] Type/data schema definition
- [x] Phaser basic scene structure
- [x] React app structure
- [ ] Actual sprite assets
- [ ] Gacha/combination UI completion
- [ ] Wave balancing
- [ ] Multiplayer server
- [ ] Firebase integration

## 👥 Contributing

This is a non-commercial project for playing with friends.

---

**Jung-Randy v0.1.0**
