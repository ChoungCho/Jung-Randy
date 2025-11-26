# 🏛️ 정랜디 (정치인 랜덤 디펜스)

웹 기반 멀티플레이 정치인 랜덤 디펜스 게임

> 레퍼런스: 워크래프트3 유즈맵 원랜디/나랜디

## 🎮 게임 컨셉

- **장르**: 영웅 액션 디펜스
- **플랫폼**: 웹 브라우저 (설치 없이 플레이)
- **특징**: 정치인 카드 조합 시스템 + 나랜디 스타일 디펜스

## 🚀 빠른 시작

### 로컬 개발 (npm)

```bash
cd client
npm install
npm run dev
```

http://localhost:3000 접속

### Docker 개발

```bash
docker-compose up
```

### 프로덕션 빌드

```bash
docker-compose --profile production up client-prod
```

## 📁 프로젝트 구조

```
정랜디/
├── client/                  # 프론트엔드 (React + Phaser)
│   ├── src/
│   │   ├── components/      # React UI 컴포넌트
│   │   ├── game/           # Phaser 게임 코드
│   │   │   ├── core/       # 게임 로직 (나중에 서버로 이동)
│   │   │   ├── scenes/     # Phaser 씬
│   │   │   ├── entities/   # 캐릭터, 몹 등
│   │   │   └── systems/    # 조합, 뽑기 시스템
│   │   ├── data/           # 게임 데이터 (JSON)
│   │   ├── types/          # TypeScript 타입
│   │   └── utils/          # 유틸리티
│   └── public/assets/      # 스프라이트, 사운드
├── server/                  # 백엔드 (NestJS) - 추후 구현
├── shared/                  # 공유 타입/상수
└── docker-compose.yml
```

## 🎯 MVP 범위

### 포함
- 싱글 플레이 모드
- 국민의힘 + 더불어민주당 캐릭터
- 5티어 등급 체계 (일반 → 특별 → 고급 → 전설 → 신화)
- 4명 유니크 정치인 진화 라인 (안철수, 이재명, 이낙연, 김문수)
- 기본 조합 시스템
- 20웨이브 디펜스

### 추후 확장
- 멀티플레이
- 추가 정치인
- 위원회 시너지
- 중립/초당적 유닛

## 🔧 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React 18, Phaser 3, TypeScript |
| 상태관리 | Zustand |
| 빌드 | Vite |
| 백엔드 | NestJS (추후) |
| DB | Firebase Firestore (추후) |
| 배포 | Docker, Firebase Hosting |

## 📊 등급 체계

| 등급 | 이름 | 설명 |
|------|------|------|
| Common | 일반 | 초선 의원, 조합 재료 |
| Special | 특별 | 재선 의원 |
| Rare | 고급 | 다선 의원 |
| Legendary | 전설 | 당대표/장관급 |
| Mythic | 신화 | 대선후보/대통령급 |

## 🔄 조합 규칙

### 기본 진화
- 일반 × 3 → 특별
- 특별 × 2 + 일반 × 1 → 고급
- 고급 × 2 → 전설
- 전설 + 재료 → 신화

### 유니크 진화 (예: 안철수)
- 안철수(교수) + 국힘 일반 × 2 → 안철수(CEO)
- 안철수(CEO) + 국힘 특별 × 1 → 안철수(후보)
- ...

## 📝 개발 로드맵

- [x] 프로젝트 구조 설계
- [x] 타입/데이터 스키마 정의
- [x] Phaser 기본 씬 구조
- [x] React 앱 구조
- [ ] 실제 스프라이트 에셋
- [ ] 뽑기/조합 UI 완성
- [ ] 웨이브 밸런싱
- [ ] 멀티플레이 서버
- [ ] Firebase 연동

## 👥 기여

비상업, 지인 멀티 플레이용 프로젝트입니다.

---

**정랜디 v0.1.0**
