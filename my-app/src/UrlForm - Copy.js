import { useState } from "react";
import React, { Component } from 'react';
import Success from "./components/Success";
import "./Dashboard.css";
import useAuth from "./spotify-auth/client/UseAuth";
import SpotifyWebApi from "spotify-web-api-node";
import accessToken from './Dashboard';

const initialFormData = Object.freeze({
  Playlist_URL: "",
});

const spotifyApi = new SpotifyWebApi({
	clientId: "b67c1c5fd4b1477d8150f83961ff49bb",
});

spotifyApi.setAccessToken(accessToken);

function clearForm() {
  const [playlistUrl, setPlaylistUrl] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e) {
    setPlaylistUrl(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(playlistUrl);
    const playlistId = playlistUrl.substr(34, 22); // playlistId with songs we want to extract
    try {
    
    const getImage = await spotifyApi.getPlaylist('6lNLK7C0dMKBc9JorusFDd');
    console.log({ getImage });
    const img = getImage.body.images[0].url;
    console.log({ img });

    const createPlaylistRes = await spotifyApi.createPlaylist("Musi Mover Playlist", {
      description: `Copied Playlist from ${playlistUrl}`,
      public: false,
    });

    console.log(playlistId);

    const myPlaylistId = createPlaylistRes.body.id;

    // Get tracks from playlist
    const tracksRes = await spotifyApi.getPlaylistTracks(playlistId);

    const tracks = tracksRes.body.items;
    const trackIds = tracks.map((trackObj) => trackObj.track.uri);
    console.log({ trackIds });

    const addTracksRes = await spotifyApi.addTracksToPlaylist(
      myPlaylistId,
      trackIds
    );
    console.log({ addTracksRes });
    } catch (error) {
      console.log(error);
  }
  setIsSubmitted(true);
  }

  function resetInputField() {
    setPlaylistUrl("");
  }

  // if (setIsSubmitted) {
  //   return <Success />
  // };

return (
  <form>
    <input className="input" id="url" name="Playlist_URL" onChange={handleChange} />
    <button className="btn-group" onClick={handleSubmit}>Copy the Playlist</button>
  </form>
  //<div class="logo"></div>

);
}

export default clearForm;
