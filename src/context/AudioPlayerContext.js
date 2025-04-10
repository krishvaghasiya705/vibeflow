import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading] = useState(false);
  const audioRef = useRef(null);

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
    setCurrentSong(nextSong);
    setIsPlaying(true);
  }, [playlist, currentIndex, isShuffled]);

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
    setCurrentSong(prevSong);
    setIsPlaying(true);
  }, [playlist, currentIndex, isShuffled]);

  const togglePlayPause = useCallback(async () => {
    if (!currentSong) return;

    if (isPlaying) {
      await audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [currentSong, isPlaying]);

  const setVolumeLevel = useCallback((level) => {
    setVolume(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
  }, [isShuffled]);

  const toggleLoop = useCallback(() => {
    setIsLooped(!isLooped);
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

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooped, seekTo, playNextSong]);

  useEffect(() => {
    if (isPlaying && currentTime >= duration) {
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
        currentTime,
        duration,
        isShuffled,
        isLooped,
        isLoading,
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
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext); 