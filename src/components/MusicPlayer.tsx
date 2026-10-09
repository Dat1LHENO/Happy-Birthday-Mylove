import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer(): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt autoplay upon first user interaction on the window
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay was prevented by browser policy, user will click button
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err: unknown) => {
        console.warn('Audio play error:', err);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/music.mp3" loop preload="auto" />
      <button 
        className="music-toggle-btn" 
        onClick={toggleMusic} 
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        aria-label="Toggle background music"
      >
        {isPlaying && <div className="music-waves" />}
        <img 
          src="/assets/audio-record.png" 
          alt="Music Record" 
          className={`music-record-img ${isPlaying ? 'spinning' : ''}`} 
        />
      </button>
    </>
  );
}
