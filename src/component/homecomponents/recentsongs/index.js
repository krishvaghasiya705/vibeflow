import React, { useEffect, useState } from "react";
import "./recentsongs.scss";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";
import { fetchRecentSongs } from "../../../utils/jamendoApi";

export default function Recentsongs() {
  const { playSong, updatePlaylist } = useAudioPlayer();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetchedSongs = await fetchRecentSongs();
        setSongs(fetchedSongs);
        updatePlaylist(fetchedSongs);
      } catch (error) {
        console.error("Error loading recent songs:", error);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [updatePlaylist]);

  const handlePlayClick = (e, song) => {
    e.preventDefault();
    playSong(song);
  };

  if (loading) {
    return (
      <div className="recent-songs">
        <h1>Recent Songs</h1>
        <div className="recent-songs-cards">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="recent-songs-card">
              <div className="recent-songs-card-image">
                <div className="skeleton-image" />
              </div>
              <div className="recent-songs-card-content">
                <div className="skeleton-text" />
                <div className="skeleton-text" style={{ width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="recent-songs">
      <h1>Recently Played Songs</h1>
      <div className="recent-songs-cards">
        {songs.map((song) => (
          <NavLink to={`/songdetailedpage/${song.id}`} key={song.id}>
            <div className="recent-songs-card">
              <div className="recent-songs-card-image">
                <img
                  src={song.image || "https://via.placeholder.com/150"}
                  alt={song.name || "No Data Found"}
                />
                <div className="song-play-button">
                  <button 
                    type="button"
                    onClick={(e) => handlePlayClick(e, song)}
                  >
                    <FaPlay fontSize={20} />
                  </button>
                </div>
              </div>
              <div className="recent-songs-card-content">
                <h2>{song.name}</h2>
                <p>{song.artist_name || "Unknown Artist"}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}