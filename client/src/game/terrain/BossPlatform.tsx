// ===== BOSS PLATFORM =====
import { BOSS_PLATFORM_SIZE } from '../constants';

interface BossPlatformProps {
  position: [number, number, number];
}

export function BossPlatform({ position }: BossPlatformProps) {
  return (
    <group position={position}>
      {/* Elevated base */}
      <mesh position={[0, -0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[BOSS_PLATFORM_SIZE + 1, 0.6, BOSS_PLATFORM_SIZE + 1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      {/* Main platform floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[BOSS_PLATFORM_SIZE, BOSS_PLATFORM_SIZE]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
      </mesh>

      {/* Outer ritual circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[BOSS_PLATFORM_SIZE / 2 - 1, BOSS_PLATFORM_SIZE / 2 - 0.6, 32]} />
        <meshStandardMaterial color="#8b0000" roughness={0.7} emissive="#330000" emissiveIntensity={0.3} />
      </mesh>

      {/* Middle ritual circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[BOSS_PLATFORM_SIZE / 4 - 0.3, BOSS_PLATFORM_SIZE / 4, 32]} />
        <meshStandardMaterial color="#8b0000" roughness={0.7} emissive="#330000" emissiveIntensity={0.3} />
      </mesh>

      {/* Inner circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshStandardMaterial color="#8b0000" roughness={0.7} emissive="#440000" emissiveIntensity={0.5} />
      </mesh>

      {/* Corner pillars */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const radius = BOSS_PLATFORM_SIZE / 2 - 0.5;
        return (
          <group key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.4, 1.6, 6]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            </mesh>
            {/* Glowing top */}
            <pointLight position={[0, 1.8, 0]} color="#ff3333" intensity={0.6} distance={5} />
            <mesh position={[0, 1.7, 0]}>
              <sphereGeometry args={[0.18, 8, 6]} />
              <meshBasicMaterial color="#ff4444" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
