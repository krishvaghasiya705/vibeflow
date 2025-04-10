import React, { useEffect, useState } from "react";
import "./searchresults.scss";
import { NavLink, useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { fetchSongs } from "../../utils/jamendoApi";
import { useAudioPlayer } from "../../context/AudioPlayerContext";

export default function SearchResults() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { playSong, updatePlaylist } = useAudioPlayer();

  useEffect(() => {
    async function loadSearchResults() {
      try {
        setLoading(true);
        const searchQuery = new URLSearchParams(location.search).get("q");
        const fetchedSongs = await fetchSongs();
        
        // Filter songs based on search query
        const filteredSongs = fetchedSongs.filter(song => 
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setSongs(filteredSongs);
        updatePlaylist(filteredSongs);
      } catch (error) {
        console.error("Error loading search results:", error);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    }
    loadSearchResults();
  }, [location.search, updatePlaylist]);

  const handlePlayClick = (e, song) => {
    e.preventDefault();
    playSong(song);
  };

  if (loading) {
    return (
      <div className="search-results">
        <h1>Search Results</h1>
        <div className="search-results-cards">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="search-results-card">
              <div className="search-results-card-image">
                <div className="skeleton-image" />
              </div>
              <div className="search-results-card-content">
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
    <div className="search-results">
      <h1>Search Results</h1>
      <div className="search-results-cards">
        {songs.length > 0 ? (
          songs.map((song) => (
            <NavLink to={`/songdetailedpage/${song.id}`} key={song.id}>
              <div className="search-results-card">
                <div className="search-results-card-image">
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
                <div className="search-results-card-content">
                  <h2>{song.name}</h2>
                  <p>{song.artist_name || "Unknown Artist"}</p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="no-results">
            <h2>No songs found matching your search</h2>
          </div>
        )}
      </div>
    </div>
  );
} 