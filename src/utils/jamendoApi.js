const BASE_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = "1514e75a";

export async function fetchSongs() {
  const response = await fetch(`${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=50`);
  const data = await response.json();
  return data.results;
}

export async function fetchArtist(artistId) {
  const response = await fetch(`${BASE_URL}/artists/tracks/?client_id=${CLIENT_ID}&id=${artistId}&format=json`);
  const data = await response.json();
  return data.results;
}

export async function fetchSongDetails(songId) {
  const response = await fetch(`${BASE_URL}/tracks/?client_id=${CLIENT_ID}&id=${songId}&format=json`);
  const data = await response.json();
  return data.results[0];
}