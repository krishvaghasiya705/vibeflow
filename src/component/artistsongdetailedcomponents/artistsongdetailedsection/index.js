import React from "react";
import "./artistsongdetailed.scss";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Artistsongdetailedsection() {
  return (
    <div className="artist-song-detailed-section-main">
      <div className="artist-song-detailed-section-body">
        <div className="artist-song-detailed-section-body-head space-even">
          <div className="artist-image">
            <img
              src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
              alt="No-Data Found"
            />
          </div>
          <h1>Artist Name</h1>
        </div>
        <div className="artist-song-detailed-section-body-content space-even">
          <div className="play-song-button">
            <button type="button">
              <FaPlay fontSize={30} />
              {/* <IoPauseSharp fontSize={40} /> */}
            </button>
          </div>
          <div className="artist-songs-detail">
            <h2>Songs</h2>
            <div className="artist-songs-detail-table-flex">
              <NavLink to={"/"}>
                <div className="artist-songs-detail-table-box">
                  <div className="artist-songs-detail-table-box-number">
                    <span>1</span>
                    <div className="artist-song-play-pause-icon">
                      <FaPlay fontSize={16} />
                      {/* <IoPauseSharp fontSize={20} /> */}
                    </div>
                  </div>
                  <div className="artist-songs-detail-table-box-song-detail">
                    <div className="song-image">
                      <img
                        src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
                        alt="No-Data Found"
                      />
                    </div>
                    <p>Song Name</p>
                  </div>
                  <div className="artist-songs-detail-table-box-song-time">
                    <span>0:00</span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
