import React, { useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
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

  // Block positions in 3D space
  const blockPositions = useMemo(() => [
    { category: 'defi', position: [-4, 2, 0] as [number, number, number] },
    { category: 'smart-contracts', position: [0, 0, 2] as [number, number, number] },
    { category: 'dapps', position: [4, 2, 0] as [number, number, number] },
    { category: 'nft', position: [-2, -2, -1] as [number, number, number] },
    { category: 'research', position: [2, -2, -1] as [number, number, number] }
  ], []);

  const Scene = useCallback(() => (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#00FFFF"
        castShadow
      />
      
      {/* Additional accent lights */}
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#007FFF" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#00FFFF" />

      {/* Render blocks */}
      {blockPositions.map(({ category, position }) => (
        <Block3D
          key={category}
          position={position}
          category={category}
          data={projectCategories[category as keyof typeof projectCategories]}
          isActive={activeBlock === category}
          onClick={() => onBlockClick(category)}
        />
      ))}

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
      <ParticleSystem count={100} />

      {/* Background grid */}
      <BackgroundGrid />
    </>
  ), [blockPositions, activeBlock, onBlockClick]);

  return (
    <motion.div 
      className="relative w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900 opacity-50 z-10 pointer-events-none" />
      
      {/* 3D Canvas */}
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 10], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxDistance={20}
          minDistance={5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div 
          className="glass-card px-6 py-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-300 text-sm text-center">
            Click and drag to explore • Click blocks to view projects
          </p>
        </motion.div>
      </div>
    </motion.div>
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
        color="#00FFFF" 
        opacity={0.3} 
        transparent 
      />
    </line>
  );
};

// Background grid component
const BackgroundGrid: React.FC = () => {
  return (
    <gridHelper 
      args={[50, 50, '#00FFFF', '#007FFF']} 
      position={[0, -8, 0]}
    />
  );
};

export default BlockchainVisualization;