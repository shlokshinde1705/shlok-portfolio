import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // Statement line-by-line reveal
      gsap.fromTo('.statement-line', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.statement-container',
          start: 'top 85%',
        }}
      );

      // Portrait subtle reveal
      gsap.fromTo('.about-portrait', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: {
          trigger: '.statement-container', // Trigger alongside the statement
          start: 'top 85%',
        }}
      );

      // Other content stagger
      gsap.fromTo('.about-fade', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.about-fade-container',
          start: 'top 85%',
        }}
      );

      // Marquee continuous animation
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const capabilities = [
    { num: '01', title: 'PRODUCT DESIGN', desc: 'Turning complex problems into clear product experiences.' },
    { num: '02', title: 'UI / UX', desc: 'Structuring interfaces around clarity, hierarchy and usability.' },
    { num: '03', title: 'INTERACTION DESIGN', desc: 'Designing motion and interaction that gives interfaces a sense of life.' },
    { num: '04', title: 'CREATIVE DEVELOPMENT', desc: 'Combining design, animation and code to create expressive web experiences.' },
    { num: '05', title: 'FRONTEND DEVELOPMENT', desc: 'Building responsive interfaces with React and modern frontend technologies.' }
  ];

  return (
    <section id="about" ref={containerRef} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', position: 'relative', width: '100%', overflow: 'hidden' }}>
      
      {/* LOCAL IMPORT FOR BOLD DISPLAY FONT TO ENSURE AVAILABILITY */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        
        .display-font-about { 
          font-family: 'Archivo Black', 'Arial Black', 'Impact', sans-serif; 
          font-weight: 400; 
        }

        .cap-row {
          transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1);
          cursor: default;
        }
        .cap-row:hover {
          transform: translateX(12px);
        }
        .cap-icon {
          transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1);
          display: inline-block;
        }
        .cap-row:hover .cap-icon {
          transform: rotate(45deg);
        }
        .cap-desc {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.4s, margin-top 0.4s;
        }
        .cap-row:hover .cap-desc {
          max-height: 100px;
          opacity: 1;
          margin-top: 1rem;
        }

        /* Desktop specific portrait overlap */
        @media (min-width: 1025px) {
          .about-portrait {
            margin-top: -3rem; /* Slight layout overlap */
          }
        }

        @media (max-width: 1024px) {
          .about-grid { display: flex !important; flex-direction: column !important; gap: 4rem !important; }
          .about-portrait { width: 100% !important; max-width: 500px; margin: 0 auto; }
          .about-id-cap { flex-direction: column !important; gap: 4rem !important; }
        }
      `}} />

      <div style={{ padding: '8rem 5vw 4rem', maxWidth: '2000px', margin: '0 auto' }}>
        
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', marginBottom: '8rem' }}>
          
          {/* LEFT: 06 / ABOUT & HUGE STATEMENT */}
          <div className="statement-container" style={{ gridColumn: '1 / 9' }}>
            <div style={{ overflow: 'hidden' }}>
              <p className="statement-line" style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '3rem' }}>
                06 / ABOUT
              </p>
            </div>
            
            <h2 className="display-font-about" style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)', lineHeight: 0.95, textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}><div className="statement-line">I WORK BETWEEN THE</div></div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}><div className="statement-line">STRUCTURE OF SOFTWARE</div></div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}><div className="statement-line">AND THE FEELING OF DESIGN.</div></div>
            </h2>
          </div>

          {/* RIGHT: PORTRAIT */}
          <div style={{ gridColumn: '9 / 13', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <div className="about-portrait" style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
              <img src="/shlok-portrait.png" alt="Shlok Shinde" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: IDENTITY + CAPABILITIES */}
        <div className="about-fade-container about-id-cap" style={{ display: 'flex', justifyContent: 'space-between', gap: '8rem', marginBottom: '6rem' }}>
          
          {/* IDENTITY */}
          <div className="about-fade" style={{ flex: '0 0 300px' }}>
            <h3 className="display-font-about" style={{ fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>SHLOK SHINDE</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Digital Product Designer<br/>
              × Creative Developer
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              B.Tech Information Technology<br/>
              Vidyalankar Institute of Technology, Mumbai
            </p>
          </div>

          {/* CAPABILITIES */}
          <div className="about-fade" style={{ flex: 1, maxWidth: '850px' }}>
            <h3 className="display-font-about" style={{ fontSize: '2rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>CORE CAPABILITIES</h3>
            <div style={{ borderTop: '2px solid rgba(0,0,0,1)' }}>
              {capabilities.map((cap, i) => (
                <div key={i} className="cap-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1.5rem 0', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{cap.num}</span>
                      <span className="display-font-about" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', letterSpacing: '-0.01em' }}>{cap.title}</span>
                    </div>
                    <span className="cap-icon display-font-about" style={{ fontSize: '2rem', lineHeight: 1 }}>+</span>
                  </div>
                  <div className="cap-desc">
                    <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '3.5rem', maxWidth: '80%' }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* MARQUEE */}
      <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1.5rem 0', display: 'flex', whiteSpace: 'nowrap', backgroundColor: 'var(--bg-color)', marginBottom: '4rem' }}>
        <div className="marquee-inner" style={{ display: 'flex', gap: '2rem' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <span className="display-font-about" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>SHLOK SHINDE</span>
              <span style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.2)' }}>—</span>
              <span className="display-font-about" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>B.TECH IT</span>
              <span style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.2)' }}>—</span>
              <span className="display-font-about" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>MUMBAI</span>
              <span style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.2)' }}>—</span>
              <span className="display-font-about" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>DIGITAL PRODUCT DESIGN</span>
              <span style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.2)' }}>—</span>
              <span className="display-font-about" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>CREATIVE DEVELOPMENT</span>
              <span style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.2)' }}>—</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
