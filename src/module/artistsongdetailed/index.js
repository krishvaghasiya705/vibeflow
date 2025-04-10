import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Artistsongdetailedsection from "../../component/artistsongdetailedcomponents/artistsongdetailedsection";
import { fetchArtists } from "../../utils/jamendoApi";
import { useAudioPlayer } from "../../context/AudioPlayerContext";

export default function Artistsongdetailedpage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const { playSong, isPlaying } = useAudioPlayer();

  useEffect(() => {
    async function loadArtist() {
      const artistData = await fetchArtists(id);
      setArtist(artistData);
    }
    loadArtist();
  }, [id]);

  if (!artist) return null;

  return (
    <Artistsongdetailedsection 
      artist={artist} 
      isPlaying={isPlaying}
      onPlayClick={(song) => playSong(song)}
    />
  );
}
