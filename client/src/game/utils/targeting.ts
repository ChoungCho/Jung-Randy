// ===== TARGETING HELPERS =====
import * as THREE from 'three';
import { MonsterData, TargetingMode } from '../types';
import { TARGET_CLUSTER_RADIUS } from '../constants';

interface TargetCandidate {
  id: string;
  hp: number;
  maxHp: number;
  isBoss: boolean;
  pos: THREE.Vector3;
  dist: number;
}

interface Bucket {
  key: string;
  items: TargetCandidate[];
}

// Build lightweight spatial buckets to score clusters without O(n^2) cost
function buildBuckets(candidates: TargetCandidate[], cellSize: number): Map<string, Bucket> {
  const buckets = new Map<string, Bucket>();
  candidates.forEach((c) => {
    const key = `${Math.floor(c.pos.x / cellSize)}:${Math.floor(c.pos.z / cellSize)}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.items.push(c);
    } else {
      buckets.set(key, { key, items: [c] });
    }
  });
  return buckets;
}

function computeClusterScores(candidates: TargetCandidate[], radius: number): Map<string, number> {
  const buckets = buildBuckets(candidates, radius);
  const radiusSq = radius * radius;
  const scores = new Map<string, number>();

  const neighborOffsets = [
    [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  candidates.forEach((c) => {
    const cellX = Math.floor(c.pos.x / radius);
    const cellZ = Math.floor(c.pos.z / radius);
    let count = 0;

    neighborOffsets.forEach(([dx, dz]) => {
      const key = `${cellX + dx}:${cellZ + dz}`;
      const bucket = buckets.get(key);
      if (!bucket) return;
      bucket.items.forEach((other) => {
        const distSq = c.pos.distanceToSquared(other.pos);
        if (distSq <= radiusSq) {
          count += 1;
        }
      });
    });

    scores.set(c.id, count);
  });

  return scores;
}

export interface PickedTarget {
  id: string;
  pos: THREE.Vector3;
  dist: number;
  hp: number;
  isBoss: boolean;
}

// Core selector used by player units
export function pickTarget(
  monsters: MonsterData[],
  monsterPosRefs: Map<string, THREE.Vector3>,
  currentPos: THREE.Vector3,
  attackRange: number,
  mode: TargetingMode
): PickedTarget | null {
  const rangeSq = attackRange * attackRange;

  const candidates: TargetCandidate[] = [];
  monsters.forEach((m) => {
    if (m.isDying) return;
    const pos = monsterPosRefs.get(m.id);
    if (!pos) return;
    const distSq = currentPos.distanceToSquared(pos);
    if (distSq <= rangeSq) {
      candidates.push({
        id: m.id,
        hp: m.hp,
        maxHp: m.maxHp,
        isBoss: m.isBoss,
        pos,
        dist: Math.sqrt(distSq),
      });
    }
  });

  if (candidates.length === 0) return null;

  const clusterScores = mode === 'clustered'
    ? computeClusterScores(candidates, TARGET_CLUSTER_RADIUS)
    : null;

  let best: TargetCandidate | null = null;

  const updateBest = (candidate: TargetCandidate) => {
    if (!best) {
      best = candidate;
      return;
    }
    const byDist = candidate.dist < best.dist - 0.05;
    if (byDist) {
      best = candidate;
    }
  };

  switch (mode) {
    case 'boss_first': {
      const bosses = candidates.filter(c => c.isBoss);
      if (bosses.length > 0) {
        bosses.sort((a, b) => a.dist - b.dist);
        best = bosses[0];
        break;
      }
      candidates.sort((a, b) => a.dist - b.dist);
      best = candidates[0];
      break;
    }
    case 'lowest_hp': {
      candidates.forEach((c) => {
        if (!best) {
          best = c;
          return;
        }
        if (c.hp < best.hp - 0.1) {
          best = c;
          return;
        }
        if (c.hp === best.hp) {
          updateBest(c);
        }
      });
      break;
    }
    case 'highest_hp': {
      candidates.forEach((c) => {
        if (!best) {
          best = c;
          return;
        }
        if (c.hp > best.hp + 0.1) {
          best = c;
          return;
        }
        if (c.hp === best.hp) {
          updateBest(c);
        }
      });
      break;
    }
    case 'clustered': {
      candidates.forEach((c) => {
        const score = clusterScores?.get(c.id) ?? 0;
        if (!best) {
          best = c;
          return;
        }
        const bestScore = clusterScores?.get(best.id) ?? 0;
        if (score > bestScore) {
          best = c;
          return;
        }
        if (score === bestScore) {
          updateBest(c);
        }
      });
      break;
    }
    case 'closest':
    default: {
      candidates.sort((a, b) => a.dist - b.dist);
      best = candidates[0];
      break;
    }
  }

  if (!best) return null;
  return {
    id: best.id,
    pos: best.pos,
    dist: best.dist,
    hp: best.hp,
    isBoss: best.isBoss,
  };
}
