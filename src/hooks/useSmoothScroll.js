import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useSmoothScroll() {
  useEffect(() => {
    // Skip it for people who asked their system for less motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1 });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}