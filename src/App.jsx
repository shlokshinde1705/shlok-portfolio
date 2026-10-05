import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import IdentityToSelectedWorkTransition from './components/IdentityToSelectedWorkTransition';
import WorkIntro from './components/WorkIntro';
import ProjectNova from './components/ProjectNova';
import ProjectPulse from './components/ProjectPulse';
import ProjectArc from './components/ProjectArc';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);
if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (window.lenis) window.lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          if (
            window.location.hash &&
            window.lenis &&
            performance.getEntriesByType('navigation')[0]?.type !== 'reload'
          ) {
            window.lenis.scrollTo(window.location.hash, { immediate: true });
          }
        }, 100);
      });
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main>
        <Navbar />
        <Hero />
        <IdentityToSelectedWorkTransition />
        <WorkIntro />
        <ProjectNova />
        <ProjectPulse />
        <ProjectArc />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
