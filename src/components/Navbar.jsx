import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScrollUpdate = () => {
      const sections = ['hero', 'work', 'nova', 'pulse', 'arc', 'process', 'about', 'contact'];
      let current = 'hero'; // fallback
      
      const scrollY = window.scrollY;
      const middle = window.innerHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Find the section that occupies the middle of the screen
          if (rect.top <= middle && rect.bottom > middle) {
            current = id;
            break;
          }
        }
      }
      
      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollUpdate);
        ticking = true;
      }
    };

    handleScrollUpdate();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    window.history.pushState(null, '', `#${id}`);
    if(window.lenis) {
      window.lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 100, mixBlendMode: 'difference', color: '#fff' }}>
      <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>SHLOK SHINDE</div>
      <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
        {['WORK', 'PROCESS', 'ABOUT', 'CONTACT'].map((item) => {
          const id = item.toLowerCase();
          const isActive = activeId === id || (id === 'work' && (activeId === 'nova' || activeId === 'pulse' || activeId === 'arc'));
          return (
            <a 
              key={item} href={`#${id}`} onClick={(e) => handleScroll(e, id)}
              className={`nav-link text-label ${isActive ? 'active' : ''}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {item}
            </a>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .nav-container { padding: 1.5rem 1rem !important; flex-direction: column !important; align-items: center !important; gap: 1rem !important; }
          .nav-links { gap: 1rem !important; flex-wrap: wrap !important; justify-content: center !important; }
        }
      `}} />
    </nav>
  );
}
