import React from "react";
import "./artistsongdetailed.scss";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";

export default function Artistsongdetailedsection({ artist, isPlaying, onPlayClick }) {
  return (
    <div className="artist-song-detailed-section-main">
      <div className="artist-song-detailed-section-body">
        <div className="artist-song-detailed-section-body-head space-even">
          <div className="artist-image">
            <img
              src={artist.image || "https://via.placeholder.com/150"}
              alt={artist.name || "No Data Found"}
            />
          </div>
          <h1>{artist.name}</h1>
        </div>
        <div className="artist-song-detailed-section-body-content space-even">
          <div className="play-song-button">
            <button type="button" onClick={() => onPlayClick(artist.songs[0])}>
              {isPlaying ? <IoPauseSharp fontSize={30} /> : <FaPlay fontSize={30} />}
            </button>
          </div>
          <div className="artist-songs-detail">
            <h2>Songs</h2>
            <div className="artist-songs-detail-table-flex">
              {artist.songs.map((song, index) => (
                <div key={song.id} className="artist-songs-detail-table-box">
                  <div className="artist-songs-detail-table-box-number">
                    <span>{index + 1}</span>
                    <div className="artist-song-play-pause-icon">
                      {isPlaying ? <IoPauseSharp fontSize={16} /> : <FaPlay fontSize={16} />}
                    </div>
                  </div>
                  <div className="artist-songs-detail-table-box-song-detail">
                    <div className="song-image">
                      <img
                        src={song.image || "https://via.placeholder.com/150"}
                        alt={song.name || "No Data Found"}
                      />
                    </div>
                    <p>{song.name}</p>
                  </div>
                  <div className="artist-songs-detail-table-box-song-time">
                    <span>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
