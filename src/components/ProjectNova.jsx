import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Folder, FileText, Globe, Edit3, ChevronRight, Sparkles, Database } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectNova() {
  const containerRef = useRef(null);
  const uiRef = useRef(null);
  const sidebarRef = useRef(null);
  const centerRef = useRef(null);
  const aiRef = useRef(null);

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
      
      enterAnim.from('.nova-text-reveal', { y: 30, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }, 0);
      enterAnim.from(uiRef.current, { scale: 0.95, opacity: 0, y: 40, duration: 0.6, ease: 'power3.out' }, 0.1);
      enterAnim.from('.nova-sidebar-item', { opacity: 0, x: -10, stagger: 0.05, duration: 0.5, ease: 'power2.out' }, 0.3);
      enterAnim.from('.nova-center-item', { opacity: 0, y: 10, stagger: 0.05, duration: 0.6, ease: 'power2.out' }, 0.4);
      enterAnim.from('.nova-ai-item', { opacity: 0, x: 10, stagger: 0.05, duration: 0.6, ease: 'power2.out' }, 0.5);

      // Subtle parallax on UI (scrubbed)
      gsap.to(uiRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Header parallax fade out (scrubbed)
      gsap.to('.nova-header', {
        y: -50,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: uiRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="nova" ref={containerRef} style={{ backgroundColor: '#e5e4df', position: 'relative', padding: '8rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* ==========================================
          HEADER & METADATA
      ========================================== */}
      <div className="nova-header" style={{ width: '90vw', maxWidth: '1500px', display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '4rem' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ width: '50%' }} className="nova-header-main">
            <p className="text-label nova-text-reveal" style={{ marginBottom: '1rem', color: '#666' }}>02 / NOVA<br/>SELF-INITIATED PRODUCT CONCEPT</p>
            <h2 className="text-huge nova-text-reveal" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', lineHeight: 0.9, color: '#111' }}>
              AI RESEARCH<br/>WORKSPACE
            </h2>
          </div>

          <div className="nova-text-reveal nova-header-marker" style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', height: '100px' }}>
            <div style={{ width: '1px', backgroundColor: '#ccc' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '0.2rem' }}>
              <p className="text-label" style={{ color: '#111', fontWeight: 600 }}>02</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
                <p className="text-label" style={{ color: '#666', letterSpacing: '0.2em' }}>NOVA</p>
              </div>
            </div>
          </div>

        </div>

        {/* Project Statement & Metadata */}
        <div className="nova-meta-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #ccc', paddingTop: '3rem' }}>
          
          <div className="nova-text-reveal" style={{ width: '45%' }}>
            <h3 className="text-large" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', color: '#111', marginBottom: '1.5rem' }}>RESEARCH WITHOUT<br/>THE TAB CHAOS.</h3>
            <p className="text-body" style={{ color: '#555', fontSize: '1rem', maxWidth: '400px' }}>
              NOVA is a concept for turning scattered research into a structured workspace where sources, evidence and synthesis stay connected.
            </p>
          </div>

          <div className="nova-text-reveal nova-meta-details" style={{ display: 'flex', gap: '4rem', paddingBottom: '0.5rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>ROLE</p>
              <p style={{ fontSize: '0.8rem', color: '#111', fontWeight: 600, letterSpacing: '0.05em' }}>PRODUCT DESIGN / UI / UX</p>
            </div>
            <div>
              <p style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>FOCUS</p>
              <p style={{ fontSize: '0.8rem', color: '#111', fontWeight: 600, letterSpacing: '0.05em' }}>RESEARCH / IA / AI</p>
            </div>
            <div>
              <p style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>STATUS</p>
              <p style={{ fontSize: '0.8rem', color: '#111', fontWeight: 600, letterSpacing: '0.05em' }}>SELF-INITIATED CONCEPT</p>
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Label directly above UI */}
      <div className="nova-text-reveal nova-ui-label" style={{ width: '90vw', maxWidth: '1500px', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em', fontWeight: 600 }}>NOVA / RESEARCH WORKSPACE</p>
        <p style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em', fontWeight: 600 }}>SOURCE → COMPARE → SYNTHESIZE</p>
      </div>

      {/* ==========================================
          3-COLUMN PRODUCT INTERFACE
      ========================================== */}
      <div 
        ref={uiRef} 
        className="nova-ui-container" data-cursor-bg="dark"
        style={{ 
          width: '90vw', 
          maxWidth: '1500px', 
          height: '75vh', 
          minHeight: '600px',
          backgroundColor: '#0a0a0a', 
          borderRadius: '24px', 
          border: '1px solid #222', 
          display: 'flex', 
          overflow: 'hidden', 
          color: '#e0e0e0', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.15)' 
        }}
      >
        
        {/* LEFT SIDEBAR: SOURCES */}
        <div ref={sidebarRef} className="nova-sidebar" style={{ backgroundColor: '#0d0d0d', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          
          <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#000', borderRadius: '50%' }}></div>
            </div>
            <span style={{ fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.8rem', color: '#fff' }}>NOVA</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Collections */}
            <div>
              <p className="nova-sidebar-item" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '1rem', fontWeight: 600 }}>COLLECTIONS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: '#888', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#888'; }}>
                  <Folder size={14} /> User Research
                </div>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: '#888', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#888'; }}>
                  <Folder size={14} /> Product Strategy
                </div>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <Folder size={14} fill="#fff" /> Urban Mobility
                </div>
              </div>
            </div>

            {/* Active Sources */}
            <div>
              <p className="nova-sidebar-item" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '1rem', fontWeight: 600 }}>ACTIVE SOURCES</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: '#aaa', fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <FileText size={14} color="var(--accent)" /> Transit_Study.pdf <div className="nova-pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent)", marginLeft: "auto" }}></div>
                </div>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: '#aaa', fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Globe size={14} color="#4a90e2" /> WRI Route Report
                </div>
                <div className="nova-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '6px', color: '#aaa', fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Edit3 size={14} color="#f5a623" /> Field Notepad
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CENTER: RESEARCH WORKSPACE */}
        <div ref={centerRef} style={{ flex: 1, backgroundColor: '#0f0f0f', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          
          {/* Top Bar */}
          <div className="nova-center-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 3rem', borderBottom: '1px solid #1a1a1a' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.05em' }}>URBAN MOBILITY</span>
            <ChevronRight size={12} color="#444" />
            <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500, letterSpacing: '0.05em' }}>TRANSIT SYSTEMS</span>
          </div>

          <div style={{ padding: '4rem 3rem', maxWidth: '800px' }}>
            <p className="nova-center-item" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>KEY QUESTION</p>
            <h1 className="nova-center-item" style={{ fontSize: '2.2rem', fontWeight: 500, color: '#fff', marginBottom: '4rem', lineHeight: 1.2 }}>
              How can urban mobility interfaces make route decisions easier to understand?
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              <div className="nova-center-item nova-evidence-box" style={{ padding: '2rem', backgroundColor: '#141414', borderRadius: '8px', border: '1px solid #1a1a1a', transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none'; }}>
                <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Database size={12}/> OBSERVATION</p>
                <p style={{ fontSize: '1.1rem', color: '#ddd', lineHeight: 1.6 }}>Users often optimize for different priorities: time, cost, transfers and walking. A single "best" route is subjective.</p>
              </div>

              <div className="nova-center-item" style={{ padding: '2rem', backgroundColor: '#141414', borderRadius: '8px', border: '1px solid #1a1a1a', transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none'; }}>
                <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={12}/> EVIDENCE HIGHLIGHT</p>
                <p style={{ fontSize: '1.1rem', color: '#ddd', lineHeight: 1.6 }}>"A route decision is not simply about being the fastest. Different commuters value different trade-offs depending on context, fatigue, and budget."</p>
                <div style={{ marginTop: '1rem', display: 'inline-block', padding: '0.4rem 0.8rem', backgroundColor: '#1a1a1a', borderRadius: '4px', fontSize: '0.75rem', color: '#888', position: 'relative', overflow: 'hidden' }}>Source: Transit_Study.pdf (Pg. 12)<div className="nova-shimmer" style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}></div></div>
              </div>

              <div className="nova-center-item" style={{ padding: '2rem', backgroundColor: '#141414', borderRadius: '8px', border: '1px solid #1a1a1a', transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none'; }}>
                <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={12}/> INSIGHT</p>
                <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: 1.6, fontWeight: 500 }}>The interface should expose these trade-offs visually rather than hiding them behind a black-box algorithm.</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT: AI SYNTHESIS */}
        <div ref={aiRef} className="nova-ai-panel" style={{ backgroundColor: '#0d0d0d', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'relative' }}>
          
          <div className="nova-ai-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <Sparkles size={16} color="var(--accent)" className="nova-pulse-icon" />
            <span style={{ fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase' }}>AI SYNTHESIS <span className="nova-blink">_</span></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="nova-ai-item">
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>3 SOURCES ANALYZED</p>
              <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6 }}>
                The collective research suggests that route selection should expose trade-offs instead of presenting a single "best" option. Users experience cognitive friction when forced to guess routing logic.
              </p>
            </div>

            <div className="nova-ai-item">
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>KEY THEMES</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid #1a1a1a', transition: 'border-color 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                  <span style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, marginTop: '2px' }}>01</span>
                  <span style={{ fontSize: '0.85rem', color: '#eee' }}>Decision transparency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid #1a1a1a', transition: 'border-color 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                  <span style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, marginTop: '2px' }}>02</span>
                  <span style={{ fontSize: '0.85rem', color: '#eee' }}>Comparative routing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid #1a1a1a', transition: 'border-color 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                  <span style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, marginTop: '2px' }}>03</span>
                  <span style={{ fontSize: '0.85rem', color: '#eee' }}>Cognitive load</span>
                </div>
              </div>
            </div>

            <div className="nova-ai-item" style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>EVIDENCE MATRIX</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ padding: '0.4rem 0.6rem', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '4px', fontSize: '0.7rem', color: '#888' }}>Transit_Study.pdf</span>
                <span style={{ padding: '0.4rem 0.6rem', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '4px', fontSize: '0.7rem', color: '#888' }}>WRI Report</span>
                <span style={{ padding: '0.4rem 0.6rem', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '4px', fontSize: '0.7rem', color: '#888' }}>Notepad</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .nova-ui-container { flex-direction: row; }
        .nova-sidebar { width: 260px; min-width: 260px; border-right: 1px solid #1a1a1a; border-bottom: none; }
        .nova-ai-panel { width: 320px; min-width: 320px; border-left: 1px solid #1a1a1a; border-top: none; }
        
        @media (max-width: 1024px) {
          .nova-header { gap: 2rem !important; margin-bottom: 3rem !important; }
          .nova-header > div:first-child { flex-direction: column; }
          .nova-header-main { width: 100% !important; margin-bottom: 2rem; }
          .nova-header-marker { display: none !important; }
          
          .nova-meta-row { flex-direction: column; align-items: flex-start !important; gap: 2rem; }
          .nova-meta-row > div { width: 100% !important; }
          .nova-meta-details { flex-wrap: wrap; gap: 2rem !important; }

        @keyframes novaPulse { 0% { border-color: #1a1a1a; box-shadow: inset 0 0 0 rgba(255,100,0,0); } 50% { border-color: rgba(255,100,0,0.3); box-shadow: inset 0 0 20px rgba(255,100,0,0.05); } 100% { border-color: #1a1a1a; box-shadow: inset 0 0 0 rgba(255,100,0,0); } }
        .nova-evidence-box { animation: novaPulse 4s infinite ease-in-out; }
        @keyframes novaBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .nova-blink { animation: novaBlink 1s infinite; }
        @keyframes novaShimmer { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }
        .nova-shimmer { animation: novaShimmer 4s infinite linear; }
        @keyframes novaPulseIcon { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .nova-pulse-icon { animation: novaPulseIcon 3s infinite ease-in-out; }
        @keyframes novaDotPulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        .nova-pulse-dot { animation: novaDotPulse 2s infinite ease-in-out; }

          
          .nova-ui-label { display: none !important; }
          
          .nova-ui-container { flex-direction: column; height: auto !important; min-height: auto !important; overflow-y: auto !important; }
          .nova-sidebar { width: 100%; min-width: 100%; border-right: none; border-bottom: 1px solid #1a1a1a; padding: 2rem !important; }
          .nova-ai-panel { width: 100%; min-width: 100%; border-left: none; border-top: 1px solid #1a1a1a; }
        }
      `}} />

    </section>
  );
}

