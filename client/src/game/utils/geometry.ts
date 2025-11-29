// ===== GEOMETRY UTILITIES =====
import { LANE_OFFSET } from '../constants';

/**
 * Calculate position and rotation on the square monster path
 * @param progress 0-1 progress around the square path
 */
export function getPathPosition(progress: number) {
  const p = progress % 1;
  const side = Math.floor(p * 4);
  const sideProgress = (p * 4) % 1;

  let x = 0, z = 0, rotationY = 0;
  switch (side) {
    case 0:
      x = -LANE_OFFSET + sideProgress * LANE_OFFSET * 2;
      z = -LANE_OFFSET;
      rotationY = Math.PI / 2;
      break;
    case 1:
      x = LANE_OFFSET;
      z = -LANE_OFFSET + sideProgress * LANE_OFFSET * 2;
      rotationY = 0;
      break;
    case 2:
      x = LANE_OFFSET - sideProgress * LANE_OFFSET * 2;
      z = LANE_OFFSET;
      rotationY = -Math.PI / 2;
      break;
    case 3:
      x = -LANE_OFFSET;
      z = LANE_OFFSET - sideProgress * LANE_OFFSET * 2;
      rotationY = Math.PI;
      break;
  }
  return { x, z, rotationY };
}
