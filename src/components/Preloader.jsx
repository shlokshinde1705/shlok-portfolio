import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Lock scrolling temporarily while preloader is active
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
        onComplete();
      }
    });

    // Fade text out slightly before curtains move
    tl.to(textRef.current, { opacity: 0, duration: 0.2, ease: 'power2.inOut' }, 0.15)
      
      // Fall away panels (Left drops first, right follows with tiny 0.04s stagger)
      .to(leftPanelRef.current, { 
        yPercent: 110, 
        xPercent: -3,
        duration: 0.9, 
        ease: 'power4.inOut' 
      }, 0.3)
      .to(rightPanelRef.current, { 
        yPercent: 110, 
        xPercent: 3,
        duration: 0.9, 
        ease: 'power4.inOut' 
      }, 0.34); 

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 999999,
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'auto'
      }}
    >
      
      {/* Left Curtain Panel */}
      <div 
        ref={leftPanelRef}
        className="preloader-curtain-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: 'var(--bg-color)',
          zIndex: 1,
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)'
        }}
      />

      {/* Right Curtain Panel */}
      <div 
        ref={rightPanelRef}
        className="preloader-curtain-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: 'var(--bg-color)',
          zIndex: 1,
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)'
        }}
      />

      {/* Centered Editorial Metadata */}
      <div 
        ref={textRef} 
        style={{ 
          position: 'relative', 
          zIndex: 10,
          textAlign: 'center',
          opacity: 1,
          visibility: 'visible'
        }}
      >
        <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-color)', margin: '0 0 0.5rem' }}>SHLOK SHINDE</p>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>DIGITAL PRODUCT / CREATIVE DEVELOPMENT</p>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', margin: 0 }}>2026</p>
      </div>
      
    </div>
  );
}
