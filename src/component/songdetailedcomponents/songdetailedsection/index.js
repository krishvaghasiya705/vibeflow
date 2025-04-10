import React from "react";
import "./songdetailed.scss";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";

export default function Songdetailedsection({ song, isPlaying, onPlayClick }) {
  return (
    <div className="song-detailed-section-main">
      <div className="song-detailed-section-body">
        <div className="song-detailed-section-body-head space-even">
          <div className="song-image">
            <img
              src={song.image || "https://via.placeholder.com/150"}
              alt={song.name || "No Data Found"}
            />
          </div>
          <h1>{song.name}</h1>
        </div>
        <div className="song-detailed-section-body-content space-even">
          <div className="play-song-button">
            <button type="button" onClick={onPlayClick}>
              {isPlaying ? <IoPauseSharp fontSize={30} /> : <FaPlay fontSize={30} />}
            </button>
          </div>
          <div className="songs-detail">
            <h2>Song Details</h2>
            <div className="songs-detail-table-flex">
              <div className="songs-detail-table-box">
                <div className="songs-detail-table-box-number">
                  <span>1</span>
                  <div className="song-play-pause-icon">
                    {isPlaying ? <IoPauseSharp fontSize={16} /> : <FaPlay fontSize={16} />}
                  </div>
                </div>
                <div className="songs-detail-table-box-song-detail">
                  <div className="song-image">
                    <img
                      src={song.image || "https://via.placeholder.com/150"}
                      alt={song.name || "No Data Found"}
                    />
                  </div>
                  <p>{song.name}</p>
                </div>
                <div className="songs-detail-table-box-song-time">
                  <span>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
