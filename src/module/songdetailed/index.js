import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Songdetailedsection from "../../component/songdetailedcomponents/songdetailedsection";
import { fetchSongDetails } from "../../utils/jamendoApi";
import { useAudioPlayer } from "../../context/AudioPlayerContext";

export default function Songdetailedpage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const { playSong, isPlaying } = useAudioPlayer();

  useEffect(() => {
    async function loadSong() {
      const songData = await fetchSongDetails(id);
      setSong(songData);
    }
    loadSong();
  }, [id]);

  if (!song) return null;

  return (
    <Songdetailedsection 
      song={song} 
      isPlaying={isPlaying}
      onPlayClick={() => playSong(song)}
    />
  );
}
