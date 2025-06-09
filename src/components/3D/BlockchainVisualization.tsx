import React, { useRef, useMemo, useCallback, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Block3D from './Block3D';
import ParticleSystem from './ParticleSystem';
import FallbackVisualization from './FallbackVisualization';
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
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Detect mobile and WebGL support
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        setWebGLSupported(!!gl);
      } catch (e) {
        console.warn('WebGL not supported, falling back to 2D visualization');
        setWebGLSupported(false);
      }
    };

    checkMobile();
    checkWebGL();
    
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Error boundary for 3D canvas
  const handleCanvasError = useCallback((error: any) => {
    console.warn('3D Canvas error, falling back to 2D visualization:', error);
    setHasError(true);
    setWebGLSupported(false);
  }, []);

  // Responsive block positions
  const blockPositions = useMemo(() => {
    if (isMobile) {
      // Tighter, more vertical layout for mobile
      return [
        { category: 'blockchain', position: [0, 4, 0] as [number, number, number] },
        { category: 'smart-contracts', position: [0, 2, 0] as [number, number, number] },
        { category: 'dapp', position: [0, 0, 0] as [number, number, number] },
        { category: 'defi', position: [0, -2, 0] as [number, number, number] },
        { category: 'web3', position: [-3, 1, 0] as [number, number, number] },
        { category: 'research', position: [3, -1, 0] as [number, number, number] }
      ];
    } else {
      // Spread out layout for desktop
      return [
        { category: 'blockchain', position: [0, 4, 0] as [number, number, number] },
        { category: 'smart-contracts', position: [0, 2, 0] as [number, number, number] },
        { category: 'dapp', position: [0, 0, 0] as [number, number, number] },
        { category: 'defi', position: [0, -2, 0] as [number, number, number] },
        { category: 'web3', position: [-5, 2, 0] as [number, number, number] },
        { category: 'research', position: [5, 0, 0] as [number, number, number] }
      ];
    }
  }, [isMobile]);

  const Scene = useCallback(() => {
    try {
      return (
        <>
          {/* Responsive lighting setup */}
          <ambientLight intensity={isMobile ? 0.4 : 0.6} />
          
          <directionalLight
            position={[10, 10, 5]}
            intensity={isMobile ? 0.8 : 1.2}
            color="#ffffff"
            castShadow={!isMobile} // Disable shadows on mobile for performance
            shadow-mapSize-width={isMobile ? 1024 : 2048}
            shadow-mapSize-height={isMobile ? 1024 : 2048}
          />
          
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#00ffff" />
          <pointLight position={[10, -10, -5]} intensity={0.6} color="#007fff" />

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
                isMobile={isMobile}
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
                isMobile={isMobile}
              />
            ))
          )).flat()}

          {/* Particle system with mobile optimization */}
          <ParticleSystem count={isMobile ? 40 : 80} />

          {/* Background grid */}
          <BackgroundGrid isMobile={isMobile} />
        </>
      );
    } catch (error) {
      console.warn('Scene rendering error:', error);
      return null;
    }
  }, [blockPositions, activeBlock, onBlockClick, isMobile]);

  // Fallback for devices without WebGL support or errors
  if (!webGLSupported || hasError) {
    return (
      <FallbackVisualization 
        onBlockClick={onBlockClick}
        activeBlock={activeBlock}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-slate-950 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-sm">Initializing Blockchain Network...</p>
          </div>
        </motion.div>
      )}

      {/* 3D Canvas with error handling */}
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: isMobile ? [0, 0, 18] : [0, 0, 15], 
          fov: isMobile ? 65 : 50,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 2 : 3)
        }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
        performance={{ min: isMobile ? 0.3 : 0.5 }} // Lower performance threshold for mobile
        onError={handleCanvasError}
        onCreated={(state) => {
          // Ensure canvas is properly initialized
          state.gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        
        {/* Camera controls with mobile optimization */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxDistance={isMobile ? 30 : 25}
          minDistance={isMobile ? 12 : 8}
          maxPolarAngle={Math.PI / 1.3}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={isMobile ? 0.2 : 0.3} // Slower rotation on mobile
          enableDamping={true}
          dampingFactor={0.05}
          touchAction="pan-y" // Better touch handling on mobile
        />
      </Canvas>

      {/* Mobile-optimized UI overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Block labels with responsive positioning */}
        {blockPositions.map(({ category, position }) => {
          const categoryData = projectCategories[category as keyof typeof projectCategories];
          if (!categoryData) return null;

          // Calculate screen position based on 3D position
          const screenX = ((position[0] / (isMobile ? 6 : 10)) + 0.5) * 100;
          const screenY = ((-position[1] / (isMobile ? 8 : 10)) + 0.5) * 100;

          return (
            <motion.div
              key={category}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${Math.max(10, Math.min(90, screenX))}%`, 
                top: `${Math.max(10, Math.min(90, screenY))}%` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span 
                className={`${isMobile ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'} font-medium bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg text-white`}
                style={{ color: categoryData.color }}
              >
                {isMobile && categoryData.name.length > 10 
                  ? categoryData.name.split(' ')[0] 
                  : categoryData.name
                }
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Technical data overlay - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className={`absolute ${isMobile ? 'bottom-2 left-2' : 'bottom-4 left-4'} glass-card ${isMobile ? 'px-2 py-1' : 'px-3 py-2'} z-20`}
      >
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-300 font-mono space-y-1`}>
          <div className="text-slate-400">Network Status</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">ACTIVE</span>
          </div>
          <div className="text-slate-500">
            Blocks: {Object.keys(projectCategories).length}
          </div>
        </div>
      </motion.div>

      {/* Interaction hint - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className={`absolute ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} glass-card ${isMobile ? 'px-2 py-1' : 'px-3 py-2'} z-20`}
      >
        <p className={`text-slate-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <span className="text-slate-100 font-medium">
            {isMobile ? 'Tap' : 'Click'}:
          </span>{' '}
          {isMobile ? 'Explore' : 'Explore projects'}
        </p>
      </motion.div>

      {/* Performance indicator for mobile */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="absolute top-2 right-2 glass-card px-2 py-1 z-20"
        >
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <span className="text-xs text-slate-400">Optimized</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced connection line component with mobile optimization
const Line3D: React.FC<{ 
  start: [number, number, number]; 
  end: [number, number, number];
  isMobile?: boolean;
}> = ({ start, end, isMobile = false }) => {
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
        color="#00ffff" 
        opacity={isMobile ? 0.3 : 0.4} 
        transparent 
        linewidth={isMobile ? 1 : 2}
      />
    </line>
  );
};

// Enhanced background grid component
const BackgroundGrid: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  return (
    <gridHelper 
      args={[
        isMobile ? 30 : 40, // Smaller grid on mobile
        isMobile ? 30 : 40, 
        '#475569', 
        '#334155'
      ]} 
      position={[0, -10, 0]}
    />
  );
};

export default BlockchainVisualization;