import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let mouse = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };
    let history = [];
    let maxHistory = 30;
    let hasMoved = false;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        pos.x = mouse.x;
        pos.y = mouse.y;
        canvas.style.display = 'block';
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    let rafId;

    let targetLuminance = 18; // Default to #121212 (black)
    let currentLuminance = 18;

    const render = () => {
      // Spring physics
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      history.push({ x: pos.x, y: pos.y });

      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      let currentMaxHistory = Math.min(maxHistory, Math.max(3, Math.floor(velocity * 0.8)));
      while (history.length > currentMaxHistory) {
        history.shift();
      }
      
      // Hit testing for background color
      if (hasMoved) {
        const el = document.elementFromPoint(mouse.x, mouse.y);
        if (el) {
          const darkContainer = el.closest('[data-cursor-bg="dark"]');
          targetLuminance = darkContainer ? 255 : 18; // 255 = White, 18 = #121212 Black
        }
      }

      // Smoothly animate the color transition (approx 150-250ms)
      currentLuminance += (targetLuminance - currentLuminance) * 0.15;
      
      const lum = Math.round(currentLuminance);
      const brushColor = `rgb(${lum}, ${lum}, ${lum})`;

      ctx.clearRect(0, 0, width, height);

      // Draw trail
      if (history.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = brushColor;
        
        for (let i = 0; i < history.length - 1; i++) {
          ctx.beginPath();
          if (i === 0) {
            ctx.moveTo(history[0].x, history[0].y);
          } else {
            const xc_prev = (history[i - 1].x + history[i].x) / 2;
            const yc_prev = (history[i - 1].y + history[i].y) / 2;
            ctx.moveTo(xc_prev, yc_prev);
          }
          
          const xc = (history[i].x + history[i + 1].x) / 2;
          const yc = (history[i].y + history[i + 1].y) / 2;
          
          ctx.quadraticCurveTo(history[i].x, history[i].y, xc, yc);
          
          const progress = i / (history.length - 1);
          const thickness = 8 * Math.pow(progress, 1.5); 
          
          ctx.lineWidth = Math.max(0.5, thickness);
          ctx.stroke();
        }
      }

      // Draw thick brush head at the actual mouse position
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = brushColor;
      ctx.fill();

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
        display: 'none'
      }}
    />
  );
}
