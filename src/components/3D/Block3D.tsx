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
}

const Block3D: React.FC<Block3DProps> = ({ 
  position, 
  category, 
  data, 
  isActive, 
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.Mesh>(null);
  const chainRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !outlineRef.current || !chainRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    outlineRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    
    // Subtle rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;
    
    outlineRef.current.rotation.y = time * 0.2;
    outlineRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;

    // Chain links rotation
    chainRef.current.rotation.y = time * 0.08;

    // Scale based on hover and active state
    const targetScale = (hovered || isActive) ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    outlineRef.current.scale.lerp(new THREE.Vector3(targetScale * 1.03, targetScale * 1.03, targetScale * 1.03), 0.08);
  });

  // Convert hex color to THREE.Color
  const blockColor = new THREE.Color(data.color);

  return (
    <group position={position}>
      {/* Chain Links around the block */}
      <group ref={chainRef}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 2.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <torusGeometry args={[0.2, 0.08, 6, 12]} />
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
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <octahedronGeometry args={[1.8]} />
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
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <octahedronGeometry args={[1.6]} />
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
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial
          color={blockColor}
          transparent
          opacity={0.3}
          emissive={blockColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Block Label */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.3}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {data.name}
      </Text>

      {/* Project Count */}
      <Text
        position={[0, -2.8, 0]}
        fontSize={0.2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {data.count} project{data.count !== 1 ? 's' : ''}
      </Text>

      {/* Enhanced lighting when hovered or active */}
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          color={blockColor}
          distance={12}
          decay={2}
        />
      )}
    </group>
  );
};

export default Block3D;