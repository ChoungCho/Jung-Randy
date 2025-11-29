// ===== GENERIC GLB SURFACE (auto center, ground, scale to target XY) =====
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ScaledGLBSurfaceProps {
  path: string;
  targetSize: number;
  position?: [number, number, number];
  yOffset?: number;
  shadow?: boolean;
}

export function ScaledGLBSurface({
  path,
  targetSize,
  position = [0, 0, 0],
  yOffset = 0,
  shadow = true,
}: ScaledGLBSurfaceProps) {
  const { scene } = useGLTF(path);

  const processed = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxSide = Math.max(size.x, size.z, 0.0001);
    const scale = targetSize / maxSide;

    cloned.scale.setScalar(scale);
    cloned.updateWorldMatrix(true, true);

    const box2 = new THREE.Box3().setFromObject(cloned);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);

    cloned.position.sub(center2);
    cloned.position.y -= box2.min.y; // sit on ground
    return cloned;
  }, [scene, targetSize]);

  useMemo(() => {
    processed.traverse((c) => {
      if (c instanceof THREE.Mesh) {
        c.castShadow = shadow;
        c.receiveShadow = shadow;
      }
    });
  }, [processed, shadow]);

  return <primitive object={processed} position={[position[0], position[1] + yOffset, position[2]]} />;
}
