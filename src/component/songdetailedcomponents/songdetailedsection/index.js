import React from "react";
import "./songdetailed.scss";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Songdetailedsection() {
  return (
    <div className="song-detailed-section-main">
      <div className="song-detailed-section-body">
        <div className="song-detailed-section-body-head space-even">
          <div className="song-image">
            <img
              src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
              alt="No-Data Found"
            />
          </div>
          <h1>Song Name</h1>
        </div>
        <div className="song-detailed-section-body-content space-even">
          <div className="play-song-button">
            <button type="button">
              <FaPlay fontSize={30} />
              {/* <IoPauseSharp fontSize={40} /> */}
            </button>
          </div>
          <div className="songs-detail">
            <h2>Song</h2>
            <div className="songs-detail-table-flex">
              <NavLink to={"/"}>
                <div className="songs-detail-table-box">
                  <div className="songs-detail-table-box-number">
                    <span>1</span>
                    <div className="song-play-pause-icon">
                      <FaPlay fontSize={16} />
                      {/* <IoPauseSharp fontSize={20} /> */}
                    </div>
                  </div>
                  <div className="songs-detail-table-box-song-detail">
                    <div className="song-image">
                      <img
                        src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
                        alt="No-Data Found"
                      />
                    </div>
                    <p>Song Name</p>
                  </div>
                  <div className="songs-detail-table-box-song-time">
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
