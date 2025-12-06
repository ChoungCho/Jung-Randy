// ===== PATHFINDING UTILITIES =====
import * as THREE from 'three';
import {
  BOSS_PLATFORM_X,
  BRIDGE_ENTRY_X,
  BRIDGE_EXIT_X,
  INNER_BOUND,
  BOSS_PLATFORM_HALF_SIZE,
  BRIDGE_HALF_WIDTH,
} from '../constants';

/**
 * Calculate path with waypoints for cross-zone movement
 * Handles Main Area <-> Bridge <-> Boss Platform transitions
 */
export function calculatePath(startPos: THREE.Vector3, targetPos: THREE.Vector3): THREE.Vector3[] {
  const innerBound = INNER_BOUND;
  const bossPlatformHalfSize = BOSS_PLATFORM_HALF_SIZE;
  const laneAnchor = (pos: THREE.Vector3) => {
    const maxLaneOffset = BRIDGE_HALF_WIDTH - 0.1;
    if (Math.abs(pos.z) < 0.1) return 0;
    const sign = pos.z >= 0 ? 1 : -1;
    return sign * Math.min(Math.abs(pos.z), maxLaneOffset);
  };

  // Determine which zone each position is in
  const isInMain = (pos: THREE.Vector3) =>
    Math.abs(pos.x) <= innerBound && Math.abs(pos.z) <= innerBound;
  const isInBoss = (pos: THREE.Vector3) =>
    Math.abs(pos.x - BOSS_PLATFORM_X) <= bossPlatformHalfSize &&
    Math.abs(pos.z) <= bossPlatformHalfSize;
  const isOnBridge = (pos: THREE.Vector3) =>
    pos.x >= BRIDGE_ENTRY_X && pos.x <= BRIDGE_EXIT_X && Math.abs(pos.z) <= 1.0;

  const startInMain = isInMain(startPos);
  const startInBoss = isInBoss(startPos);
  const startOnBridge = isOnBridge(startPos);

  const targetInMain = isInMain(targetPos);
  const targetInBoss = isInBoss(targetPos);
  const targetOnBridge = isOnBridge(targetPos);

  // Bridge waypoints
  const laneZ = Math.abs(startPos.z) > 0.1 ? laneAnchor(startPos) : laneAnchor(targetPos);
  const bridgeEntry = new THREE.Vector3(BRIDGE_ENTRY_X + 0.5, 0, laneZ);
  const bridgeExit = new THREE.Vector3(BRIDGE_EXIT_X - 0.5, 0, laneZ);

  // Main to Boss: go through bridge
  if (startInMain && targetInBoss) {
    return [bridgeEntry, bridgeExit, targetPos];
  }

  // Boss to Main: go through bridge
  if (startInBoss && targetInMain) {
    return [bridgeExit, bridgeEntry, targetPos];
  }

  // Main to Bridge
  if (startInMain && targetOnBridge) {
    return [bridgeEntry, targetPos];
  }

  // Boss to Bridge
  if (startInBoss && targetOnBridge) {
    return [bridgeExit, targetPos];
  }

  // Bridge to Main
  if (startOnBridge && targetInMain) {
    return [bridgeEntry, targetPos];
  }

  // Bridge to Boss
  if (startOnBridge && targetInBoss) {
    return [bridgeExit, targetPos];
  }

  // Same zone or already on bridge - direct path
  return [targetPos];
}

/**
 * Clamp a position to the nearest valid walkable area
 */
export function clampToWalkableArea(intersection: THREE.Vector3): THREE.Vector3 {
  const innerBound = INNER_BOUND;
  const bossPlatformHalfSize = BOSS_PLATFORM_HALF_SIZE;
  const bridgeStartX = BRIDGE_ENTRY_X;
  const bridgeEndX = BRIDGE_EXIT_X;
  const bridgeHalfWidth = 1.0;

  // Check which area the click is in
  const isInMainArea = Math.abs(intersection.x) <= innerBound && Math.abs(intersection.z) <= innerBound;
  const isOnBridge = intersection.x >= bridgeStartX &&
                    intersection.x <= bridgeEndX &&
                    Math.abs(intersection.z) <= bridgeHalfWidth;
  const isInBossArea = Math.abs(intersection.x - BOSS_PLATFORM_X) <= bossPlatformHalfSize &&
                      Math.abs(intersection.z) <= bossPlatformHalfSize;

  if (isInMainArea || isOnBridge || isInBossArea) {
    return intersection.clone();
  }

  // Click is outside - find nearest valid point
  let clampedX = Math.max(-innerBound, Math.min(innerBound, intersection.x));
  let clampedZ = Math.max(-innerBound, Math.min(innerBound, intersection.z));

  // Check if boss area is closer
  const distToMain = Math.sqrt(
    Math.pow(intersection.x - clampedX, 2) + Math.pow(intersection.z - clampedZ, 2)
  );

  const bossClampedX = Math.max(BOSS_PLATFORM_X - bossPlatformHalfSize, Math.min(BOSS_PLATFORM_X + bossPlatformHalfSize, intersection.x));
  const bossClampedZ = Math.max(-bossPlatformHalfSize, Math.min(bossPlatformHalfSize, intersection.z));
  const distToBoss = Math.sqrt(
    Math.pow(intersection.x - bossClampedX, 2) + Math.pow(intersection.z - bossClampedZ, 2)
  );

  // Check if bridge is closer
  const bridgeClampedX = Math.max(bridgeStartX, Math.min(bridgeEndX, intersection.x));
  const bridgeClampedZ = Math.max(-bridgeHalfWidth, Math.min(bridgeHalfWidth, intersection.z));
  const distToBridge = intersection.x >= bridgeStartX && intersection.x <= bridgeEndX
    ? Math.abs(intersection.z) > bridgeHalfWidth ? Math.abs(intersection.z) - bridgeHalfWidth : 0
    : Infinity;

  if (distToBoss < distToMain && distToBoss < distToBridge) {
    clampedX = bossClampedX;
    clampedZ = bossClampedZ;
  } else if (distToBridge < distToMain && distToBridge !== Infinity) {
    clampedX = bridgeClampedX;
    clampedZ = bridgeClampedZ;
  }

  return new THREE.Vector3(clampedX, 0, clampedZ);
}
