import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Block3DProps {
  position: [number, number, number];
  category: string;
  data: {
    name: string;
    color: string;
    count: number;
  };
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const Block3D: React.FC<Block3DProps> = ({ 
  position, 
  category, 
  data, 
  isActive, 
  onClick,
  isMobile = false
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.Mesh>(null);
  const chainRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animation loop with mobile optimization
  useFrame((state) => {
    if (!meshRef.current || !outlineRef.current || !chainRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Reduced animation intensity on mobile
    const animationIntensity = isMobile ? 0.5 : 1;
    
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * (0.2 * animationIntensity);
    outlineRef.current.position.y = position[1] + Math.sin(time + position[0]) * (0.2 * animationIntensity);
    
    // Subtle rotation - slower on mobile
    const rotationSpeed = isMobile ? 0.1 : 0.2;
    meshRef.current.rotation.y = time * rotationSpeed;
    meshRef.current.rotation.x = Math.sin(time * 0.15) * (0.05 * animationIntensity);
    
    outlineRef.current.rotation.y = time * rotationSpeed;
    outlineRef.current.rotation.x = Math.sin(time * 0.15) * (0.05 * animationIntensity);

    // Chain links rotation - slower on mobile
    chainRef.current.rotation.y = time * (isMobile ? 0.04 : 0.08);

    // Scale based on hover and active state
    const targetScale = (hovered || isActive) ? (isMobile ? 1.1 : 1.2) : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    outlineRef.current.scale.lerp(new THREE.Vector3(targetScale * 1.03, targetScale * 1.03, targetScale * 1.03), 0.08);
  });

  // Convert hex color to THREE.Color
  const blockColor = new THREE.Color(data.color);

  // Responsive sizing
  const blockSize = isMobile ? 1.2 : 1.6;
  const outlineSize = isMobile ? 1.4 : 1.8;
  const coreSize = isMobile ? 0.4 : 0.6;
  const chainRadius = isMobile ? 2 : 2.5;
  const chainCount = isMobile ? 4 : 6; // Fewer chain links on mobile

  return (
    <group position={position}>
      {/* Chain Links around the block - fewer on mobile */}
      <group ref={chainRef}>
        {[...Array(chainCount)].map((_, i) => {
          const angle = (i / chainCount) * Math.PI * 2;
          const x = Math.cos(angle) * chainRadius;
          const z = Math.sin(angle) * chainRadius;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <torusGeometry args={[isMobile ? 0.15 : 0.2, isMobile ? 0.06 : 0.08, 6, 12]} />
              <meshStandardMaterial
                color={blockColor}
                transparent
                opacity={0.4}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Outer wireframe */}
      <mesh
        ref={outlineRef}
        onPointerOver={() => !isMobile && setHovered(true)} // Disable hover on mobile
        onPointerOut={() => !isMobile && setHovered(false)}
        onClick={onClick}
      >
        <octahedronGeometry args={[outlineSize]} />
        <meshBasicMaterial
          color={blockColor}
          transparent
          opacity={hovered || isActive ? 0.6 : 0.2}
          wireframe
        />
      </mesh>

      {/* Main block */}
      <mesh
        ref={meshRef}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => !isMobile && setHovered(false)}
        onClick={onClick}
        castShadow={!isMobile} // Disable shadows on mobile
        receiveShadow={!isMobile}
      >
        <octahedronGeometry args={[blockSize]} />
        <meshStandardMaterial
          color={blockColor}
          transparent
          opacity={hovered || isActive ? 0.8 : 0.6}
          roughness={0.2}
          metalness={0.7}
          emissive={blockColor}
          emissiveIntensity={hovered || isActive ? 0.2 : 0.05}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[coreSize]} />
        <meshStandardMaterial
          color={blockColor}
          transparent
          opacity={0.3}
          emissive={blockColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Block Label - responsive sizing */}
      <Text
        position={[0, isMobile ? -2 : -2.2, 0]}
        fontSize={isMobile ? 0.25 : 0.3}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={isMobile ? 3 : 4}
      >
        {isMobile && data.name.length > 10 ? data.name.split(' ')[0] : data.name}
      </Text>

      {/* Project Count - responsive sizing */}
      <Text
        position={[0, isMobile ? -2.5 : -2.8, 0]}
        fontSize={isMobile ? 0.15 : 0.2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {data.count} project{data.count !== 1 ? 's' : ''}
      </Text>

      {/* Enhanced lighting when hovered or active - reduced intensity on mobile */}
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0, 0]}
          intensity={isMobile ? 1 : 2}
          color={blockColor}
          distance={isMobile ? 8 : 12}
          decay={2}
        />
      )}
    </group>
  );
};

export default Block3D;