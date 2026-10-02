import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  const steps = [
    { num: '01', title: "UNDERSTAND", desc: "Find the real problem before designing the solution.", width: '60vw', yOffset: '-4vh', rotation: -1.5, titleOffset: '-3vw', align: 'flex-start' },
    { num: '02', title: "FRAME", desc: "Turn ambiguity into a clear direction.", width: '45vw', yOffset: '6vh', rotation: 1.5, titleOffset: '2vw', align: 'center' },
    { num: '03', title: "EXPLORE", desc: "Generate possibilities and test different directions.", width: '65vw', yOffset: '-2vh', rotation: -1, titleOffset: '-2vw', align: 'flex-end' },
    { num: '04', title: "DESIGN", desc: "Turn the direction into a clear interface and interaction.", width: '50vw', yOffset: '5vh', rotation: 2, titleOffset: '0', align: 'flex-start' },
    { num: '05', title: "BUILD", desc: "Make the experience real through code.", width: '55vw', yOffset: '-6vh', rotation: -1.5, titleOffset: '-2vw', align: 'center' },
    { num: '06', title: "REFINE", desc: "Remove friction, improve details and polish the interaction.", width: '65vw', yOffset: '0vh', rotation: 0, titleOffset: '-4vw', align: 'flex-start' }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia(containerRef);

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      ScrollTrigger.refresh();

      const getScrollAmount = () => track ? track.scrollWidth - window.innerWidth : 0;
      
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none'
      });

      // Smooth receding transition for the intro typography
      gsap.to(['.intro-content', '.intro-bg-text'], {
        x: -100, // Moves slightly faster than the track, creating parallax
        opacity: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.intro',
          containerAnimation: tl,
          start: 'left left',
          end: 'right center',
          scrub: true
        }
      });

      const cards = gsap.utils.toArray('.process-card-wrapper');
      cards.forEach((wrapper, i) => {
        const card = wrapper.querySelector('.process-card');
        const num = wrapper.querySelector('.card-num');
        const title = wrapper.querySelector('.card-title');
        const desc = wrapper.querySelector('.card-desc');
        
        let cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            containerAnimation: tl,
            start: 'left 95%',
            end: 'center center',
            scrub: 1
          }
        });

        // Start subtle rotation and faint border, animate to solid and 0 rotation
        gsap.set(card, { borderColor: 'rgba(0,0,0,0.1)' });
        cardTl.to(card, { rotation: 0, borderColor: 'rgba(0,0,0,1)', ease: 'power2.out' }, 0);
        
        // Slight scale and opacity reveal for the giant cropped number
        gsap.fromTo(num, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.05, ease: 'power2.out' }, 0);

        // Expressive title reveal sliding up slightly
        gsap.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.2);

        // Description fades in smoothly
        gsap.fromTo(desc, { x: -20, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.4);
      });

    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.process-card').forEach(card => {
        gsap.from(card, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%' }});
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} style={{ backgroundColor: 'var(--bg-color)', overflow: 'hidden', position: 'relative' }}>
      
      {/* GLOBAL IMPORT FOR BOLD DISPLAY FONT */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        
        .display-font { 
          font-family: 'Archivo Black', 'Arial Black', 'Impact', sans-serif; 
          font-weight: 400; 
        }
        
        @media (max-width: 767px) {
          #process { height: auto !important; }
          .process-track { flex-direction: column !important; height: auto !important; width: 100% !important; padding: 5rem 1.5rem !important; gap: 4rem; }
          .process-panel, .process-card-wrapper { width: 100% !important; height: auto !important; margin: 0 !important; padding: 0 !important; }
          .process-card { transform: none !important; min-height: 400px; height: auto !important; }
          .card-title { margin-left: 0 !important; font-size: 3rem !important; }
          .card-num { opacity: 0.05 !important; }
        }
      `}} />

      <div ref={trackRef} className="process-track" style={{ display: 'flex', height: '100vh', width: 'fit-content', alignItems: 'center', position: 'relative', zIndex: 1, willChange: 'transform' }}>
        
        {/* INTRO */}
        <div className="process-panel intro" style={{ width: '75vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw', position: 'relative' }}>
          
          <div className="display-font intro-bg-text" style={{ position: 'absolute', top: '15%', right: '-5%', fontSize: '30vw', lineHeight: 0.8, color: 'rgba(0,0,0,0.02)', pointerEvents: 'none', zIndex: 0, whiteSpace: 'nowrap' }}>
            HOW
          </div>

          <div className="intro-content" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-color)', marginBottom: '3rem' }}>
              06 / PROCESS
            </p>
            <h2 className="display-font" style={{ fontSize: 'clamp(4.5rem, 12.5vw, 11rem)', lineHeight: 0.95, textTransform: 'uppercase', color: 'var(--text-color)', margin: 0, letterSpacing: '-0.02em' }}>
              HOW<br/>I<br/>BUILD
            </h2>
          </div>
        </div>

        {/* 6 STAGES - EXPRESSIVE EDITORIAL CARDS */}
        {steps.map((step, i) => (
          <div 
            key={i} 
            className="process-card-wrapper" 
            style={{ 
              width: step.width, height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: '0',
              marginRight: i === 5 ? '15vw' : '8vw', // 15vw right margin on the last card ensures the track ends with the final card perfectly centered
              position: 'relative'
            }}
          >
            <div 
              className="process-card" 
              style={{ 
                width: '100%', height: '65vh', backgroundColor: 'var(--bg-color)',
                border: '2px solid rgba(0,0,0,0.1)', // GSAP animates this to solid black
                padding: 'clamp(2rem, 4vw, 4rem)', display: 'flex', flexDirection: 'column',
                position: 'relative',
                transform: `translateY(${step.yOffset}) rotate(${step.rotation}deg)`,
                willChange: 'transform, border-color'
              }}
            >
              {/* Giant number bleeding out of the card boundaries for an editorial feel */}
              <div 
                className="display-font card-num"
                style={{
                  position: 'absolute', top: i % 2 === 0 ? '-15%' : 'auto', bottom: i % 2 !== 0 ? '-15%' : 'auto',
                  right: i % 2 === 0 ? '-8%' : 'auto', left: i % 2 !== 0 ? '-8%' : 'auto',
                  fontSize: 'clamp(15rem, 30vw, 25rem)', lineHeight: 0.75, color: 'var(--text-color)', opacity: 0, // GSAP controls opacity
                  zIndex: 0, pointerEvents: 'none'
                }}
              >
                {step.num}
              </div>

              {/* Text content layering */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: step.align }}>
                <h3 className="display-font card-title" style={{ fontSize: 'clamp(3.5rem, 7vw, 8rem)', lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--text-color)', marginBottom: '2rem', marginLeft: step.titleOffset, opacity: 0 }}>
                  {step.title}
                </h3>
                <p className="card-desc" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)', fontWeight: 500, lineHeight: 1.3, color: 'var(--text-color)', maxWidth: '450px', opacity: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}
