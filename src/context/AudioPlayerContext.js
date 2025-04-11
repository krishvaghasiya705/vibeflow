import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio());

  // Initialize volume and mute state from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    const savedMuted = localStorage.getItem('audioMuted');
    
    if (savedVolume !== null) {
      const volumeValue = parseFloat(savedVolume);
      setVolume(volumeValue);
      if (audioRef.current) {
        audioRef.current.volume = volumeValue;
      }
    }
    
    if (savedMuted !== null) {
      const mutedValue = savedMuted === 'true';
      setIsMuted(mutedValue);
      if (audioRef.current) {
        audioRef.current.muted = mutedValue;
      }
    }
  }, []);

  const playSong = useCallback((song) => {
    if (!song) return;
    
    setIsLoading(true);
    setCurrentSong(song);
    
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Error playing song:", error);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [volume, isMuted]);

  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const playNextSong = useCallback(async () => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    setCurrentIndex(nextIndex);
    const nextSong = playlist[nextIndex];
    playSong(nextSong);
  }, [playlist, currentIndex, isShuffled, playSong]);

  const playPreviousSong = useCallback(async () => {
    if (playlist.length === 0) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }

    setCurrentIndex(prevIndex);
    const prevSong = playlist[prevIndex];
    playSong(prevSong);
  }, [playlist, currentIndex, isShuffled, playSong]);

  const togglePlayPause = useCallback(async () => {
    if (!currentSong) return;

    setIsLoading(true);
    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentSong, isPlaying]);

  const setVolumeLevel = useCallback((level) => {
    setVolume(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
      if (level === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
        localStorage.setItem('audioMuted', 'true');
      } else {
        setIsMuted(false);
        audioRef.current.muted = false;
        localStorage.setItem('audioMuted', 'false');
      }
    }
    localStorage.setItem('audioVolume', level.toString());
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
      localStorage.setItem('audioMuted', newMutedState.toString());
    }
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
  }, [isShuffled]);

  const toggleLoop = useCallback(() => {
    setIsLooped(!isLooped);
    if (audioRef.current) {
      audioRef.current.loop = !isLooped;
    }
  }, [isLooped]);

  const updatePlaylist = useCallback((songs) => {
    setPlaylist(songs);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isLooped) {
        seekTo(0);
        audio.play();
      } else {
        playNextSong();
      }
    };

    const handleError = (error) => {
      console.error("Audio error:", error);
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [isLooped, seekTo, playNextSong]);

  useEffect(() => {
    if (isPlaying && currentTime >= duration && duration > 0) {
      if (isLooped) {
        seekTo(0);
      } else {
        playNextSong();
      }
    }
  }, [currentTime, duration, isPlaying, isLooped, seekTo, playNextSong]);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        isShuffled,
        isLooped,
        isLoading,
        playSong,
        seekTo,
        playNextSong,
        playPreviousSong,
        togglePlayPause,
        setVolumeLevel,
        toggleMute,
        toggleShuffle,
        toggleLoop,
        updatePlaylist,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext); 