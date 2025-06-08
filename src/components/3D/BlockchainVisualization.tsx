import React, { useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Block3D from './Block3D';
import ParticleSystem from './ParticleSystem';
import { projectCategories } from '../../data/projects';

interface BlockchainVisualizationProps {
  onBlockClick: (category: string) => void;
  activeBlock: string | null;
}

const BlockchainVisualization: React.FC<BlockchainVisualizationProps> = ({
  onBlockClick,
  activeBlock
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Block positions in 3D space - more spread out for better visibility
  const blockPositions = useMemo(() => [
    { category: 'blockchain', position: [-6, 2, 0] as [number, number, number] },
    { category: 'web3', position: [0, 0, 3] as [number, number, number] },
    { category: 'dapp', position: [6, 2, 0] as [number, number, number] },
    { category: 'defi', position: [-3, -3, -2] as [number, number, number] },
    { category: 'smart-contracts', position: [3, -3, -2] as [number, number, number] }
  ], []);

  const Scene = useCallback(() => (
    <>
      {/* Lighting setup for better visibility */}
      <ambientLight intensity={0.6} />
      
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#94a3b8" />
      <pointLight position={[10, -10, -5]} intensity={0.8} color="#94a3b8" />

      {/* Render blocks */}
      {blockPositions.map(({ category, position }) => {
        const categoryData = projectCategories[category as keyof typeof projectCategories];
        if (!categoryData) return null;
        
        return (
          <Block3D
            key={category}
            position={position}
            category={category}
            data={categoryData}
            isActive={activeBlock === category}
            onClick={() => onBlockClick(category)}
          />
        );
      })}

      {/* Connection lines between blocks */}
      {blockPositions.map((block, index) => (
        blockPositions.slice(index + 1).map((nextBlock, nextIndex) => (
          <Line3D
            key={`${block.category}-${nextBlock.category}`}
            start={block.position}
            end={nextBlock.position}
          />
        ))
      )).flat()}

      {/* Particle system */}
      <ParticleSystem count={80} />

      {/* Background grid */}
      <BackgroundGrid />
    </>
  ), [blockPositions, activeBlock, onBlockClick]);

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 15], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxDistance={25}
          minDistance={8}
          maxPolarAngle={Math.PI / 1.3}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

// Connection line component
const Line3D: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ 
  start, 
  end 
}) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color="#64748b" 
        opacity={0.2} 
        transparent 
      />
    </line>
  );
};

// Background grid component
const BackgroundGrid: React.FC = () => {
  return (
    <gridHelper 
      args={[40, 40, '#475569', '#334155']} 
      position={[0, -10, 0]}
    />
  );
};

export default BlockchainVisualization;