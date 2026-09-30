import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let enterAnim;

    const ctx = gsap.context(() => {
      
      gsap.from('.about-reveal', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section id="about" ref={containerRef} style={{ backgroundColor: '#e5e4df', color: 'var(--text-color)', position: 'relative', width: '100%', overflow: 'hidden' }}>
      
      {/* ARC -> ABOUT Transition Bridge */}
      <div style={{ minHeight: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center', padding: '10rem 3rem 2rem' }}>
        <h2 className="text-huge about-reveal" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
          THREE PRODUCTS.<br/>
          <span style={{ color: 'var(--text-secondary)' }}>ONE WAY OF THINKING.</span>
        </h2>
      </div>

      <div style={{ padding: '4rem 3rem 10rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
        
        {/* Left Column (Label + Statement) */}
        <div style={{ gridColumn: '1 / 8' }}>
          <p className="text-label about-reveal" style={{ marginBottom: '2rem' }}>06 / ABOUT</p>
          <h2 className="about-reveal" style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '4rem' }}>
            I WORK BETWEEN THE<br/>
            STRUCTURE OF SOFTWARE<br/>
            AND THE FEELING OF DESIGN.
          </h2>
          
          <div className="about-reveal" style={{ display: 'flex', gap: '4rem', borderTop: '1px solid #d0d0d0', paddingTop: '2rem' }}>
            <div>
              <p className="text-label" style={{ marginBottom: '1rem', color: '#888' }}>IDENTITY</p>
              <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>SHLOK SHINDE<br/>Digital Product Design<br/>× Creative Development</p>
            </div>
            <div>
              <p className="text-label" style={{ marginBottom: '1rem', color: '#888' }}>LOCATION & BACKGROUND</p>
              <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-secondary)' }}>Information Technology<br/>Mumbai, India<br/>2026</p>
            </div>
          </div>
        </div>

        {/* Right Column (Skills & Portrait Crop) */}
        <div style={{ gridColumn: '9 / 13', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Subtle cropped portrait with interaction */}
          <div 
            ref={imageRef}
            className="about-reveal" 
            onMouseMove={window.innerWidth > 768 ? handleMouseMove : null}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ 
              width: '100%', 
              aspectRatio: '4/3', 
              overflow: 'hidden', 
              backgroundColor: '#d0d0d0',
              position: 'relative',
              borderRadius: '2px'
            }}
          >
            <img 
              src="/shlok-portrait.png" 
              alt="Shlok Shinde" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', filter: 'grayscale(75%) contrast(1.15) brightness(0.95)', 
                objectPosition: 'center 20%', 
                filter: 'grayscale(100%) contrast(1.1)',
                transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
                transform: `scale(1.05) translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
                pointerEvents: 'none'
              }} 
            />
          </div>

          <div className="about-reveal">
            <p className="text-label" style={{ marginBottom: '1.5rem', color: '#888' }}>CORE CAPABILITIES</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {[
                { name: 'PRODUCT DESIGN', secondary: false },
                { name: 'UI / UX', secondary: false },
                { name: 'INTERACTION DESIGN', secondary: false },
                { name: 'CREATIVE DEVELOPMENT', secondary: false, border: true },
                { name: 'REACT / GSAP / THREE.JS', secondary: true },
              ].map((item, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    color: item.secondary ? 'var(--text-secondary)' : 'inherit',
                    borderTop: item.border ? '1px solid #d0d0d0' : 'none',
                    paddingTop: item.border ? '0.75rem' : '0',
                    marginTop: item.border ? '0.5rem' : '0',
                    transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1), color 0.3s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.children[1].style.transform = 'rotate(90deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.children[1].style.transform = 'rotate(0)';
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ color: 'var(--accent)', transition: 'transform 0.3s ease' }}>+</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Transition to Contact */}
      <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem 3rem 12rem' }}>
        <h2 className="text-huge about-reveal" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1 }}>
          DESIGN.<br/>BUILD.<br/>REFINE.
        </h2>
      </div>

    </section>
  );
}
