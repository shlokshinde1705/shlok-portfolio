import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Users, AlertCircle, LayoutDashboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPulse() {
  const containerRef = useRef(null);
  const uiRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    let enterAnim;

    const ctx = gsap.context(() => {
      
      gsap.from('.pulse-intro-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      gsap.from('.pulse-ui-entrance', {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Pin and Interactive Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pulse-interactive-section',
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true
        }
      });

      // State 1 -> State 2: Focus on Team Capacity
      tl.to('.pulse-health', { opacity: 0.2, scale: 0.95, duration: 1 }, 1);
      tl.to('.pulse-capacity', { width: '100%', opacity: 1, duration: 1, border: '1px solid var(--accent)' }, 1);
      tl.to('.pulse-status-text', { textContent: 'STATE: TEAM CAPACITY', duration: 0.1 }, 1);

      // State 2 -> State 3: Focus on Risk Watch
      tl.to('.pulse-capacity', { opacity: 0.2, scale: 0.95, border: '1px solid #222', duration: 1 }, 2);
      tl.to('.pulse-risk', { opacity: 1, scale: 1.05, border: '1px solid var(--accent)', duration: 1 }, 2);
      tl.to('.pulse-status-text', { textContent: 'STATE: RISK WATCH', duration: 0.1 }, 2);

      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pulse" ref={containerRef} style={{ backgroundColor: '#e5e4df', position: 'relative' }}>
      
      <div className="pulse-interactive-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 3rem' }}>
        
        <div style={{ width: '85vw', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Intro Text */}
          <div className="pulse-intro-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: '2rem' }}>
            <div style={{ width: '40%' }}>
              <p className="pulse-intro-reveal text-label" style={{ marginBottom: '0.5rem' }}>03 / PULSE</p>
              <h2 className="pulse-intro-reveal text-large" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', marginBottom: '0.5rem', color: '#111', lineHeight: 1.1 }}>OPERATIONS COMMAND CENTER</h2>
              <p className="pulse-intro-reveal text-body" style={{ color: '#555', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>Self-initiated product concept exploring UX strategy, interface design and interaction design.</p>
              <p className="pulse-intro-reveal pulse-status-text text-body" style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em', fontSize: '0.8rem' }}>STATE: PROJECT OVERVIEW</p>
            </div>

            <div className="pulse-intro-reveal" style={{ width: '55%', display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <p className="text-label" style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>PROBLEM & GOAL</p>
                <p className="text-body" style={{ color: '#333', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <strong>Problem:</strong> Project teams need to understand project health, workload, deadlines and risks without searching through multiple tools.<br/><br/>
                  <strong>Goal:</strong> Create an operations command center that turns scattered project information into an understandable overview.
                </p>
                <p className="text-label" style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', marginTop: '1rem' }}>
                  HEALTH → CAPACITY → TIMELINE → RISKS → ACTION
                </p>
              </div>

              <div style={{ flex: 1.2 }}>
                <p className="text-label" style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>DESIGN DECISIONS</p>
                <ul className="text-body" style={{ color: '#555', fontSize: '0.85rem', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>High-level health indicators provide immediate orientation.</li>
                  <li>Team capacity exposes workload before it becomes a problem.</li>
                  <li>Timeline creates temporal context.</li>
                  <li>Risks are visually separated so important issues are not buried.</li>
                  <li>Activity provides supporting context rather than competing with primary information.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dashboard Product UI Wrapper for entrance animation */}
          <div className="pulse-ui-entrance">
            <div ref={uiRef} style={{ width: '100%', height: '55vh', backgroundColor: '#0a0a0a', borderRadius: '12px', display: 'flex', overflow: 'hidden', color: '#e0e0e0', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', border: '1px solid #222' }}>
          
          {/* Sidebar */}
          <div style={{ width: '80px', backgroundColor: '#111', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', gap: '2rem' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'var(--accent)' }}></div>
            <LayoutDashboard size={20} color="#fff" />
            <Activity size={20} color="#666" />
            <Users size={20} color="#666" />
            <AlertCircle size={20} color="#666" />
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'flex', gap: '2rem', height: '40%' }}>
              {/* Health */}
              <div className="pulse-health" style={{ flex: 1, backgroundColor: '#161616', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>SYSTEM HEALTH</p>
                <div>
                  <h3 style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1 }}>98.4%</h3>
                  <p style={{ color: '#4caf50', fontSize: '0.85rem', marginTop: '0.5rem' }}>ALL SYSTEMS NOMINAL</p>
                </div>
              </div>
              
              {/* Risk Watch */}
              <div className="pulse-risk" style={{ flex: 1.5, backgroundColor: '#161616', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>RISK WATCH</p>
                <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>ORBIT</p>
                  <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>Launch dependency blocked by API changes.</p>
                </div>
                <div style={{ borderLeft: '3px solid #ff9800', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>LUMA</p>
                  <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>Design review pending. Potential delay.</p>
                </div>
              </div>
            </div>

            {/* Team Capacity */}
            <div className="pulse-capacity" style={{ flex: 1, backgroundColor: '#161616', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>TEAM CAPACITY</p>
              {[
                { dept: 'DESIGN', val: '82%', blocks: [1,1,1,1,1,1,1,1,0,0] },
                { dept: 'ENGINEERING', val: '91%', blocks: [1,1,1,1,1,1,1,1,1,0] }
              ].map((t, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ccc' }}>{t.dept}</span><span style={{ color: 'var(--accent)' }}>{t.val}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {t.blocks.map((b, j) => (<div key={j} style={{ height: '6px', flex: 1, background: b ? 'var(--accent)' : '#222', borderRadius: '1px' }}></div>))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        </div> {/* Closing the pulse-ui-entrance wrapper */}
        </div> {/* Closing the 85vw wrapper */}

      </div>
    </section>
  );
}
