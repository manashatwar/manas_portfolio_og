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
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
    outlineRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
    
    // Rotation animation - more blockchain-like
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    outlineRef.current.rotation.y = time * 0.3;
    outlineRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Chain links rotation
    chainRef.current.rotation.y = time * 0.1;

    // Scale based on hover and active state
    const targetScale = (hovered || isActive) ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    outlineRef.current.scale.lerp(new THREE.Vector3(targetScale * 1.05, targetScale * 1.05, targetScale * 1.05), 0.1);
  });

  return (
    <group position={position}>
      {/* Chain Links around the block */}
      <group ref={chainRef}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <torusGeometry args={[0.3, 0.1, 8, 16]} />
              <meshPhysicalMaterial
                color={data.color}
                transparent
                opacity={0.6}
                metalness={0.8}
                roughness={0.2}
                emissive={data.color}
                emissiveIntensity={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Outer wireframe - more geometric */}
      <mesh
        ref={outlineRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <octahedronGeometry args={[2.2]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={hovered || isActive ? 0.8 : 0.3}
          wireframe
        />
      </mesh>

      {/* Main block - octahedron for more blockchain feel */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <octahedronGeometry args={[2]} />
        <meshPhysicalMaterial
          color={data.color}
          transparent
          opacity={hovered || isActive ? 0.9 : 0.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={data.color}
          emissiveIntensity={hovered || isActive ? 0.3 : 0.1}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.8]} />
        <meshPhysicalMaterial
          color={data.color}
          transparent
          opacity={0.4}
          emissive={data.color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Block Label */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.4}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {data.name}
      </Text>

      {/* Project Count */}
      <Text
        position={[0, -3.2, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.count} project{data.count !== 1 ? 's' : ''}
      </Text>

      {/* Enhanced glow effect when hovered or active */}
      {(hovered || isActive) && (
        <>
          <pointLight
            position={[0, 0, 0]}
            intensity={3}
            color={data.color}
            distance={15}
            decay={2}
          />
          <pointLight
            position={[2, 2, 2]}
            intensity={1.5}
            color={data.color}
            distance={10}
            decay={2}
          />
        </>
      )}

      {/* Particle burst effect when active */}
      {isActive && <ParticleBurst color={data.color} />}

      {/* Data streams */}
      {(hovered || isActive) && <DataStreams color={data.color} />}
    </group>
  );
};

// Enhanced particle burst effect
const ParticleBurst: React.FC<{ color: string }> = ({ color }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

    velocities[i * 3] = (Math.random() - 0.5) * 0.05;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
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
        size={0.08}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Data streams effect
const DataStreams: React.FC<{ color: string }> = ({ color }) => {
  const streamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!streamRef.current) return;
    streamRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={streamRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <cylinderGeometry args={[0.02, 0.02, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Block3D;