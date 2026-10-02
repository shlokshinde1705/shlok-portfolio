import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

export default function ProjectArc() {
  const [mode, setMode] = useState('FASTEST');
  const containerRef = useRef(null);

  useEffect(() => {
    let enterAnim;

    const ctx = gsap.context(() => {
      
      const enterAnim = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
      
      enterAnim.from('.arc-intro-reveal', { opacity: 0, y: 30, duration: 0.6, stagger: 0.05, ease: 'power3.out' }, 0);
      enterAnim.from('.arc-map-container', { opacity: 0, scale: 0.95, y: 40, duration: 0.6, ease: 'power3.out' }, 0.1);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Using viewBox 1000x800 and preserveAspectRatio="xMinYMid slice"
  // This anchors X=0 to the absolute left edge of the container.
  // Origin is X=80, Destination is X=450. (Max X used is ~480).
  // 480 / 1000 = 48%. The route strictly stays in the left half.
  // The panel on the right takes 320px (roughly 35-40%), so they will never overlap.
  const paths = { 
    FASTEST: "M 50 400 Q 250 150 450 400", 
    CHEAPEST: "M 50 400 L 250 400 L 450 400", 
    LEAST_WALKING: "M 50 400 L 250 600 L 450 400" 
  };
  
  const bgPaths = [ 
    "M 0 250 Q 150 150 300 250 T 600 150 T 1000 250", 
    "M -50 550 Q 150 500 300 650 T 600 550 T 1000 800", 
    "M 250 0 L 250 800", 
    "M 450 0 L 450 800",
    "M 0 400 L 1000 400" 
  ];
  
  const detailsData = { 
    FASTEST: { time: "17 MIN", trans: "0 TRANSFERS", price: "₹45" }, 
    CHEAPEST: { time: "28 MIN", trans: "1 TRANSFER", price: "₹28" }, 
    LEAST_WALKING: { time: "32 MIN", trans: "1 TRANSFER", price: "₹32" } 
  };

  const getTransferNode = (m) => {
    if (m === 'CHEAPEST') return { cx: 250, cy: 400, name: 'DADAR' };
    if (m === 'LEAST_WALKING') return { cx: 250, cy: 600, name: 'BANDRA KURLA' };
    return null;
  };

  const transfer = getTransferNode(mode);

  return (
    <section id="arc" ref={containerRef} data-cursor-bg="dark" className="arc-container" style={{ height: '100vh', width: '100vw', backgroundColor: '#141414', color: '#fff', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3rem' }}>
      
      {/* Priority Controls */}
      <div className="arc-controls" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="arc-intro-reveal text-label" style={{ color: '#8c8c8c' }}>04 / ARC</h2>
        <h3 className="arc-intro-reveal text-large" style={{ marginTop: '0.5rem' }}>INTERACTION CONCEPT</h3>
        <p className="arc-intro-reveal text-body" style={{ color: '#8c8c8c', marginBottom: '3rem' }}>URBAN MOBILITY EXPERIENCE</p>
        <p className="arc-intro-reveal text-label" style={{ marginBottom: '1.5rem', color: '#666' }}>CHOOSE PRIORITY</p>
        <div className="arc-intro-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {['FASTEST', 'CHEAPEST', 'LEAST WALKING'].map(m => {
            const key = m === 'LEAST WALKING' ? 'LEAST_WALKING' : m;
            const isSelected = mode === key;
            return (
              <Magnetic intensity={0.1} key={m}>
                <button 
                  onClick={() => setMode(key)}
                  style={{
                    background: 'none', border: 'none', color: isSelected ? '#fff' : '#555', display: 'flex', alignItems: 'center', gap: '1rem',
                    fontSize: '2rem', fontWeight: 500, textAlign: 'left', transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                    transform: isSelected ? 'translateX(10px)' : 'none'
                  }}
                  onMouseEnter={(e) => { if(!isSelected) e.currentTarget.style.color = '#888'; }}
                  onMouseLeave={(e) => { if(!isSelected) e.currentTarget.style.color = '#555'; }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isSelected ? 'var(--accent)' : 'transparent', transition: 'background-color 0.3s' }} />
                  {m}
                </button>
              </Magnetic>
            );
          })}
        </div>
      </div>

      {/* Map Canvas */}
      <div className="arc-map-container" style={{ position: 'relative' }}>
        <Magnetic intensity={0.01} scale={1.01}>
          <div style={{ width: '100%', height: '100%', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0a0a0a', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', position: 'relative' }}>
            
            {/* Grid Background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
            
            {/* Background inactive routes (Full width) */}
            <svg viewBox="0 0 1000 800" preserveAspectRatio="xMinYMid slice" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              {bgPaths.map((d, i) => (<path key={i} d={d} fill="transparent" stroke="#222" strokeWidth="2" strokeLinecap="round" />))}
            </svg>

            {/* Active Route Wrapper - Strictly bounds the SVG to the left safe-zone so it physically cannot overlap the panel */}
            <div className="arc-route-wrapper" style={{ position: 'absolute', top: 0, bottom: 0, left: '2rem' }}>
              <svg viewBox="0 0 500 800" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                
                {/* Active Route Path with Animation */}
                <AnimatePresence mode="wait">
                  <motion.path 
                    key={mode}
                    d={paths[mode]} 
                    fill="transparent" 
                    stroke="var(--accent)" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    style={{ filter: 'drop-shadow(0px 0px 8px rgba(211,74,36,0.7))' }}
                    initial={{ pathLength: 0, opacity: 0 }} 
                    animate={{ pathLength: 1, opacity: 1 }} 
                    exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.7, ease: "easeInOut" }} 
                  />
                </AnimatePresence>
                
                {/* Origin Node */}
                <circle cx="50" cy="400" r="10" fill="var(--accent)" stroke="#0a0a0a" strokeWidth="4" />
                <text x="50" y="375" fill="#fff" fontSize="12" letterSpacing="2" textAnchor="middle" fontWeight="600" style={{ textShadow: '0 2px 4px #0a0a0a, 0 0 10px #0a0a0a, 0 0 20px #0a0a0a' }}>MUMBAI CENTRAL</text>
                
                {/* Dynamic Transfer Node */}
                <AnimatePresence mode="wait">
                  {transfer && (
                    <motion.g key={mode + "-transfer"} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                      <circle cx={transfer.cx} cy={transfer.cy} r="8" fill="#141414" stroke="var(--accent)" strokeWidth="3" />
                      <text x={transfer.cx} y={transfer.cy - 18} fill="#ddd" fontSize="11" letterSpacing="2" textAnchor="middle" style={{ textShadow: '0 2px 4px #0a0a0a, 0 0 10px #0a0a0a, 0 0 20px #0a0a0a' }}>{transfer.name}</text>
                    </motion.g>
                  )}
                </AnimatePresence>
                
                {/* Destination Node */}
                <circle cx="450" cy="400" r="10" fill="var(--accent)" stroke="#0a0a0a" strokeWidth="4" />
                <text x="450" y="375" fill="#fff" fontSize="12" letterSpacing="2" textAnchor="middle" fontWeight="600" style={{ textShadow: '0 2px 4px #0a0a0a, 0 0 10px #0a0a0a, 0 0 20px #0a0a0a' }}>BANDRA</text>
              </svg>
            </div>

            {/* Information Panel (Strictly on the right) */}
            <div className="arc-panel" style={{ position: 'absolute', background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(16px)', border: '1px solid #333', borderRadius: '8px', padding: '2rem 1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
              
              <AnimatePresence mode="wait">
                <motion.div key={mode + "-panel"} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '2.5rem', fontWeight: 600 }}>ROUTE · {mode.replace('_', ' ')}</p>
                  
                  {/* Route Stops */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', marginBottom: 'auto' }}>
                    <div style={{ position: 'absolute', left: '4px', top: '10px', bottom: '10px', width: '2px', background: '#333' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', zIndex: 2, boxShadow: '0 0 10px rgba(211,74,36,0.5)' }}></div>
                      <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}>MUMBAI CENTRAL</span>
                    </div>
                    
                    {transfer && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#141414', border: '2px solid var(--accent)', zIndex: 2 }}></div>
                        <span style={{ fontSize: '0.8rem', color: '#aaa', letterSpacing: '0.05em' }}>{transfer.name}</span>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', zIndex: 2, boxShadow: '0 0 10px rgba(211,74,36,0.5)' }}></div>
                      <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}>BANDRA</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', borderTop: '1px solid #222', paddingTop: '2rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <p style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>DURATION</p>
                      <p style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 500, lineHeight: 1 }}>{detailsData[mode].time}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <p style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>CHANGES</p>
                      <p style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 500, lineHeight: 1 }}>{detailsData[mode].trans}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <p style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>PRICE</p>
                      <p style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 500, lineHeight: 1 }}>{detailsData[mode].price}</p>
                    </div>
                  </div>

                  <button style={{ width: '100%', padding: '1rem', background: '#fff', color: '#111', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    VIEW ROUTE DETAILS
                  </button>
                  
                </motion.div>
              </AnimatePresence>
              
            </div>
          </div>
        </Magnetic>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .arc-container { flex-direction: row; }
        .arc-controls { flex: 1; padding-right: 2rem; }
        .arc-map-container { flex: 2; height: 85%; min-height: 500px; }
        .arc-panel { top: 2rem; bottom: 2rem; right: 2rem; width: 310px; }
        .arc-route-wrapper { right: 350px; }
        
        @media (max-width: 1024px) {
          .arc-container { flex-direction: column; padding-top: 4rem !important; padding-bottom: 2rem !important; gap: 2rem; }
          .arc-controls { flex: none; padding-right: 0; text-align: center; align-items: center; }
          .arc-controls h2, .arc-controls h3, .arc-controls p, .arc-controls div { text-align: center; justify-content: center; align-items: center; }
          .arc-map-container { width: 100%; height: 60vh; flex: none; }
          .arc-panel { top: auto; bottom: 1rem; right: 1rem; left: 1rem; width: auto; height: auto; max-height: 40%; padding: 1rem; flex-direction: row; gap: 1rem; overflow-y: auto; }
          .arc-route-wrapper { right: 0 !important; left: 0 !important; bottom: 40% !important; }
        }
      `}} />
    </section>
  );
}
