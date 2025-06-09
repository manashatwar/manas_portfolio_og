import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ count }) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle data with mobile optimization
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#00ffff'), // Cyan
      new THREE.Color('#007fff'), // Blue
      new THREE.Color('#94a3b8'), // Slate-400
      new THREE.Color('#64748b'), // Slate-500
    ];

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere - smaller radius for mobile
      const radius = Math.random() * (count < 50 ? 15 : 20);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random sizes - smaller for mobile
      sizes[i] = Math.random() * (count < 50 ? 1 : 1.5) + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  // Animation with mobile optimization
  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Reduced animation frequency for mobile
    const isMobile = count < 50;
    const animationSpeed = isMobile ? 0.2 : 0.3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time * animationSpeed + positions[i3]) * 0.001;
      
      // Subtle rotation around center - slower on mobile
      const x = positions[i3];
      const z = positions[i3 + 2];
      const angle = Math.atan2(z, x) + (isMobile ? 0.0003 : 0.0005);
      const radius = Math.sqrt(x * x + z * z);
      
      positions[i3] = radius * Math.cos(angle);
      positions[i3 + 2] = radius * Math.sin(angle);
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={count < 50 ? 0.06 : 0.08} // Smaller particles on mobile
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;