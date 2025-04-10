const BASE_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = "1514e75a";

export async function fetchSongs() {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=50&include=musicinfo`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }
    const data = await response.json();
    return data.results.map(song => ({
      id: song.id,
      name: song.name,
      artist_name: song.artist_name,
      image: song.image,
      audio: song.audio,
      duration: song.duration
    }));
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

export async function fetchArtists(artistId) {
  try {
    const [artistResponse, tracksResponse] = await Promise.all([
      fetch(`${BASE_URL}/artists/?client_id=${CLIENT_ID}&id=${artistId}&format=json`),
      fetch(`${BASE_URL}/artists/tracks/?client_id=${CLIENT_ID}&id=${artistId}&format=json&limit=50`)
    ]);

    if (!artistResponse.ok || !tracksResponse.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const [artistData, tracksData] = await Promise.all([
      artistResponse.json(),
      tracksResponse.json()
    ]);

    const artist = artistData.results[0];
    const songs = tracksData.results.map(song => ({
      id: song.id,
      name: song.name,
      image: song.image,
      audio: song.audio,
      duration: song.duration
    }));

    return {
      id: artist.id,
      name: artist.name,
      image: artist.image,
      songs
    };
  } catch (error) {
    console.error("Error fetching artist:", error);
    return null;
  }
}

export async function fetchSongDetails(songId) {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&id=${songId}&format=json&include=musicinfo`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch song details");
    }
    const data = await response.json();
    const song = data.results[0];
    return {
      id: song.id,
      name: song.name,
      artist_name: song.artist_name,
      image: song.image,
      audio: song.audio,
      duration: song.duration
    };
  } catch (error) {
    console.error("Error fetching song details:", error);
    return null;
  }
}