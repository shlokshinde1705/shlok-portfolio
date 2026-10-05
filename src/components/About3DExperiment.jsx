import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, ContactShadows, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

const MainPortraitWithPanels = () => {
  const texture = useTexture('/shlok-sketch.png');
  const ref = useRef(null);
  const planesRef = useRef(null);
  
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const floatY = Math.sin(elapsed * 1.25) * 0.04;
    const floatX = Math.cos(elapsed * 0.85) * 0.01;
    const floatRotZ = Math.sin(elapsed * 0.95) * 0.003;

    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.02 + floatX, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.02 + floatY, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.01, 0.05);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.01, 0.05);
      ref.current.rotation.z = floatRotZ;
    }
    if (planesRef.current) {
      planesRef.current.position.x = THREE.MathUtils.lerp(planesRef.current.position.x, state.pointer.x * 0.01, 0.05);
      planesRef.current.position.y = THREE.MathUtils.lerp(planesRef.current.position.y, state.pointer.y * 0.01, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* BACKGROUND EMBEDDED PANELS (Very slow parallax) */}
      <group ref={planesRef}>
        {/* Rough warm-grey paper plane */}
        <mesh position={[-0.2, 0.5, -0.6]} rotation={[0, 0, 0.02]} castShadow receiveShadow>
          <planeGeometry args={[5.8, 8.0]} />
          <meshStandardMaterial color="#D8D5CE" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Darker charcoal panel */}
        <mesh position={[0.4, -0.2, -0.4]} rotation={[0, 0, -0.04]} castShadow receiveShadow>
          <planeGeometry args={[4.5, 7.5]} />
          <meshStandardMaterial color="#202020" roughness={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Off-white thin matte panel */}
        <mesh position={[0, 0, -0.2]} rotation={[0, 0, 0.01]} castShadow receiveShadow>
          <planeGeometry args={[6.0, 7.0]} />
          <meshStandardMaterial color="#F2F0EA" roughness={1.0} side={THREE.DoubleSide} transparent opacity={0.95} />
        </mesh>
      </group>

      {/* PORTRAIT (Medium parallax) */}
      <group ref={ref} position={[0, 0, 0.2]}>
        {/* 55-65% of central height. We'll use 6.2 x 8.5 */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[6.2, 8.5]} />
          <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

const SculpturalForms = () => {
  const ref = useRef(null);
  
  // Create 3 sophisticated curved paths
  const curve1 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.5, 3.5, -1.0),
    new THREE.Vector3(-3.0, 1.0, -0.5),
    new THREE.Vector3(-1.0, -4.0, 0.5),
    new THREE.Vector3(2.5, -4.5, 1.2), // Front tip crossing lower sketch
    new THREE.Vector3(4.0, -1.0, -0.5)
  ], false, 'chordal', 0.5), []);

  const curve2 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.5, 5.0, -2.0),
    new THREE.Vector3(4.0, 2.0, -1.0),
    new THREE.Vector3(2.5, -0.5, 0.0),
    new THREE.Vector3(1.0, -2.0, -1.5)
  ], false, 'chordal', 0.5), []);

  const curve3 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.5, -2.5, -2.0),
    new THREE.Vector3(-4.5, 0.0, -1.0),
    new THREE.Vector3(-2.5, 4.5, 0.5),
    new THREE.Vector3(0.0, 5.5, 1.5) // Top front tip
  ], false, 'chordal', 0.5), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const floatY = Math.sin(elapsed * 1.25 - 0.3) * 0.03;
    const floatX = Math.cos(elapsed * 0.85 - 0.3) * 0.01;
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.04 + floatX, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.04 + floatY, 0.05);
    }
  });

  return (
    <group ref={ref}>
      {/* Form 1: Main sweeping lower ribbon */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve1, 64, 0.6, 8, false]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.6} envMapIntensity={0.5} />
      </mesh>
      
      {/* Form 2: Right side architectural fold */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve2, 64, 0.8, 8, false]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.6} envMapIntensity={0.5} />
      </mesh>

      {/* Form 3: Left-to-top sculptural bend */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve3, 64, 0.4, 8, false]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.25} metalness={0.7} envMapIntensity={0.5} />
      </mesh>
    </group>
  );
};

const ThinWires = () => {
  const ref = useRef(null);
  
  const wire1 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, -3, -1),
    new THREE.Vector3(-2, 1, 1),
    new THREE.Vector3(3, 4, -2),
    new THREE.Vector3(5, -1, 0)
  ]).getPoints(100).map(p => new THREE.Vector3(p.x, p.y, p.z)), []);

  const wire2 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3, 5, 1),
    new THREE.Vector3(0, 3, -2),
    new THREE.Vector3(2, -2, -1),
    new THREE.Vector3(4, -4, 2)
  ]).getPoints(100).map(p => new THREE.Vector3(p.x, p.y, p.z)), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const floatY = Math.sin(elapsed * 0.7) * 0.015;
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.03, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.03 + floatY, 0.05);
      ref.current.rotation.z = Math.sin(elapsed * 0.5) * 0.005;
    }
  });
  
  return (
    <group ref={ref}>
      <Line points={wire1} color="#333333" lineWidth={1.0} />
      <Line points={wire2} color="#222222" lineWidth={0.8} />
    </group>
  );
};

const FloatingFragments = () => {
  const ref = useRef(null);
  
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const floatY = Math.sin(elapsed * 0.8) * 0.025;
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.05, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.05 + floatY, 0.05);
    }
  });
  
  return (
    <group ref={ref}>
      {/* 5-7 carefully positioned fragments */}
      
      {/* 1. Small bent metallic dark piece (top right, far front) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[3.5, 3.5, 2.0]} rotation={[0.4, 0.2, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      
      {/* 2. Small grey paper fragment (bottom left, middle depth) */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[-3.5, -2.5, 0.5]} rotation={[0.1, 0.1, 0.8]} castShadow receiveShadow>
          <planeGeometry args={[0.8, 1.2]} />
          <meshStandardMaterial color="#D8D5CE" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* 3. Small folded black sheet (mid right, deep back) */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[4.0, 0.0, -2.0]} rotation={[0.5, -0.3, 0.2]} castShadow receiveShadow>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* 4. Thin angular panel (top left, mid front) */}
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[-2.5, 4.0, 1.0]} rotation={[-0.2, 0.4, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.2, 0.02]} />
          <meshStandardMaterial color="#AAA8A2" roughness={0.7} />
        </mesh>
      </Float>

      {/* 5. Minimal off-white chip (bottom right, far front) */}
      <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh position={[2.5, -4.0, 2.5]} rotation={[0.8, 0.2, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.4, 0.02]} />
          <meshStandardMaterial color="#F2F0EA" roughness={0.8} />
        </mesh>
      </Float>
      
      {/* 6. Tiny floating dark shard (mid left) */}
      <Float speed={1.0} rotationIntensity={0.8} floatIntensity={0.2}>
        <mesh position={[-4.0, 1.0, 0.8]} rotation={[1.0, 0.5, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 0.02]} />
          <meshStandardMaterial color="#000000" roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export default function About3DExperiment() {
  const capabilities = [
    { num: '01', title: 'PRODUCT DESIGN', desc: 'Turning complex problems into clear product experiences.' },
    { num: '02', title: 'UI / UX', desc: 'Structuring interfaces around clarity, hierarchy and usability.' },
    { num: '03', title: 'INTERACTION DESIGN', desc: 'Designing motion and interaction that gives interfaces a sense of life.' },
    { num: '04', title: 'CREATIVE DEVELOPMENT', desc: 'Combining design, animation and code to create expressive web experiences.' },
    { num: '05', title: 'FRONTEND DEVELOPMENT', desc: 'Building responsive interfaces with React and modern frontend technologies.' }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#F2F0EA', overflow: 'hidden' }}>
      
      {/* 3D INSTALLATION (z-index: 5) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        {/* Orthographic-feeling camera with minimal perspective distortion */}
        <Canvas shadows camera={{ position: [0, 0, 22], fov: 32 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            {/* Soft editorial studio lighting */}
            <ambientLight intensity={0.6} color="#FFF5E6" />
            
            {/* Key light (warm) */}
            <directionalLight 
              position={[5, 8, 8]} 
              intensity={1.0} 
              castShadow 
              shadow-mapSize={[1024, 1024]} 
              shadow-bias={-0.001}
              color="#FFF9F0" 
            />
            
            {/* Fill light (cool to contrast) */}
            <directionalLight position={[-6, -2, 2]} intensity={0.3} color="#E0E5FF" />
            
            {/* Subtle rim light */}
            <directionalLight position={[0, 5, -10]} intensity={0.4} color="#FFFFFF" />

            {/* Scale controls the 50-55% viewport size of the installation */}
            <group position={[0.5, 0, 0]} scale={0.95}>
              <MainPortraitWithPanels />
              <SculpturalForms />
              <ThinWires />
              <FloatingFragments />
            </group>

            {/* Soft floor grounding shadow */}
            <ContactShadows 
              position={[0, -6.5, 0]} 
              opacity={0.4} 
              scale={30} 
              blur={4.0} 
              far={12} 
              color="#201D1A"
              resolution={1024}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* THREE-COLUMN HTML OVERLAY (z-index: 20) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 20, 
        padding: '5vh 3vw', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pointerEvents: 'none' 
      }}>
        
        {/* LEFT COLUMN: ABOUT */}
        <div style={{ width: '25%', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>06 / ABOUT</p>
          
          <h1 style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', fontFamily: '"Archivo Black", sans-serif', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#111', margin: 0 }}>
            I WORK<br/>BETWEEN THE<br/>STRUCTURE OF<br/>SOFTWARE<br/><br/>AND THE<br/>FEELING OF<br/>DESIGN.
          </h1>

          <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5 }}>
            Design gives structure to ideas.<br/>
            Code gives them life.<br/>
            I sit in the space between the two.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: '"Archivo Black", sans-serif', marginBottom: '0.5rem' }}>SHLOK SHINDE</h3>
            <p style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 }}>
              Digital Product Designer<br/>
              × Creative Developer
            </p>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', letterSpacing: '0.05em' }}>
              B.TECH INFORMATION TECHNOLOGY<br/>
              VIDYALANKAR INSTITUTE OF TECHNOLOGY<br/>
              MUMBAI
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: EMPTY SPACE FOR 3D */}
        <div style={{ width: '45%' }}></div>

        {/* RIGHT COLUMN: CAPABILITIES */}
        <div style={{ width: '25%', pointerEvents: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: '"Archivo Black", sans-serif', marginBottom: '2rem' }}>CORE CAPABILITIES</h3>
          <div style={{ borderTop: '2px solid #111' }}>
            {capabilities.map((cap, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>{cap.num}</span>
                  <span style={{ fontSize: '1.1rem', fontFamily: '"Archivo Black", sans-serif', letterSpacing: '-0.01em' }}>{cap.title}</span>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#444', lineHeight: 1.4, paddingLeft: '2rem' }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
