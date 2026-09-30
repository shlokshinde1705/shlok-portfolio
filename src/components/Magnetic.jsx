import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, intensity = 0.2, scale = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * intensity;
      const y = (clientY - (top + height / 2)) * intensity;
      xTo(x);
      yTo(y);
      if (scale > 1) scaleTo(scale);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
      if (scale > 1) scaleTo(1);
    };

    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);
    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, [intensity, scale]);

  return React.cloneElement(children, { ref });
}
