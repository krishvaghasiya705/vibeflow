import React from "react";
import "./songs.scss";
import { NavLink } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function Songs() {
  return (
    <div className="all-songs">
      <h1>All Songs</h1>
      <div className="all-songs-cards">
        <NavLink to={"/songdetailedpage"}>
          <div className="all-songs-card">
            <div className="all-songs-card-image">
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
            <div className="all-songs-card-content">
              <h2>Song Title</h2>
              <p>
                <NavLink to={"/"}>Artist Name,</NavLink>
                <NavLink to={"/"}>Artist Name</NavLink>
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
