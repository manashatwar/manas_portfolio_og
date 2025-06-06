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
  const [hovered, setHovered] = useState(false);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !outlineRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    outlineRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    
    // Rotation animation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    
    outlineRef.current.rotation.y = time * 0.2;
    outlineRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Scale based on hover and active state
    const targetScale = (hovered || isActive) ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    outlineRef.current.scale.lerp(new THREE.Vector3(targetScale * 1.05, targetScale * 1.05, targetScale * 1.05), 0.1);
  });

  return (
    <group position={position}>
      {/* Outer wireframe */}
      <mesh
        ref={outlineRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshBasicMaterial
          color={data.color}
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
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color={data.color}
          transparent
          opacity={hovered || isActive ? 0.8 : 0.4}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Block Label */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.3}
        color={data.color}
        anchorX="center"
        anchorY="middle"
      >
        {data.name}
      </Text>

      {/* Project Count */}
      <Text
        position={[0, -2.3, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.count} project{data.count !== 1 ? 's' : ''}
      </Text>

      {/* Glow effect when hovered or active */}
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          color={data.color}
          distance={10}
          decay={2}
        />
      )}

      {/* Particle burst effect when active */}
      {isActive && <ParticleBurst color={data.color} />}
    </group>
  );
};

// Particle burst effect component
const ParticleBurst: React.FC<{ color: string }> = ({ color }) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle geometry
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Random positions around the block
    positions[i * 3] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

    // Random velocities
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Block3D;