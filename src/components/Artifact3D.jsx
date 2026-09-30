import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Artifact3D({ variant = 'hero' }) {
  const groupRef = useRef();
  const isContact = variant === 'contact';
  
  useFrame((state) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      groupRef.current.rotation.z += 0.0005;
      return;
    }
    const scrollY = window.scrollY;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, isContact ? 0 : -(scrollY * 0.001), 0.1);
    
    const targetX = (state.pointer.x * Math.PI) / 16;
    const targetY = (state.pointer.y * Math.PI) / 16;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    groupRef.current.rotation.z += isContact ? 0.002 : 0.001;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={isContact ? 0.5 : 0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 3.5, 64, 1, false, 0, Math.PI * 2]} />
          <MeshTransmissionMaterial backside samples={16} resolution={1024} thickness={1.5} ior={1.5} color="#ffffff" metalness={0.2} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[0, 1.75, 0]}>
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshTransmissionMaterial backside samples={16} thickness={1.5} ior={1.5} color="#ffffff" roughness={0.05} />
        </mesh>
        <mesh position={[0, -1.75, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshTransmissionMaterial backside samples={16} thickness={1.5} ior={1.5} color="#ffffff" roughness={0.05} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.2, 2.8, 16, 32]} />
          <meshStandardMaterial color={isContact ? "#121212" : "#d34a24"} emissive={isContact ? "#ffffff" : "#1a0a05"} emissiveIntensity={isContact ? 0.2 : 1} metalness={1} roughness={0.2} />
        </mesh>
      </Float>
      <Environment preset="studio" />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <ambientLight intensity={1} color="#f4f3ef" />
      <spotLight position={[-10, -10, 5]} intensity={1.5} color={isContact ? "#ffffff" : "#d34a24"} />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={10} blur={2.5} far={10} color="#121212" />
    </group>
  );
}
