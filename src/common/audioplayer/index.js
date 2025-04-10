import React, { useState, useEffect, useRef } from "react";
import "./audioplayer.scss";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
// import { RiFullscreenFill } from "react-icons/ri";
// import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
// import { RxLoop, RxShuffle } from "react-icons/rx";
// import { AiFillStepBackward } from "react-icons/ai";
// import { IoMdSkipForward } from "react-icons/io";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
} from "react-icons/fa";

const AudioPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    isLooped,
    togglePlayPause,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleLoop,
    playNextSong,
    playPreviousSong,
    seekTo,
    isLoading,
  } = useAudioPlayer();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      const progress = (currentTime / duration) * 100;
      progressRef.current.style.setProperty('--value', `${progress}%`);
    }
  }, [currentTime, duration]);

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.setProperty('--value', `${volume * 100}%`);
    }
  }, [volume]);

  const handlePlayPause = async () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    await togglePlayPause();
    setTimeout(() => setIsButtonDisabled(false), 300);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (progressRef.current) {
      progressRef.current.style.setProperty('--value', `${e.target.value}%`);
    }
    seekTo(newTime);
  };

  if (!currentSong) {
    return (
      <div className="audio-player">
        <div className="audio-player-left">
          <div className="audio-player-image">
            <img src="/placeholder.jpg" alt="No song selected" />
          </div>
          <div className="audio-player-info">
            <h3>No song selected</h3>
            <p>Select a song to play</p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-player">
      <div className="audio-player-left">
        <div className="audio-player-image">
          <img src={currentSong.coverImage} alt={currentSong.title} />
        </div>
        <div className="audio-player-info">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="audio-player-center">
        <div className="audio-player-controls">
          <button
            onClick={toggleShuffle}
            className={isShuffled ? "active" : ""}
            disabled={isLoading}
          >
            <FaRandom />
          </button>
          <button
            onClick={playPreviousSong}
            disabled={isLoading || isButtonDisabled}
          >
            <FaStepBackward />
          </button>
          <button
            onClick={handlePlayPause}
            disabled={isLoading || isButtonDisabled}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNextSong} disabled={isLoading || isButtonDisabled}>
            <FaStepForward />
          </button>
          <button onClick={toggleLoop} className={isLooped ? "active" : ""} disabled={isLoading}>
            <FaRedo />
          </button>
        </div>

        <div className="audio-player-progress">
          <span className="audio-player-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100}
            onChange={handleProgressChange}
            disabled={isLoading}
            ref={progressRef}
          />
          <span className="audio-player-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="audio-player-right">
        <div className="audio-player-volume">
          <button onClick={toggleMute} disabled={isLoading}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            disabled={isLoading}
            ref={volumeRef}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
