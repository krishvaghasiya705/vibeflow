import React from "react";
import Trendingsongs from "../../component/homecomponents/trending";
import Artistsongs from "../../component/homecomponents/artist";
import Songs from "../../component/homecomponents/songs";

export default function Home() {
  return (
    <div>
      <Trendingsongs />
      <Artistsongs />
      <Songs />
    </div>
  );
}
