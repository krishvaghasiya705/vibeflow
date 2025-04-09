import React from "react";
import "./sidesection.scss";
import { TiPlus } from "react-icons/ti";
import { NavLink } from "react-router-dom";

export default function Sidesection() {
  return (
    <div className="sidesection-main">
      <div className="sidesection-body">
        <div className="sidesection-title">
          <h3>Your Library</h3>
          <div className="library-add-icn">
            <TiPlus fontSize={20} />
          </div>
        </div>
        <div className="sidesection-suggestion-body">
          <div className="sidesection-create-playlist-box">
            <h6>Create your first playlist</h6>
            <p>it's easy,we'll help you</p>
            <button type="button">Create Playlist</button>
          </div>
          <div className="sidesection-create-playlist-box">
            <h6>Let's find some podcasts to follow</h6>
            <p>We'll keep you updated on new episodes</p>
            <button type="button">Browse podcasts</button>
          </div>
        </div>
        <div className="sidesection-footer">
          <p>&copy; 2025 VibeFlow. All rights reserved.</p>
          <p>
            VibeFlow is a music streaming platform that allows users to
            discover, listen, and share their favorite tracks. All content
            available on VibeFlow, including but not limited to music, graphics,
            logos, and text, is the property of VibeFlow or its content
            providers and is protected by copyright law.
          </p>
          <p>
            Unauthorized use or distribution of any content from VibeFlow is
            prohibited. For more information, please refer to our
            <NavLink to={"/"}> Terms of Service</NavLink> and
            <NavLink to={"/"}> Privacy Policy</NavLink>.
          </p>
        </div>
      </div>
    </div>
  );
}
