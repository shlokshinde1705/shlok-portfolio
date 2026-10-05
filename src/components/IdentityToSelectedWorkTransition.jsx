import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/identityToSelectedWorkTransition.css';

gsap.registerPlugin(ScrollTrigger);

// Single repeating block structure:
// SHLOK SHINDE — IDENTITY — SELECTED WORK — 01 →
const TickerBlock = ({ blockId, isAriaHidden = false }) => (
  <div className="identity-work-ticker-block" aria-hidden={isAriaHidden} data-block={blockId}>
    <span className="ticker-item-name">SHLOK SHINDE</span>
    <span className="ticker-sep">—</span>
    <span className="ticker-item-label">IDENTITY</span>
    <span className="ticker-sep">—</span>
    <span className="ticker-item-label">SELECTED WORK</span>
    <span className="ticker-sep">—</span>
    <span className="ticker-item-num">01</span>
    <span className="ticker-arrow">→</span>
    <span className="ticker-divider" />
  </div>
);

export default function IdentityToSelectedWorkTransition() {
  const bandRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    if (!bandRef.current || !scrollWrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scroll-driven horizontal shift:
      // As the user scrolls down through the Identity -> Selected Work boundary,
      // the scroll translates the text track continuously from RIGHT -> LEFT.
      gsap.fromTo(
        scrollWrapperRef.current,
        {
          x: 120,
        },
        {
          x: -420,
          ease: 'none',
          scrollTrigger: {
            trigger: bandRef.current,
            start: 'top bottom', // when top of band enters viewport bottom
            end: 'bottom top',   // when bottom of band leaves viewport top
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, bandRef);

    return () => ctx.revert();
  }, []);

  // 4 blocks per half = 8 blocks total (~7000px wide)
  // Perfectly covers any display width without gaps, overlays, or static duplicates
  const halfA = [1, 2, 3, 4];
  const halfB = [5, 6, 7, 8];

  return (
    <div
      ref={bandRef}
      id="identity-work-transition"
      className="identity-work-band"
      role="region"
      aria-label="Identity to Selected Work transition ticker"
    >
      <div ref={scrollWrapperRef} className="identity-work-scroll-wrapper">
        <div className="identity-work-ticker-track">
          {/* First half of track */}
          {halfA.map((id) => (
            <TickerBlock key={`track-a-${id}`} blockId={`a-${id}`} isAriaHidden={false} />
          ))}

          {/* Second identical half for 100% seamless marquee looping */}
          {halfB.map((id) => (
            <TickerBlock key={`track-b-${id}`} blockId={`b-${id}`} isAriaHidden={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
