// ===== LANE FRAME (Square frame without cross) =====

interface LaneFrameProps {
  laneOffset: number;
  laneWidth: number;
}

export function LaneFrame({ laneOffset, laneWidth }: LaneFrameProps) {
  // Calculate outer and inner bounds
  const outerSize = laneOffset + laneWidth / 2;
  const innerSize = laneOffset - laneWidth / 2;

  return (
    <group>
      {/* Top side */}
      <mesh position={[0, 0.03, -laneOffset]} receiveShadow>
        <boxGeometry args={[outerSize * 2, 0.06, laneWidth]} />
        <meshStandardMaterial color="#6b5a4a" roughness={0.85} />
      </mesh>
      {/* Bottom side */}
      <mesh position={[0, 0.03, laneOffset]} receiveShadow>
        <boxGeometry args={[outerSize * 2, 0.06, laneWidth]} />
        <meshStandardMaterial color="#6b5a4a" roughness={0.85} />
      </mesh>
      {/* Left side (shorter to not overlap corners) */}
      <mesh position={[-laneOffset, 0.03, 0]} receiveShadow>
        <boxGeometry args={[laneWidth, 0.06, innerSize * 2]} />
        <meshStandardMaterial color="#6b5a4a" roughness={0.85} />
      </mesh>
      {/* Right side (shorter to not overlap corners) */}
      <mesh position={[laneOffset, 0.03, 0]} receiveShadow>
        <boxGeometry args={[laneWidth, 0.06, innerSize * 2]} />
        <meshStandardMaterial color="#6b5a4a" roughness={0.85} />
      </mesh>

      {/* Inner border (darker) */}
      <mesh position={[0, 0.02, -innerSize]} receiveShadow>
        <boxGeometry args={[innerSize * 2, 0.04, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, innerSize]} receiveShadow>
        <boxGeometry args={[innerSize * 2, 0.04, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[-innerSize, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.1, 0.04, innerSize * 2]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[innerSize, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.1, 0.04, innerSize * 2]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>

      {/* Outer border (darker) */}
      <mesh position={[0, 0.02, -outerSize]} receiveShadow>
        <boxGeometry args={[outerSize * 2 + 0.1, 0.04, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, outerSize]} receiveShadow>
        <boxGeometry args={[outerSize * 2 + 0.1, 0.04, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[-outerSize, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.1, 0.04, outerSize * 2 + 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[outerSize, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.1, 0.04, outerSize * 2 + 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
    </group>
  );
}
