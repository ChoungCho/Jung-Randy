// ===== ELEVATED BRIDGE (crosses over monster lane) =====
import {
  PLATFORM_SIZE,
  BOSS_PLATFORM_SIZE,
  BOSS_PLATFORM_GAP,
  BRIDGE_HEIGHT,
  RAMP_LENGTH,
  LANE_OFFSET,
} from '../constants';

export function ElevatedBridge() {
  // Bridge goes from inside main green area to boss platform
  const bossPlatformX = PLATFORM_SIZE / 2 + BOSS_PLATFORM_GAP + BOSS_PLATFORM_SIZE / 2;
  const bridgeStartX = LANE_OFFSET - 2; // Start inside main green area
  const bridgeEndX = bossPlatformX - BOSS_PLATFORM_SIZE / 2; // End at boss platform edge
  const flatSectionLength = bridgeEndX - bridgeStartX - RAMP_LENGTH * 2;
  const bridgeCenterX = (bridgeStartX + RAMP_LENGTH + bridgeEndX - RAMP_LENGTH) / 2;

  return (
    <group>
      {/* Left ramp (going up from main platform) */}
      <mesh
        position={[bridgeStartX + RAMP_LENGTH / 2, BRIDGE_HEIGHT / 2, 0]}
        rotation={[0, 0, Math.atan2(BRIDGE_HEIGHT, RAMP_LENGTH)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[Math.sqrt(RAMP_LENGTH * RAMP_LENGTH + BRIDGE_HEIGHT * BRIDGE_HEIGHT), 0.2, 2.2]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.85} />
      </mesh>

      {/* Flat elevated section */}
      <mesh position={[bridgeCenterX, BRIDGE_HEIGHT, 0]} receiveShadow castShadow>
        <boxGeometry args={[flatSectionLength, 0.2, 2.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.85} />
      </mesh>

      {/* Right ramp (going down to boss platform) */}
      <mesh
        position={[bridgeEndX - RAMP_LENGTH / 2, BRIDGE_HEIGHT / 2, 0]}
        rotation={[0, 0, -Math.atan2(BRIDGE_HEIGHT, RAMP_LENGTH)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[Math.sqrt(RAMP_LENGTH * RAMP_LENGTH + BRIDGE_HEIGHT * BRIDGE_HEIGHT), 0.2, 2.2]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.85} />
      </mesh>

      {/* Support pillars under flat section */}
      {[0.25, 0.5, 0.75].map((t, i) => {
        const pillarX = bridgeStartX + RAMP_LENGTH + flatSectionLength * t;
        return (
          <group key={`pillar-${i}`}>
            {[-0.9, 0.9].map((zSide) => (
              <mesh key={`pillar-${i}-${zSide}`} position={[pillarX, BRIDGE_HEIGHT / 2, zSide]} castShadow>
                <boxGeometry args={[0.3, BRIDGE_HEIGHT, 0.3]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Bridge rails */}
      <mesh position={[bridgeCenterX, BRIDGE_HEIGHT + 0.4, 1]} receiveShadow castShadow>
        <boxGeometry args={[flatSectionLength + 1, 0.15, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>
      <mesh position={[bridgeCenterX, BRIDGE_HEIGHT + 0.4, -1]} receiveShadow castShadow>
        <boxGeometry args={[flatSectionLength + 1, 0.15, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Rail posts */}
      {Array.from({ length: 5 }).map((_, i) => {
        const postX = bridgeStartX + RAMP_LENGTH + (flatSectionLength / 4) * i;
        return (
          <group key={`post-${i}`}>
            <mesh position={[postX, BRIDGE_HEIGHT + 0.2, 1]} castShadow>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
            </mesh>
            <mesh position={[postX, BRIDGE_HEIGHT + 0.2, -1]} castShadow>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
