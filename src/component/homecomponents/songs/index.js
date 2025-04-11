import React, { useEffect, useState } from "react";
import "./songs.scss";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";
import { fetchSongs } from "../../../utils/jamendoApi";

export default function Songs() {
  const { playSong, updatePlaylist } = useAudioPlayer();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
        updatePlaylist(fetchedSongs);
      } catch (error) {
        console.error("Error loading songs:", error);
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
      <div className="songs">
        <h1>All Songs</h1>
        <div className="songs-cards">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="songs-card">
              <div className="songs-card-image">
                <div className="skeleton-image" />
              </div>
              <div className="songs-card-content">
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
    <div className="all-songs">
      <h1>All Songs</h1>
      <div className="all-songs-cards">
        {songs.map((song) => (
          <NavLink to={`/songdetailedpage/${song.id}`} key={song.id}>
            <div className="all-songs-card">
              <div className="all-songs-card-image">
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
              <div className="all-songs-card-content">
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