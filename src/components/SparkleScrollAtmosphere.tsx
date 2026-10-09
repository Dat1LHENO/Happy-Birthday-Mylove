import React, { useEffect, useState } from 'react';

interface SparkleItem {
  id: number;
  symbol: string;
  left: number; // percentage
  top: number;  // px or percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  color: string;
}

const SPARKLE_SYMBOLS = ['✨', '⭐', '✧', '✦', '⋆', '🌸'];
const SPARKLE_COLORS = ['#ffccd5', '#ffe5b4', '#ffd166', '#f3a683', '#f8a5c2'];

function generateInitialSparkles(): SparkleItem[] {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    symbol: SPARKLE_SYMBOLS[i % SPARKLE_SYMBOLS.length],
    left: Math.random() * 92 + 4,
    top: Math.random() * 96 + 2,
    size: Math.floor(Math.random() * 12) + 12,
    duration: Number((Math.random() * 3 + 2.5).toFixed(1)),
    delay: Number((Math.random() * 4).toFixed(1)),
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length]
  }));
}

export default function SparkleScrollAtmosphere(): React.JSX.Element {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [sparkles] = useState<SparkleItem[]>(generateInitialSparkles);

  // Track window scroll progress for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Delicate Scroll Progress Bar */}
      <div className="scroll-progress-track">
        <div 
          className="scroll-progress-fill" 
          style={{ width: `${scrollProgress}%` }}
        >
          <span className="scroll-progress-glow-star">✨</span>
        </div>
      </div>

      {/* Ambient Twinkling Sparkles throughout the document */}
      <div className="sparkle-atmosphere-layer" aria-hidden="true">
        {sparkles.map((sp) => (
          <span
            key={sp.id}
            className="ambient-sparkle"
            style={{
              left: `${sp.left}%`,
              top: `${sp.top}%`,
              fontSize: `${sp.size}px`,
              color: sp.color,
              animationDuration: `${sp.duration}s`,
              animationDelay: `${sp.delay}s`
            }}
          >
            {sp.symbol}
          </span>
        ))}
      </div>
    </>
  );
}
