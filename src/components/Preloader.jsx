import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/preloader.css';

// Global execution lock to permanently prevent replays during the session.
let sessionPreloaderCompleted = false;

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const [isDead, setIsDead] = useState(sessionPreloaderCompleted);
  
  // Create a stable ref for onComplete to prevent React re-renders from destroying the timeline
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isDead || sessionPreloaderCompleted) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (window.lenis) window.lenis.stop();

    const cleanupAndExit = () => {
      sessionPreloaderCompleted = true;
      setIsDead(true);
      if (window.lenis) window.lenis.start();
      if (onCompleteRef.current) onCompleteRef.current();
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: cleanupAndExit
      });

      if (prefersReducedMotion) {
        tl.to(containerRef.current, { autoAlpha: 0, duration: 0.5, delay: 0.2 });
        return;
      }

      // INITIAL SETUP
      gsap.set('.c-panel', { yPercent: -100 });
      // 0.0 - 0.2: Visually concealed in DOM
      gsap.set('.central-identity-wrapper', { opacity: 0, y: 35, clipPath: 'inset(0 0 100% 0)' });
      
      tl.addLabel('identity', 0.2);
      
      // Phase A: Reveal (0.2s - 0.85s)
      tl.to('.central-identity-wrapper', {
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(0 0 0% 0)', 
        duration: 0.65, 
        ease: 'power3.out' 
      }, 'identity');

      // Phase B: Curtains Close (1.1s - 1.9s)
      tl.addLabel('close', 1.1);
      tl.to('.c-panel-3', { yPercent: 0, duration: 0.6, ease: 'power2.inOut' }, 'close');
      tl.to('.c-panel-2', { yPercent: 0, duration: 0.6, ease: 'power2.inOut' }, 'close+=0.1');
      tl.to('.c-panel-4', { yPercent: 0, duration: 0.6, ease: 'power2.inOut' }, 'close+=0.1');
      tl.to('.c-panel-1', { yPercent: 0, duration: 0.6, ease: 'power2.inOut' }, 'close+=0.2');
      tl.to('.c-panel-5', { yPercent: 0, duration: 0.6, ease: 'power2.inOut' }, 'close+=0.2');

      // Fully closed at exactly 1.9s.
      // Remove black background instantly behind the white wall.
      tl.set('.master-stage', { opacity: 0 }, 1.9);

      // Phase C & D: Open (1.9s - 2.9s)
      tl.addLabel('open', 1.9);
      tl.to('.c-panel-3', { yPercent: -105, duration: 0.8, ease: 'power2.inOut' }, 'open');
      tl.to('.c-panel-2', { yPercent: -105, duration: 0.8, ease: 'power2.inOut' }, 'open+=0.1');
      tl.to('.c-panel-4', { yPercent: -105, duration: 0.8, ease: 'power2.inOut' }, 'open+=0.1');
      tl.to('.c-panel-1', { yPercent: -105, duration: 0.8, ease: 'power2.inOut' }, 'open+=0.2');
      tl.to('.c-panel-5', { yPercent: -105, duration: 0.8, ease: 'power2.inOut' }, 'open+=0.2');

    }, containerRef);

    // Hard fallback
    const failsafe = setTimeout(() => {
      cleanupAndExit();
    }, 4500); 

    return () => {
      ctx.revert();
      clearTimeout(failsafe);
    };
  }, []); // NO dependencies - initialization runs exactly once

  if (isDead || sessionPreloaderCompleted) return null;

  return (
    <div className="preloader-container" ref={containerRef}>
      
      <div className="master-stage">
        <div className="central-identity">
          <div className="central-identity-wrapper">
            <h1 className="central-identity-line">SHLOK</h1>
            <h1 className="central-identity-line secondary">SHINDE</h1>
          </div>
        </div>
      </div>

      <div className="c-panel c-panel-1" />
      <div className="c-panel c-panel-2" />
      <div className="c-panel c-panel-3" />
      <div className="c-panel c-panel-4" />
      <div className="c-panel c-panel-5" />

      <div className="preloader-noise" />
      
    </div>
  );
}
