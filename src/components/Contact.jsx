import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Artifact3D from './Artifact3D';
import Magnetic from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    let enterAnim;

    const ctx = gsap.context(() => {
      
      gsap.from('.contact-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#121212', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Artifact3D variant="contact" />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', top: '-2rem' }}>
        <p className="contact-reveal text-label" style={{ marginBottom: '2rem', color: '#888' }}>07 / CONTACT</p>
        <h2 className="contact-reveal text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', marginBottom: '2rem' }}>
          HAVE<br/>SOMETHING<br/>WORTH<br/>BUILDING?
        </h2>
        
        <div className="contact-reveal" style={{ pointerEvents: 'auto', display: 'inline-block' }}>
          <Magnetic intensity={0.5} scale={1.05}>
            <a href="mailto:hello@shlokshinde.com" className="contact-cta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em', textDecoration: 'none' }}>
              LET'S TALK
              <ArrowUpRight size={24} className="contact-arrow" style={{ transition: 'transform 0.3s' }} />
            </a>
          </Magnetic>
        </div>
      </div>
      
      <footer style={{ position: 'absolute', bottom: '2rem', width: '100%', padding: '0 3rem', display: 'flex', justifyContent: 'space-between', zIndex: 10, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: '#888' }}>
        <div>SHLOK SHINDE<br/>MUMBAI, INDIA</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="mailto:hello@shlokshinde.com" style={{ color: '#fff', textDecoration: 'none' }}>EMAIL</a>
          <a href="https://www.linkedin.com/in/shlok-shinde-b293b12a4" style={{ color: '#fff', textDecoration: 'none' }}>LINKEDIN</a>
          <a href="https://github.com/shlokshinde1705" style={{ color: '#fff', textDecoration: 'none' }}>GITHUB</a>
        </div>
        <div>2026</div>
      </footer>
      <style dangerouslySetInnerHTML={{__html: `
        .contact-cta:hover .contact-arrow { transform: translate(4px, -4px); }
      `}} />
    </section>
  );
}
