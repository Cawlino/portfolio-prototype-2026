import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    // Rotate shape slowly
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // React to scroll: Move mesh up/down or rotate faster based on scroll
    const scrollY = window.scrollY;
    meshRef.current.position.y = Math.sin(scrollY * 0.002) * 2;
    meshRef.current.rotation.z = scrollY * 0.001;

    // React to mouse
    const mouseX = (state.mouse.x * Math.PI) / 4;
    const mouseY = (state.mouse.y * Math.PI) / 4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[2, 0.6, 200, 32]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#8a2be2" 
          wireframe={true}
          emissive="#4b0082"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AbstractShape />
      </Canvas>
    </div>
  );
};
