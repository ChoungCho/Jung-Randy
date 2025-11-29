// ===== MAIN PLATFORM COMPONENT =====
import {
  PLATFORM_SIZE,
  BOSS_PLATFORM_SIZE,
  BOSS_PLATFORM_GAP,
  LANE_OFFSET,
  LANE_WIDTH,
} from '../constants';
import { LaneFrame } from './LaneFrame';
import { ElevatedBridge } from './ElevatedBridge';
import { BossPlatform } from './BossPlatform';

export function Platform() {
  return (
    <group>
      {/* Base ground - green grass plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[PLATFORM_SIZE, PLATFORM_SIZE]} />
        <meshStandardMaterial color="#3a5a3a" roughness={0.9} />
      </mesh>

      {/* Lane frame (square path for monsters) */}
      <LaneFrame laneOffset={LANE_OFFSET} laneWidth={LANE_WIDTH} />

      {/* Elevated bridge from main area to boss zone */}
      <ElevatedBridge />

      {/* Boss platform - positioned to the right */}
      <BossPlatform position={[PLATFORM_SIZE / 2 + BOSS_PLATFORM_GAP + BOSS_PLATFORM_SIZE / 2, 0, 0]} />
    </group>
  );
}
