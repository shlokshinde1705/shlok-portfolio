import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.to('.hero-title-inner', { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1, delay: 0.5 });
      gsap.fromTo('.hero-fade-in', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1 });
      
      // Portrait fade in
      gsap.fromTo(portraitRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 1.2 });

      // Scroll Parallax Transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
      
      // Cinematic separation
      tl.to(portraitRef.current, { scale: 1.08, y: '-5vh', opacity: 0, duration: 1.5 }, 0);
      tl.to('.word-build', { y: -80, opacity: 0, duration: 1 }, 0);
      tl.to('.word-things', { x: -60, opacity: 0, duration: 1 }, 0);
      tl.to('.word-that', { x: -100, opacity: 0, duration: 1 }, 0);
      tl.to('.word-move', { y: 80, opacity: 0, duration: 1 }, 0);
      tl.to('.hero-fade-in', { opacity: 0, y: -20, duration: 0.5 }, 0);
    }, containerRef);

    // Subtle Parallax (12px X, 8px Y)
    const xTo = gsap.quickTo(portraitRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(portraitRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1 range
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1 range
      xTo(x * -12);
      yTo(y * -8);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} id="hero" style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* IDENTITY METADATA (Upper Right Whitespace) */}
      <div className="hero-fade-in" style={{ position: 'absolute', top: '3rem', right: '3rem', zIndex: 10, textAlign: 'right', pointerEvents: 'none' }}>
        <p className="text-label" style={{ marginBottom: '0.2rem' }}>01 / IDENTITY</p>
        <p className="text-label" style={{ color: 'var(--text-secondary)' }}>MUMBAI, INDIA<br/>2026</p>
      </div>

      {/* BACK TEXT LAYER (Z-Index 1) */}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '3rem', zIndex: 1, pointerEvents: 'none', width: '100%' }}>
        <h1 className="text-huge hero-title">
          <div className="hero-title-line"><span className="hero-title-inner word-build">BUILD</span></div>
          <div className="hero-title-line" style={{ paddingLeft: '8vw' }}><span className="hero-title-inner word-things">THINGS</span></div>
          <div className="hero-title-line"><span className="hero-title-inner word-that">THAT</span></div>
          <div className="hero-title-line" style={{ paddingLeft: '0vw' }}><span className="hero-title-inner word-move">MOVE</span></div>
        </h1>
      </div>

      {/* PORTRAIT (Z-Index 5) */}
      <div className="hero-portrait" style={{ position: 'absolute', right: '10vw', bottom: '-18vh', height: '105vh', width: 'auto', zIndex: 5, pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <img 
          ref={portraitRef}
          src="/shlok-portrait.png" 
          alt="Shlok Shinde" 
          style={{ 
            height: '100%', 
            width: 'auto', 
            objectFit: 'contain', 
            pointerEvents: 'auto',
            transformOrigin: 'center right'
          }} 
        />
      </div>

      {/* FRONT TEXT LAYER (Z-Index 10) */}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '3rem', zIndex: 10, pointerEvents: 'none', width: '100%' }}>
        <h1 className="text-huge hero-title">
          <div className="hero-title-line" style={{ visibility: 'hidden' }}><span className="word-build">BUILD</span></div>
          <div className="hero-title-line" style={{ paddingLeft: '8vw' }}><span className="hero-title-inner word-things">THINGS</span></div>
          <div className="hero-title-line" style={{ visibility: 'hidden' }}><span className="word-that">THAT</span></div>
          <div className="hero-title-line" style={{ paddingLeft: '0vw' }}><span className="hero-title-inner word-move">MOVE</span></div>
        </h1>
      </div>

      {/* BOTTOM LEFT INFO */}
      <div className="hero-fade-in" style={{ position: 'absolute', bottom: '4rem', left: '3rem', zIndex: 10 }}>
        <p className="text-label" style={{ color: 'var(--text-color)' }}>DIGITAL PRODUCT<br/>DESIGN A- CODE</p>
      </div>

      {/* EXPLORE BUTTON */}
      <div className="hero-fade-in" style={{ position: 'absolute', bottom: '4rem', left: '22vw', zIndex: 10 }}>
        <Magnetic intensity={0.4}>
          <button onClick={() => { window.history.pushState(null, "", "#work"); if(window.lenis) window.lenis.scrollTo("#work"); else document.getElementById("work")?.scrollIntoView({behavior: "smooth"}) }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-color)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }} className="btn-magnetic">
            EXPLORE WORK
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={14} className="btn-arrow" style={{ transition: 'transform 0.3s' }}/>
            </div>
          </button>
        </Magnetic>
      </div>

      {/* SCROLL INDICATOR (Bottom Right Whitespace) */}
      <div className="hero-fade-in scroll-indicator-mobile" style={{ position: 'absolute', bottom: '3rem', right: '2rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p className="text-label" style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.65rem' }}>SCROLL TO DISCOVER</p>
        <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(18,18,18,0.1)', position: 'relative', overflow: 'hidden' }}>
           <div className="scroll-pulse" style={{ width: '100%', height: '50%', backgroundColor: '#121212', position: 'absolute', top: 0 }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .hero-portrait { height: 80vh !important; right: -5vw !important; bottom: 0 !important; }
        }
        @media (max-width: 768px) {
          .hero-portrait { z-index: 0 !important; opacity: 0.3 !important; height: 70vh !important; right: -15vw !important; }
          .hero-title-line { padding-left: 0 !important; }
          .hero-title-line[style] { visibility: visible !important; }
          .hero-fade-in[style*="left: 22vw"] { left: 3rem !important; bottom: 8rem !important; }
          .scroll-indicator-mobile { display: none !important; }
        }
      `}} />
    </section>
  );
}
