import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let enterAnim;

    const ctx = gsap.context(() => {
      
      gsap.from('.process-intro-reveal', {
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

      const steps = gsap.utils.toArray('.process-step');
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 40%',
          toggleClass: { targets: step, className: 'active' },
          onEnter: () => {
            gsap.to(step.querySelector('.process-title'), { color: 'var(--text-color)', duration: 0.4 });
            gsap.to(step.querySelector('.process-number-bg'), { opacity: 0.05, duration: 0.4 });
            gsap.to(step, { scale: 1, duration: 0.6, ease: 'power2.out' });
          },
          onLeave: () => {
            gsap.to(step.querySelector('.process-title'), { color: 'var(--text-secondary)', duration: 0.4 });
            gsap.to(step.querySelector('.process-number-bg'), { opacity: 0.01, duration: 0.4 });
            gsap.to(step, { scale: 0.98, duration: 0.6, ease: 'power2.out' });
          },
          onEnterBack: () => {
            gsap.to(step.querySelector('.process-title'), { color: 'var(--text-color)', duration: 0.4 });
            gsap.to(step.querySelector('.process-number-bg'), { opacity: 0.05, duration: 0.4 });
            gsap.to(step, { scale: 1, duration: 0.6, ease: 'power2.out' });
          },
          onLeaveBack: () => {
            gsap.to(step.querySelector('.process-title'), { color: 'var(--text-secondary)', duration: 0.4 });
            gsap.to(step.querySelector('.process-number-bg'), { opacity: 0.01, duration: 0.4 });
            gsap.to(step, { scale: 0.98, duration: 0.6, ease: 'power2.out' });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { title: "UNDERSTAND", desc: "USER → PROBLEM → CONTEXT", visual: <div style={{ display: 'flex', gap: '0.5rem' }}><div style={{ width: '30px', height: '4px', background: 'var(--accent)' }}></div><div style={{ width: '15px', height: '4px', background: '#ccc' }}></div><div style={{ width: '15px', height: '4px', background: '#ccc' }}></div></div> },
    { title: "FRAME", desc: "DEFINE THE REAL PROBLEM", visual: <div style={{ border: '1px solid var(--text-color)', width: '60px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }}></div></div> },
    { title: "EXPLORE", desc: "01 / 02 / 03 different directions", visual: <div style={{ display: 'flex', gap: '0.5rem' }}>{[1,2,3].map(n=><div key={n} style={{ width: '12px', height: '12px', borderRadius: '50%', border: n===2 ? '2px solid var(--accent)' : '1px solid #ccc' }}></div>)}</div> },
    { title: "DESIGN", desc: "WIREFRAME → UI", visual: <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '40px' }}><div style={{ width: '100%', height: '8px', border: '1px solid #ccc', borderRadius: '2px' }}></div><div style={{ width: '100%', height: '16px', background: 'var(--text-color)', borderRadius: '2px' }}></div></div> },
    { title: "BUILD", desc: "DESIGN → CODE", visual: <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>{'</>'}</div> },
    { title: "REFINE", desc: "TEST → ITERATE", visual: <div style={{ width: '20px', height: '20px', border: '2px solid #ccc', borderTopColor: 'var(--accent)', borderRadius: '50%', transform: 'rotate(45deg)' }}></div> }
  ];

  return (
    <section id="process" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      
      <div className="process-container" style={{ display: 'flex', padding: '10rem 3rem 8rem' }}>
        <div className="process-left" style={{ flex: 1 }}>
          <div style={{ position: 'sticky', top: '10rem' }}>
            <h2 className="process-intro-reveal text-label">05 / PROCESS</h2>
            <h3 className="process-intro-reveal text-large" style={{ marginTop: '0.5rem' }}>HOW I WORK</h3>
          </div>
        </div>
        
        <div className="process-right" style={{ flex: 1, position: 'relative', paddingBottom: '20vh', paddingTop: '5vh' }}>
          {/* Continuous Timeline Line */}
          <div className="process-line" style={{ position: 'absolute', left: '-2.5rem', top: '10vh', bottom: '20vh', width: '1px', background: '#e0e0e0' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25vh' }}>
            {steps.map((step, i) => (
              <div key={i} className="process-step" style={{ opacity: 1, transform: 'scale(0.98)', transformOrigin: 'left center', position: 'relative' }}>
                
                {/* Large Background Number */}
                <div className="process-number-bg" style={{ position: 'absolute', top: '-10%', left: '-5%', fontSize: '15rem', fontWeight: 800, lineHeight: 0.8, color: '#121212', opacity: 0.01, pointerEvents: 'none', zIndex: -1, letterSpacing: '-0.05em' }}>
                  0{i+1}
                </div>

                <div className="process-indicator" style={{ position: 'absolute', left: '-2.75rem', top: '24px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--accent)', opacity: 0, transition: 'opacity 0.3s', zIndex: 2 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                  <p className="text-label">0{i+1}</p>
                  <div className="process-visual" style={{ opacity: 0, transition: 'opacity 0.4s ease', transform: 'translateY(10px)' }}>{step.visual}</div>
                </div>
                <h4 className="text-huge process-title" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: 'var(--text-secondary)', lineHeight: 1 }}>{step.title}</h4>
                <p className="process-desc text-body" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '0.05em', fontWeight: 500 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSITION TO PULSE */}
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '5rem 3rem' }}>
        <h2 className="text-huge" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
          FROM THINKING<br/>
          <span style={{ color: 'var(--text-secondary)' }}>TO OPERATING.</span>
        </h2>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .process-step.active .process-indicator { opacity: 1 !important; }
        .process-step.active .process-visual { opacity: 1 !important; transform: translateY(0) !important; }
        
        @media (max-width: 1024px) {
          .process-container { flex-direction: column !important; padding: 5rem 1.5rem 5rem !important; gap: 4rem; }
          .process-left { position: static !important; }
          .process-left > div { position: relative !important; top: 0 !important; }
          .process-right { padding-left: 3rem !important; padding-top: 0 !important; padding-bottom: 5vh !important; }
          .process-line { left: 0.5rem !important; top: 0 !important; bottom: 0 !important; }
          .process-indicator { left: 0.25rem !important; }
          .process-number-bg { font-size: 8rem !important; top: -20% !important; }
        }
      `}} />
    </section>
  );
}
