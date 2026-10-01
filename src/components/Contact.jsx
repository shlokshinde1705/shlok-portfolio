import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Artifact3D from './Artifact3D';
import Magnetic from './Magnetic';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '', _honeypot: '' });
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState === 'loading') return;
    
    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseText = await res.text();
      let data = {};
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error('Something went wrong. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setFormState('success');
      setFormData({ name: '', email: '', message: '', _honeypot: '' });
    } catch (err) {
      setFormState('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" ref={containerRef} style={{ position: 'relative', minHeight: '100vh', width: '100vw', backgroundColor: '#121212', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10rem 0' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Artifact3D variant="contact" />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', width: '100%', maxWidth: '600px', padding: '0 2rem' }}>
        <p className="contact-reveal text-label" style={{ marginBottom: '2rem', color: '#888' }}>07 / CONTACT</p>
        <h2 className="contact-reveal text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', marginBottom: '3rem' }}>
          HAVE<br/>SOMETHING<br/>WORTH<br/>BUILDING?
        </h2>
        
        <div className="contact-reveal" style={{ pointerEvents: 'auto', width: '100%' }}>
          {formState === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--accent)', marginTop: '2rem' }}>
              <CheckCircle2 size={48} />
              <p style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.05em' }}>MESSAGE RECEIVED.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', textAlign: 'left' }}>
              
              <input type="text" name="_honeypot" style={{ display: 'none' }} value={formData._honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />

              <div style={{ display: 'flex', gap: '1.5rem', flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
                <input required type="text" name="name" placeholder="NAME" value={formData.name} onChange={handleChange} disabled={formState === 'loading'} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '1rem 0', fontSize: '0.85rem', letterSpacing: '0.1em', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                
                <input required type="email" name="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} disabled={formState === 'loading'} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '1rem 0', fontSize: '0.85rem', letterSpacing: '0.1em', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = '#333'} />
              </div>

              <textarea required name="message" placeholder="MESSAGE" value={formData.message} onChange={handleChange} disabled={formState === 'loading'} rows={3} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '1rem 0', fontSize: '0.85rem', letterSpacing: '0.1em', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = '#333'} />

              {formState === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div style={{ alignSelf: 'center', marginTop: '2rem' }}>
                <Magnetic intensity={0.5} scale={1.05}>
                  <button type="submit" disabled={formState === 'loading'} className="contact-cta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em', cursor: 'none', opacity: formState === 'loading' ? 0.5 : 1 }}>
                    {formState === 'loading' ? 'SENDING...' : "LET'S TALK"}
                    {formState === 'loading' ? <Loader2 size={24} className="contact-spinner" /> : <ArrowUpRight size={24} className="contact-arrow" style={{ transition: 'transform 0.3s' }} />}
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <footer style={{ position: 'absolute', bottom: '2rem', width: '100%', padding: '0 3rem', display: 'flex', justifyContent: 'space-between', zIndex: 10, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: '#888' }}>
        <div>SHLOK SHINDE<br/>MUMBAI, INDIA</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="mailto:contact@shlokshinde.com" style={{ color: '#fff', textDecoration: 'none' }}>EMAIL</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>LINKEDIN</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>GITHUB</a>
        </div>
        <div>2026</div>
      </footer>
      <style dangerouslySetInnerHTML={{__html: `
        .contact-cta:hover .contact-arrow { transform: translate(4px, -4px); }
        .contact-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #555; }
      `}} />
    </section>
  );
}
