import React from "react";
import "./audioplayer.scss";
import nodataimnage from "../../assets/images/noimage.avif";
import { NavLink } from "react-router-dom";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";

export default function Audioplayer() {
  return (
    <div className="audioplayer-main">
      <div className="audioplayer-songs-small-prev">
        <img src={nodataimnage} alt="audioplayer-songs-banner-image" />
        <div>
          <h6>Song title</h6>
          <p>
            <NavLink to={"/"}>singers name</NavLink>,
            <NavLink to={"/"}>singers name</NavLink>,
            <NavLink to={"/"}>singers name</NavLink>
          </p>
        </div>
      </div>
      <div></div>
      <div className="audioplayer-sound-section">
        <div className="fullscreen-icon">
          <RiFullscreenFill fontSize={20}/>
          {/* <RiFullscreenExitLine fontSize={20}/> */}
        </div>
      </div>
    </div>
  );
}
