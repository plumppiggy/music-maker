import React, { useEffect } from "react";
import { ReactDOM } from 'react-dom';
import { useState } from "react";
import useAuth from "./spotify-auth/client/UseAuth";
import SpotifyWebApi from "spotify-web-api-node";
import "./Dashboard.css";
import UrlForm from "./UrlForm";
import UrlForm2 from "./UrlForm2.js";
import UrlForm3 from "./Urlform3";

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
		[	
		<head>
			<title> MusiMover </title>
		</head>,
		<div className="header">
			MusiMover
		</div>,
		<div class = "navbar">
			<a href = "./">Login</a>
		</div>,
		<body>
		<div className = "get-playlist">
			<h1>You have successfully logged in, choose an option below</h1>
			<UrlForm spotifyApi={spotifyApi}/>
			<UrlForm2 spotifyApi={spotifyApi}/>
			<UrlForm3 spotifyApi={spotifyApi}/>
		</div>,
		<div className="user-state">
			<h1>Info about User</h1>
		</div>
		</body>
		]

	)
	

};



// const express = require('express');
// const app = new express;

// app.get('/', function(request, response) {
// 	response.sendFile('base-page.html');
// });
export default Dashboard