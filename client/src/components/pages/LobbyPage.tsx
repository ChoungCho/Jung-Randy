import { useNavigate } from 'react-router-dom';
import styles from './LobbyPage.module.css';

export function LobbyPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.lobby}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>🏛️ 정랜디</h1>
          <p className={styles.subtitle}>정치인 랜덤 디펜스</p>
        </header>

        <main className={styles.main}>
          <div className={styles.menuCard}>
            <button
              className={`btn btn-primary ${styles.menuButton}`}
              onClick={() => navigate('/game')}
            >
              🎮 싱글 플레이
            </button>

            <button
              className={`btn btn-secondary ${styles.menuButton}`}
              disabled
              title="멀티플레이는 준비 중입니다"
            >
              👥 멀티 플레이 (준비중)
            </button>

            <button
              className={`btn btn-success ${styles.menuButton}`}
              onClick={() => navigate('/tierlist')}
            >
              📊 티어 리스트
            </button>
          </div>

          <div className={styles.infoCard}>
            <h3>🎯 게임 방법</h3>
            <ul>
              <li>🎲 뽑기로 정치인 카드를 획득하세요</li>
              <li>🔄 카드를 조합해 더 강한 캐릭터로 진화시키세요</li>
              <li>⚔️ 배치한 캐릭터로 적을 막으세요</li>
              <li>🏆 20웨이브를 버티면 승리!</li>
            </ul>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>정랜디 v0.1.0 | 비상업 목적 개인 프로젝트</p>
        </footer>
      </div>
    </div>
  );
}
