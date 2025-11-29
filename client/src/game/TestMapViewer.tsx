/**
 * Minimal Asset Viewer
 * Access: http://localhost:3000/test
 * Shows only:
 * - Boss Platform (assets/terrain/boss_platform.glb)
 * - Cartoon Girl (assets/characters/cartoon_girl.glb)
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Grid, Stats } from '@react-three/drei';
import React, { Suspense, useMemo, useState } from 'react';
import * as THREE from 'three';

type ModelInfo = {
  id: string;
  name: string;
  path: string;
  defaultScale?: number;
};

const MODELS: ModelInfo[] = [
  { id: 'boss', name: 'Boss Platform', path: '/assets/terrain/boss_platform.glb', defaultScale: 1 },
  { id: 'girl', name: 'Cartoon Girl (Sketchfab)', path: '/assets/characters/cartoon_girl.glb', defaultScale: 1 },
];

MODELS.forEach((m) => useGLTF.preload(m.path));

function LoadedModel({ path, scale }: { path: string; scale: number }) {
  const { scene } = useGLTF(path);

  const processed = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const min = box.min.clone();

    // center and drop to ground
    cloned.position.sub(center);
    cloned.position.y -= min.y;

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return <primitive object={processed} scale={scale} />;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

function Scene({
  modelPath,
  scale,
  showGrid,
}: {
  modelPath: string;
  scale: number;
  showGrid: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.55} color="#ffffff" />
      <hemisphereLight args={['#ffffff', '#1a1a2e', 0.35]} />
      <directionalLight
        position={[6, 12, 8]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight position={[-6, 8, -6]} intensity={0.6} color="#ffffff" />

      {showGrid && (
        <Grid
          args={[30, 30]}
          cellSize={1}
          cellThickness={0.4}
          cellColor="#444"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#777"
          fadeDistance={60}
          position={[0, -0.01, 0]}
        />
      )}

      <Suspense fallback={<LoadingFallback />}>
        <LoadedModel path={modelPath} scale={scale} />
      </Suspense>
    </>
  );
}

export default function TestMapViewer() {
  const [showStats, setShowStats] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('boss');
  const [scale, setScale] = useState<number>(1);

  const selectedModel = MODELS.find((m) => m.id === selectedId) ?? MODELS[0];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f1116' }}>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          padding: '18px',
          borderRadius: '10px',
          color: 'white',
          fontFamily: 'monospace',
          maxWidth: '320px',
        }}
      >
        <h2 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>Viewer</h2>

        <div style={{ marginBottom: '12px' }}>
          <strong>Model</strong>
          <select
            value={selectedId}
            onChange={(e) => {
              const next = e.target.value;
              setSelectedId(next);
              const preset = MODELS.find((m) => m.id === next);
              if (preset?.defaultScale) setScale(preset.defaultScale);
            }}
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '6px 8px',
              background: '#111',
              color: 'white',
              border: '1px solid #444',
            }}
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            File: {selectedModel.path.replace('/assets/', '')}
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong>Scale</strong>
          <input
            type="range"
            min={0.2}
            max={2}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <div style={{ fontSize: '12px', color: '#888' }}>x {scale.toFixed(2)}</div>
        </div>

        <label
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}
        >
          <input type="checkbox" checked={showStats} onChange={(e) => setShowStats(e.target.checked)} />
          Show FPS Stats
        </label>

        <label
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}
        >
          <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
          Show Grid
        </label>

        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
          <strong>Controls:</strong>
          <br />• Left drag: Orbit
          <br />• Right drag: Pan
          <br />• Scroll: Zoom
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [6, 5, 8], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ReinhardToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {showStats && <Stats />}
        <fog attach="fog" args={['#0f1116', 15, 45]} />
        <Scene modelPath={selectedModel.path} scale={scale} showGrid={showGrid} />
        <OrbitControls
          makeDefault
          minDistance={2}
          maxDistance={25}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2 - 0.15}
        />
      </Canvas>
    </div>
  );
}
