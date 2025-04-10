import React from "react";
import Trendingsongs from "../../component/homecomponents/trending";
import Artistsongs from "../../component/homecomponents/artist";
import Songs from "../../component/homecomponents/songs";
import Recentsongs from "../../component/homecomponents/recentsongs";

export default function Home() {
  // const clientId = "1514e75a";
  // const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=50`;

  return (
    <div className="home-main space-even">
      <Recentsongs />
      <Trendingsongs />
      <Artistsongs />
      <Songs />
    </div>
  );
}
