// ===== MOVE CLICK INDICATOR (Warcraft style) =====
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MoveIndicatorData } from '../types';

interface MoveIndicatorProps {
  data: MoveIndicatorData;
  onComplete: () => void;
}

export function MoveIndicator({ data, onComplete }: MoveIndicatorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const [scale, setScale] = useState(0.3);
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    const elapsed = (Date.now() - data.startTime) / 1000;
    const duration = 0.5; // Animation duration in seconds

    if (elapsed >= duration) {
      onComplete();
      return;
    }

    const progress = elapsed / duration;
    // Expand outward
    setScale(0.3 + progress * 0.7);
    // Fade out
    setOpacity(1 - progress);
  });

  const points = useMemo(() => {
    const pts: number[] = [];
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(Math.cos(angle), 0, Math.sin(angle));
    }
    return new Float32Array(pts);
  }, []);

  return (
    <group ref={groupRef} position={[data.position.x, 0.1, data.position.z]} scale={[scale, 1, scale]}>
      {/* Outer ring */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={materialRef} color="#00ff00" transparent opacity={opacity} linewidth={2} />
      </line>
      {/* Inner filled circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={opacity * 0.3} />
      </mesh>
    </group>
  );
}
