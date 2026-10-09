import React, { useEffect, useState } from 'react';

const EMOJIS = ['💖', '💕', '🌸', '✨', '💐', '🎂', '🎉', '❤️'];

interface HeartBurstProps {
  triggerId: string | null;
}

interface Particle {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  dx: string;
  size: number;
  duration: string;
}

export default function HeartBurst({ triggerId }: HeartBurstProps): React.JSX.Element {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!triggerId) return;

    // Spawn 14-20 floating hearts
    const newParticles: Particle[] = Array.from({ length: 16 }).map((_, i) => ({
      id: `${triggerId}-${i}`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      startX: Math.random() * 80 + 10, // 10% to 90% screen width
      startY: window.innerHeight - 80 + (Math.random() * 40 - 20),
      dx: (Math.random() - 0.5) * 160 + 'px',
      size: Math.floor(Math.random() * 16 + 20),
      duration: (Math.random() * 0.8 + 1.6).toFixed(2)
    }));

    const rafId = requestAnimationFrame(() => {
      setParticles((prev) => [...prev, ...newParticles]);
    });

    // Clean up particles after duration
    const timeout = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !p.id.startsWith(triggerId)));
    }, 2500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
    };
  }, [triggerId]);

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-particle-heart"
          style={
            {
              left: `${p.startX}%`,
              top: `${p.startY}px`,
              fontSize: `${p.size}px`,
              '--dx': p.dx,
              animationDuration: `${p.duration}s`
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}
