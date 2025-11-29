// ===== CIRCLE LINE COMPONENT =====
import { useMemo } from 'react';

interface CircleLineProps {
  radius: number;
  color: string;
  opacity: number;
  segments?: number;
}

export function CircleLine({ radius, color, opacity, segments = 48 }: CircleLineProps) {
  const points = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }
    return new Float32Array(pts);
  }, [radius, segments]);

  return (
    <group position={[0, 0.15, 0]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={opacity} depthTest={false} />
      </line>
    </group>
  );
}
