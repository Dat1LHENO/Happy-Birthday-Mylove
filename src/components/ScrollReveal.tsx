import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  effect?: 'sparkle-up' | 'fade-up' | 'zoom-in' | 'slide-left' | 'slide-right' | 'flip-soft';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  effect = 'sparkle-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.15,
  once = true
}: ScrollRevealProps): React.JSX.Element {
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !('IntersectionObserver' in window);
  });
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-container reveal-${effect} ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}
