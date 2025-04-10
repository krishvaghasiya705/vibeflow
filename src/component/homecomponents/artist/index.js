import React, { useEffect, useState } from "react";
import "./artistsongs.scss";
import { NavLink } from "react-router-dom";
import { fetchArtists } from "../../../utils/jamendoApi";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";
import { FaPlay } from "react-icons/fa";

export default function Artistsongs() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong, updatePlaylist } = useAudioPlayer();

  useEffect(() => {
    async function loadArtists() {
      try {
        setLoading(true);
        const fetchedArtists = await fetchArtists();
        setArtists(fetchedArtists || []);
        
        // Update playlist with all songs from all artists
        const allSongs = fetchedArtists.reduce((songs, artist) => {
          return [...songs, ...artist.songs];
        }, []);
        updatePlaylist(allSongs);
      } catch (error) {
        console.error("Error loading artists:", error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    }
    loadArtists();
  }, [updatePlaylist]);

  const handlePlayClick = (e, artist) => {
    e.preventDefault();
    if (artist.songs && artist.songs.length > 0) {
      playSong(artist.songs[0]);
    }
  };

  if (loading) {
    return (
      <div className="artist-songs-main">
        <h1>All Artists</h1>
        <div className="artist-songs-grid-main">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="artist-songs-box">
              <div className="artist-songs-image">
                <div className="skeleton-image" />
              </div>
              <div className="artist-songs-content">
                <div className="skeleton-text" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="artist-songs-main">
      <h1>All Artists</h1>
      <div className="artist-songs-grid-main">
        {artists.map((artist) => (
          <NavLink to={`/artisdetailedpage/${artist.id}`} key={artist.id}>
            <div className="artist-songs-box">
              <div className="artist-songs-image">
                <img
                  src={artist.image || "https://via.placeholder.com/150"}
                  alt={artist.name || "No Data Found"}
                />
                <div className="song-play-button">
                  <button 
                    type="button"
                    onClick={(e) => handlePlayClick(e, artist)}
                  >
                    <FaPlay fontSize={20} />
                  </button>
                </div>
              </div>
              <div className="artist-songs-content">
                <h2>{artist.name || "Unknown Artist"}</h2>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}