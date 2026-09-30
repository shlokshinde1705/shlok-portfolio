import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorkIntro() {
  const containerRef = useRef(null);
  const visualsRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.work-label', 
        { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }
      );
      
      tl.from('.work-line', 
        { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 
        0.1
      );
      
      tl.fromTo('.work-visuals',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' },
        0.3
      );

      // Scroll Parallax
      gsap.to('.work-typography', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.work-visuals', {
        y: 60,
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Vector gesture line draw
      gsap.fromTo(lineRef.current, 
        { strokeDasharray: '1000', strokeDashoffset: '1000' },
        { strokeDashoffset: '0', ease: 'none', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1
        }}
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" style={{ position: 'relative', zIndex: 20, padding: '15rem 3rem 10rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
      
      {/* Background Visual System (Technical Grid & Geometric Form) */}
      <div className="work-visuals" ref={visualsRef} style={{ position: 'absolute', right: '-5vw', top: '20vh', width: '60vw', height: '60vw', pointerEvents: 'none', zIndex: -1, opacity: 0 }}>
        {/* Subtle coordinate marks */}
        <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '10px', fontFamily: 'monospace', color: 'rgba(18,18,18,0.2)', letterSpacing: '0.1em' }}>X: 45.912 / Y: 12.004</div>
        <div style={{ position: 'absolute', bottom: 0, right: '10%', fontSize: '10px', fontFamily: 'monospace', color: 'rgba(18,18,18,0.2)', letterSpacing: '0.1em' }}>SYS_01</div>
        
        {/* Oversized faint geometric form */}
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(18, 18, 18, 0.04)', borderRadius: '50%', transform: 'scale(1.2)' }}></div>
        <div style={{ position: 'absolute', inset: '10%', border: '1px solid rgba(18, 18, 18, 0.03)', borderRadius: '50%' }}></div>
        
        {/* Thin architectural lines */}
        <div style={{ position: 'absolute', top: '50%', left: '-20%', right: '120%', height: '1px', background: 'rgba(18,18,18,0.05)' }}></div>
        <div style={{ position: 'absolute', left: '50%', top: '-20%', bottom: '120%', width: '1px', background: 'rgba(18,18,18,0.05)' }}></div>
        
        {/* Vector gesture curved line */}
        <svg viewBox="0 0 500 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <path 
            ref={lineRef}
            d="M 50 450 C 150 450, 200 150, 450 50" 
            fill="none" 
            stroke="rgba(18, 18, 18, 0.6)" 
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="work-typography" style={{ position: 'relative' }}>
        <p className="text-label work-label" style={{ marginBottom: '2rem' }}>01 / SELECTED WORK</p>
        <h2 className="text-large" style={{ maxWidth: '1200px', margin: 0 }}>
          <div style={{ overflow: 'hidden', paddingBottom: '0.2em', margin: '-0.2em 0' }}><div className="work-line">THREE PROBLEMS.</div></div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.2em', margin: '-0.2em 0' }}><div className="work-line">THREE DIFFERENT WAYS</div></div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.2em', margin: '-0.2em 0' }}><div className="work-line">TO MAKE COMPLEX THINGS</div></div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.2em', margin: '-0.2em 0' }}><div className="work-line">FEEL SIMPLE.</div></div>
        </h2>
      </div>
    </section>
  );
}
