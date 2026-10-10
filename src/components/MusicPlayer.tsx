import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  isExternalPaused?: boolean;
  forcePlayTrigger?: number | null;
}

export default function MusicPlayer({
  isExternalPaused = false,
  forcePlayTrigger = null,
}: MusicPlayerProps): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforePauseRef = useRef<boolean>(false);

  useEffect(() => {
    // Attempt autoplay upon first user interaction on the window
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying && !isExternalPaused) {
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
  }, [isPlaying, isExternalPaused]);

  // Handle external pause when entering hack troll mode, and resume on unlock/close
  useEffect(() => {
    if (isExternalPaused) {
      const isCurrentlyPlaying = audioRef.current ? !audioRef.current.paused : false;
      if (isCurrentlyPlaying || isPlaying) {
        wasPlayingBeforePauseRef.current = true;
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      if (wasPlayingBeforePauseRef.current) {
        wasPlayingBeforePauseRef.current = false;
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn('Resume music error:', err);
        });
      }
    }
  }, [isExternalPaused, isPlaying]);

  // Force play music (e.g. when hack is unlocked with celebration)
  useEffect(() => {
    if (forcePlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Force play music error:', err);
      });
    }
  }, [forcePlayTrigger]);

  const toggleMusic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      wasPlayingBeforePauseRef.current = false;
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

