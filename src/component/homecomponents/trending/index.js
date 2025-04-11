import React, { useEffect, useState } from "react";
import "./trendingsongs.scss";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";
import { fetchTrendingSongs } from "../../../utils/jamendoApi";

export default function Trendingsongs() {
  const { playSong, updatePlaylist } = useAudioPlayer();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetchedSongs = await fetchTrendingSongs();
        setSongs(fetchedSongs);
        updatePlaylist(fetchedSongs);
      } catch (error) {
        console.error("Error loading trending songs:", error);
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
      <div className="trending-songs">
        <h1>Trending Songs</h1>
        <div className="trending-songs-cards">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="trending-songs-card">
              <div className="trending-songs-card-image">
                <div className="skeleton-image" />
              </div>
              <div className="trending-songs-card-content">
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
    <div className="trending-songs">
      <h1>Trending Songs</h1>
      <div className="trending-songs-cards">
        {songs.map((song) => (
          <NavLink to={`/songdetailedpage/${song.id}`} key={song.id}>
            <div className="trending-songs-card">
              <div className="trending-songs-card-image">
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
              <div className="trending-songs-card-content">
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