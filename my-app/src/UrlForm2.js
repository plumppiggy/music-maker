import { useState } from "react";
import Success2 from "./components/Success2";
import Dashboard from "./Dashboard";
import { playlistUrl } from "./UrlForm";

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
            const createPlaylistRes = await spotifyApi.createPlaylist("Recommended Songs Playlist", {
                description: "Recommended Songs",
                public: false,
            });

            const myPlaylistId = createPlaylistRes.body.id;

            const tracksRes = await spotifyApi.getPlaylistTracks(`${playlistId}`);

            const tracks = tracksRes.body.items;
            console.log({ tracks });
            const artistIds = tracks.map((trackObj) => trackObj.track.artists[0].id);
            console.log({ artistIds });

            const artistIds2 = artistIds.slice(1, 5)

            const recTracks = await spotifyApi.getRecommendations({
                min_energy: 0.4,
                seed_artists: artistIds2,
                min_popularity: 50
            });

            console.log({ recTracks })

            const rec = recTracks.body.tracks;
            const recUri = rec.map((trackObj) => trackObj.uri);
            console.log({ recUri });


            const addTracksRes = await spotifyApi.addTracksToPlaylist(
                myPlaylistId,
                recUri
            );
            console.log({ addTracksRes });


        } catch (error) {
            console.log(error);
        }
        setIsSubmitted(true);
    };

    if (isSubmitted) return <Success2 />;

    return (
    <form>   
    <input className = "input" id = "url" name="Playlist_URL" onChange={handleChange} />  
    <button className="btn-group" onClick={handleSubmit}>Get A New Playlist based on an old one:</button>
    </form>
    );
};

export default FooBarForm;
