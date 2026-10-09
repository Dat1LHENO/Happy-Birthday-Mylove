import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoScrollOptions {
  speed?: number; // pixels per frame at 60fps (default: 1.25)
  onReachEnd?: () => void;
}

export function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const { speed = 1.25, onReachEnd } = options;
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef<boolean>(false);
  const onReachEndRef = useRef(onReachEnd);

  useEffect(() => {
    isAutoScrollingRef.current = isAutoScrolling;
  }, [isAutoScrolling]);

  useEffect(() => {
    onReachEndRef.current = onReachEnd;
  }, [onReachEnd]);

  const stopAutoScroll = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsAutoScrolling(false);
  }, []);

  const startAutoScroll = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 5) {
      // If already at bottom, smoothly scroll to top first then start
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsAutoScrolling(true);
      }, 600);
      return;
    }

    setIsAutoScrolling(true);
  }, []);

  const toggleAutoScroll = useCallback(() => {
    if (isAutoScrollingRef.current) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }, [startAutoScroll, stopAutoScroll]);

  // Frame-by-frame smooth scrolling
  useEffect(() => {
    if (!isAutoScrolling) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 3); // Normalize to 60fps
      lastTime = time;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      // Reached the end: stop automatically!
      if (currentScroll >= maxScroll - 4) {
        stopAutoScroll();
        onReachEndRef.current?.();
        return;
      }

      window.scrollBy({ top: speed * delta, behavior: 'instant' });
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isAutoScrolling, speed, stopAutoScroll]);

  // User manual touch or wheel event pauses auto-scroll
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isAutoScrollingRef.current) {
        stopAutoScroll();
      }
    };

    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
    };
  }, [stopAutoScroll]);

  return {
    isAutoScrolling,
    startAutoScroll,
    stopAutoScroll,
    toggleAutoScroll
  };
}
