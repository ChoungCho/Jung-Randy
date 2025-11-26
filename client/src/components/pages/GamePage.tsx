import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPhaserGame } from '@/game';
import styles from './GamePage.module.css';

export function GamePage() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameContainerRef.current && !gameRef.current) {
      gameRef.current = createPhaserGame(gameContainerRef.current);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const handleBack = () => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    navigate('/');
  };

  return (
    <div className={styles.gamePage}>
      <header className={styles.header}>
        <button className={`btn ${styles.backButton}`} onClick={handleBack}>
          ← 로비로
        </button>
        <h1 className={styles.title}>정랜디</h1>
        <div className={styles.spacer} />
      </header>

      <main className={styles.gameContainer} ref={gameContainerRef} />
    </div>
  );
}
