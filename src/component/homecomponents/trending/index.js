import React from "react";
import "./trendingsongs.scss";

export default function Trendingsongs() {
  return (
    <div className="trending-songs">
      <h1>Trending Songs</h1>
      <div className="trending-songs-cards">
        <div className="trending-songs-card">
          <div className="trending-songs-card-image">
            <img
              src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
              alt="No-Data Found"
            />
          </div>
          <div className="trending-songs-card-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              optio, deleniti sequi vel molestiae ducimus aut dolorum quibusdam
              assumenda, recusandae et at. Animi, eaque? Doloribus molestiae
              veritatis amet quam adipisci!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
