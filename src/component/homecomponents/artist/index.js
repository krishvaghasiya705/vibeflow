import React from "react";
import "./artistsongs.scss";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function Artistsongs() {
  return (
    <div className="artist-songs-main">
      <h1>All Artist</h1>
      <div className="artist-songs-grid-main">
        <NavLink to={"/artisdetailedpage"}>
          <div className="artist-songs-box">
            <div className="artist-songs-image">
              <img
                src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
                alt="No-Data Found"
              />
              <div className="song-play-button">
                <button type="button">
                  <FaPlay fontSize={20} />
                  {/* <IoPauseSharp fontSize={20} /> */}
                </button>
              </div>
            </div>
            <NavLink to={"/artisdetailedpage"}>Artist name</NavLink>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
