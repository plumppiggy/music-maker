import { useState } from "react";
import Success from "./components/Success";

const initialFormData = Object.freeze({
  Playlist_URL: "",
});

const FooBarForm = ({ spotifyApi }) => {
  const [playlistUrl, setPlaylistUrl] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setPlaylistUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(playlistUrl);

    const playlistId = playlistUrl.substr(34, 22); // playlistId with songs we want to extract

    /* create playlist here */
    /* Check our the documentation here: https://github.com/thelinmichael/spotify-web-api-node/tree/be15f1c742b35134ce5bd35521d8bf1ab1ba67cf#playlist-manipulation */
    // Create a private playlist

    try {
      const createPlaylistRes = await spotifyApi.createPlaylist("Musi Mover Playlist", {
        description: `Copied Playlist from ${playlistId}`,
        public: false,
      });

      const myPlaylistId = createPlaylistRes.body.id;

      // Get tracks from playlist
      const tracksRes = await spotifyApi.getPlaylistTracks(`${playlistId}`);

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
  };

  if (isSubmitted) return <Success />;

  return (
    <form>
      <label>
        Playlist URL
        <input name="Playlist_URL" onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default FooBarForm;
