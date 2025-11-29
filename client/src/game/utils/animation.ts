// ===== ANIMATION UTILITIES =====
import * as THREE from 'three';

/**
 * Remove root motion from animation clip to prevent character sliding
 */
export function removeRootMotion(clip: THREE.AnimationClip) {
  clip.tracks = clip.tracks.filter(track => {
    const isRootPositionTrack =
      track.name.includes('Hips.position') ||
      track.name.includes('mixamorigHips.position');
    return !isRootPositionTrack;
  });
  if (clip.duration > 0.04) {
    clip.duration -= 0.04;
  }
  return clip;
}
