import React, { useEffect } from "react";
import useAuth from "./spotify-auth/client/UseAuth";
import SpotifyWebApi from "spotify-web-api-node";
import "./Dashboard.css";
import UrlForm from "./UrlForm";
import UrlForm2 from "./UrlForm2.js";

// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
	clientId: "b67c1c5fd4b1477d8150f83961ff49bb",
});

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);

	useEffect(() => {
		if (!accessToken) return;

		// Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again.
		spotifyApi.setAccessToken(accessToken);

		// How to get userid, accesstoken store into variable here
		spotifyApi.getMe().then((data) => {
			console.log(data);
		});
	}, [accessToken]);

	return (
		<div className="get-playlist">
			<h1>
				You successfully logged in! Now copy and paste the link of the spotify
				playlist and we'll copy it into your library.
			</h1>
			<UrlForm spotifyApi={spotifyApi} />
			<h2>
				Or if you want to make a newplaylist based of another playlist then paste the link here:
			</h2>
			<UrlForm2 spotifyApi={spotifyApi} />
		</div>
		
	);
};

export default Dashboard;
