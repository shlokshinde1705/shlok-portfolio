import React, { useEffect, useRef } from 'react';
import '../styles/aboutArtwork.css';

export default function AboutArtwork3D() {
  const stageRef = useRef(null);
  const sketchRef = useRef(null);
  const frameRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let startTime = null;
    let raf;

    // Cache elements for coordinated installation motion
    const orbit1 = stage.querySelector('.about-artwork__orbit--one');
    const orbit2 = stage.querySelector('.about-artwork__orbit--two');
    const orbit3 = stage.querySelector('.about-artwork__orbit--three');

    const frag1 = stage.querySelector('.fragment-1');
    const frag2 = stage.querySelector('.fragment-2');
    const frag3 = stage.querySelector('.fragment-3');
    const frag4 = stage.querySelector('.fragment-4');

    const dot1 = stage.querySelector('.dot-1');
    const dot2 = stage.querySelector('.dot-2');
    const dot3 = stage.querySelector('.dot-3');
    const dot4 = stage.querySelector('.dot-4');
    const dot5 = stage.querySelector('.dot-5');

    const handleMouseMove = (event) => {
      const rect = stage.getBoundingClientRect();

      targetX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      targetY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp || performance.now();
      const now = timestamp || performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth interpolation / lerp for cursor response
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      /* ========================================================
         1. SKETCH
         - Gentle automatic up/down float: ±4px
         - Slight horizontal drift: ±1px
         - Rotation: ±0.2deg
         - 5-6s smooth ease-in-out loop
         - Subtle cursor parallax
         ======================================================== */
      const sketchFloatY = Math.sin(elapsed * 1.14) * 4.0;
      const sketchFloatX = Math.cos(elapsed * 0.85) * 1.0;
      const sketchFloatRot = Math.sin(elapsed * 0.95) * 0.2;

      const sketchX = currentX * -2.0 + sketchFloatX;
      const sketchY = currentY * -1.5 + sketchFloatY;
      const sketchRotY = currentX * -0.5;
      const sketchRotX = currentY * 0.4;

      if (sketchRef.current) {
        sketchRef.current.style.transform = `translate3d(${sketchX.toFixed(3)}px, ${sketchY.toFixed(3)}px, 20px) rotateY(${sketchRotY.toFixed(3)}deg) rotateX(${sketchRotX.toFixed(3)}deg) rotateZ(${sketchFloatRot.toFixed(3)}deg)`;
      }

      /* ========================================================
         2. SCULPTURE / STRUCTURE
         - Moves gently with sketch: ±2.5px Y, ±0.8px X, ±0.25deg rot
         - Cursor parallax: max ±3.5px X/Y, ±0.8deg rotate
         - CRITICAL: Upper & lower layers receive EXACT SAME transform
         ======================================================== */
      const structFloatY = Math.sin(elapsed * 1.14 - 0.3) * 2.5;
      const structFloatX = Math.cos(elapsed * 0.85 - 0.3) * 0.8;
      const structFloatRot = Math.sin(elapsed * 0.95 - 0.3) * 0.25;

      const structX = currentX * 3.5 + structFloatX;
      const structY = currentY * 3.0 + structFloatY;
      const structRotY = currentX * 0.8;
      const structRotX = currentY * -0.5;

      const structureTransform = `translate3d(${structX.toFixed(3)}px, ${structY.toFixed(3)}px, 0px) rotateY(${structRotY.toFixed(3)}deg) rotateX(${structRotX.toFixed(3)}deg) rotateZ(${structFloatRot.toFixed(3)}deg)`;

      if (backRef.current) {
        backRef.current.style.transform = structureTransform;
      }

      if (frontRef.current) {
        frontRef.current.style.transform = structureTransform;
      }

      /* ========================================================
         3. FRAME
         - Subtle float: ±1.5px Y, ±0.6px X, ±0.12deg rot
         - Subtle cursor parallax
         ======================================================== */
      const frameFloatY = Math.sin(elapsed * 1.14 - 0.6) * 1.5;
      const frameFloatX = Math.cos(elapsed * 0.85 - 0.6) * 0.6;
      const frameFloatRot = Math.sin(elapsed * 0.95 - 0.6) * 0.12;

      const frameX = currentX * 1.8 + frameFloatX;
      const frameY = currentY * 1.2 + frameFloatY;
      const frameRotY = currentX * 0.4;

      if (frameRef.current) {
        frameRef.current.style.transform = `translate3d(${frameX.toFixed(3)}px, ${frameY.toFixed(3)}px, 10px) rotateY(${frameRotY.toFixed(3)}deg) rotateZ(${frameFloatRot.toFixed(3)}deg)`;
      }

      /* ========================================================
         4. ORBITAL WIRES
         - Extremely slow, subtle floating drift / rotation (no fast spin)
         ======================================================== */
      if (orbit1) {
        const o1X = currentX * 1.5 + Math.cos(elapsed * 0.6) * 1.2;
        const o1Y = currentY * 1.2 + Math.sin(elapsed * 0.7) * 1.5;
        const o1Rot = 17 + Math.sin(elapsed * 0.5) * 0.7;
        orbit1.style.transform = `translate(calc(-50% + ${o1X.toFixed(2)}px), calc(-50% + ${o1Y.toFixed(2)}px)) rotate(${o1Rot.toFixed(2)}deg) translateZ(130px)`;
      }

      if (orbit2) {
        const o2X = currentX * 1.2 + Math.cos(elapsed * 0.55 + 1) * 1.0;
        const o2Y = currentY * 1.0 + Math.sin(elapsed * 0.65 + 1) * 1.2;
        const o2Rot = -31 + Math.cos(elapsed * 0.45) * 0.6;
        orbit2.style.transform = `translate(calc(-50% + ${o2X.toFixed(2)}px), calc(-50% + ${o2Y.toFixed(2)}px)) rotate(${o2Rot.toFixed(2)}deg) translateZ(80px)`;
      }

      if (orbit3) {
        const o3X = currentX * 1.8 + Math.cos(elapsed * 0.5 + 2) * 1.5;
        const o3Y = currentY * 1.4 + Math.sin(elapsed * 0.6 + 2) * 1.8;
        const o3Rot = -10 + Math.sin(elapsed * 0.4) * 0.5;
        orbit3.style.transform = `translate(calc(-50% + ${o3X.toFixed(2)}px), calc(-50% + ${o3Y.toFixed(2)}px)) rotate(${o3Rot.toFixed(2)}deg) translateZ(170px)`;
      }

      /* ========================================================
         5. FLOATING FRAGMENTS
         - Slow individual floating: max ±2-3px
         ======================================================== */
      if (frag1) {
        const f1X = currentX * 2.0 + Math.cos(elapsed * 0.7) * 1.4;
        const f1Y = currentY * 1.8 + Math.sin(elapsed * 0.8) * 2.2;
        frag1.style.transform = `translate3d(${f1X.toFixed(2)}px, ${f1Y.toFixed(2)}px, 220px) rotate(25deg)`;
      }

      if (frag2) {
        const f2X = currentX * 2.2 + Math.cos(elapsed * 0.65 + 1.2) * 1.6;
        const f2Y = currentY * 2.0 + Math.sin(elapsed * 0.75 + 1.2) * 2.4;
        frag2.style.transform = `translate3d(${f2X.toFixed(2)}px, ${f2Y.toFixed(2)}px, 250px) rotate(-22deg)`;
      }

      if (frag3) {
        const f3X = currentX * 1.6 + Math.cos(elapsed * 0.75 + 2.4) * 1.2;
        const f3Y = currentY * 1.5 + Math.sin(elapsed * 0.85 + 2.4) * 1.8;
        frag3.style.transform = `translate3d(${f3X.toFixed(2)}px, ${f3Y.toFixed(2)}px, 190px) rotate(48deg)`;
      }

      if (frag4) {
        const f4X = currentX * 1.8 + Math.cos(elapsed * 0.6 + 3.6) * 1.3;
        const f4Y = currentY * 1.6 + Math.sin(elapsed * 0.7 + 3.6) * 2.0;
        frag4.style.transform = `translate3d(${f4X.toFixed(2)}px, ${f4Y.toFixed(2)}px, 230px) rotate(-38deg)`;
      }

      /* ========================================================
         6. DOTS
         - Extremely subtle floating: ±1-1.5px with individual timing
         ======================================================== */
      if (dot1) {
        dot1.style.transform = `translate3d(${(currentX * 1.0 + Math.cos(elapsed * 0.6) * 0.8).toFixed(2)}px, ${(currentY * 0.8 + Math.sin(elapsed * 0.7) * 1.2).toFixed(2)}px, 0)`;
      }
      if (dot2) {
        dot2.style.transform = `translate3d(${(currentX * 1.2 + Math.cos(elapsed * 0.65 + 1) * 1.0).toFixed(2)}px, ${(currentY * 1.0 + Math.sin(elapsed * 0.75 + 1) * 1.4).toFixed(2)}px, 0)`;
      }
      if (dot3) {
        dot3.style.transform = `translate3d(${(currentX * 0.8 + Math.cos(elapsed * 0.55 + 2) * 0.7).toFixed(2)}px, ${(currentY * 0.7 + Math.sin(elapsed * 0.65 + 2) * 1.0).toFixed(2)}px, 0)`;
      }
      if (dot4) {
        dot4.style.transform = `translate3d(${(currentX * 1.1 + Math.cos(elapsed * 0.7 + 3) * 0.9).toFixed(2)}px, ${(currentY * 0.9 + Math.sin(elapsed * 0.8 + 3) * 1.2).toFixed(2)}px, 0)`;
      }
      if (dot5) {
        dot5.style.transform = `translate3d(${(currentX * 0.9 + Math.cos(elapsed * 0.6 + 4) * 0.8).toFixed(2)}px, ${(currentY * 0.8 + Math.sin(elapsed * 0.7 + 4) * 1.1).toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);

    raf = requestAnimationFrame(animate);

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="about-artwork" ref={stageRef}>

      <div className="about-artwork__atmosphere" />

      <div className="about-artwork__paper about-artwork__paper--left" />

      <div className="about-artwork__paper about-artwork__paper--right" />

      <div
        className="about-artwork__frame"
        ref={frameRef}
      />

      {/* BACK / UPPER SCULPTURE */}

      <img
        ref={backRef}
        className="about-artwork__sculpture about-artwork__sculpture--back"
        src="/about-sculpture.png"
        alt=""
        draggable="false"
      />

      {/* ORBITAL WIRES */}

      <div className="about-artwork__orbit about-artwork__orbit--one" />

      <div className="about-artwork__orbit about-artwork__orbit--two" />

      <div className="about-artwork__orbit about-artwork__orbit--three" />

      {/* ORIGINAL SKETCH */}

      <img
        ref={sketchRef}
        className="about-artwork__sketch"
        src="/shlok-sketch.png"
        alt="Shlok Shinde sketch portrait"
        draggable="false"
      />

      {/* FRONT / LOWER SCULPTURE */}

      <img
        ref={frontRef}
        className="about-artwork__sculpture about-artwork__sculpture--front"
        src="/about-sculpture.png"
        alt=""
        draggable="false"
      />

      {/* FLOATING GEOMETRIC FRAGMENTS */}

      <span className="about-artwork__fragment fragment-1" />

      <span className="about-artwork__fragment fragment-2" />

      <span className="about-artwork__fragment fragment-3" />

      <span className="about-artwork__fragment fragment-4" />

      {/* FLOATING DOTS */}

      <span className="about-artwork__dot dot-1" />

      <span className="about-artwork__dot dot-2" />

      <span className="about-artwork__dot dot-3" />

      <span className="about-artwork__dot dot-4" />

      <span className="about-artwork__dot dot-5" />

    </div>
  );
}