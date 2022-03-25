import { useState } from "react";
import React, { Component }  from 'react';
import Success2 from "./components/Success2";
import Dashboard from "./Dashboard";

// const initialFormData = Object.freeze({
//     Playlist_URL: "",
//   });

const FooBarForm = ({ spotifyApi }) => {

    //const [playlistUrl, setPlaylistUrl] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // const handleChange = (e) => {
    //     setPlaylistUrl(e.target.value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //const playlistId = playlistUrl.substr(34, 22); // playlistId with songs we want to extract

        /* create playlist here */
        /* Check our the documentation here: https://github.com/thelinmichael/spotify-web-api-node/tree/be15f1c742b35134ce5bd35521d8bf1ab1ba67cf#playlist-manipulation */
        // Create a private playlist

        try {
            const createPlaylistRes = await spotifyApi.createPlaylist("Similar to top tracks", {
                description: "Recommended Songs based on Liked Songs",
                public: 0,
            });

            const myPlaylistId = createPlaylistRes.body.id;

            const userTracks = await spotifyApi.getMyTopTracks();
            console.log( { userTracks });

            const tracksWhole = userTracks.body.items;
            const tracks = tracksWhole.map((trackObj) => trackObj.id);

            console.log( { tracks });

            

            const recTracks = await spotifyApi.getRecommendations({
                seed_tracks: tracks.slice(1, 5),
            });
            console.log( {recTracks});

            const recTracks2 = recTracks.body.tracks;
            const recUri = recTracks2.map((trackObj) => trackObj.uri);
            console.log({recUri})

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
    <button className="btn-group" onClick={handleSubmit}>Get A New Playlist based on your liked songs:</button>
    </form>
    );
};

export default FooBarForm;
