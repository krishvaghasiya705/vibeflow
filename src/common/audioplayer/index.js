import React from "react";
import "./audioplayer.scss";
import nodataimnage from "../../assets/images/noimage.avif";
import { NavLink } from "react-router-dom";
import { RiFullscreenFill } from "react-icons/ri";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { RxLoop, RxShuffle } from "react-icons/rx";
import { AiFillStepBackward } from "react-icons/ai";
import { IoMdSkipForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";

export default function Audioplayer() {
  return (
    <div className="audioplayer-main">
      <div>
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
      </div>
      <div className="audioplayer-music-control">
        <div className="audioplayer-music-buttons">
          <div className="audioplayer-music-suffle">
            <RxShuffle fontSize={20} />
          </div>
          <div className="audioplayer-music-backward">
            <AiFillStepBackward fontSize={20} />
          </div>
          <div className="audioplayer-music-play">
            <FaPlay fontSize={20} />
            {/* <IoPauseSharp fontSize={20} /> */}
          </div>
          <div className="audioplayer-music-forward">
            <IoMdSkipForward fontSize={20} />
          </div>
          <div className="audioplayer-music-loop">
            <RxLoop fontSize={20} />
          </div>
        </div>
        <div className="audioplayer-music-progress-main-flx">
          <div className="audioplayer-music-progress-time">
            <span>0:00</span>
          </div>
          <div className="audioplayer-music-progress-main">
            <div className="audioplayer-music-progress-line"></div>
            <div className="audioplayer-music-progress-circle"></div>
          </div>
          <div className="audioplayer-music-time">
            <span>5:00</span>
          </div>
        </div>
      </div>
      <div className="audioplayer-sound-section">
        <div className="audioplayer-sound-control">
          <div className="audioplayer-sound-control-icon">
            <HiOutlineSpeakerWave fontSize={20} />
            {/* <HiOutlineSpeakerXMark fontSize={20} /> */}
          </div>
          <div className="audioplayer-sound-control-line-main">
            <div className="audioplayer-sound-control-line-fill"></div>
            <div className="audioplayer-sound-control-line-circle"></div>
          </div>
        </div>
        <div className="fullscreen-icon">
          <RiFullscreenFill fontSize={20} />
          {/* <RiFullscreenExitLine fontSize={20}/> */}
        </div>
      </div>
    </div>
  );
}
