const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 8000;

app.use(cors()); // To handle cross-origin requests
app.use(express.json()); // To parse JSON bodies

const credentials = {
  clientId: "b67c1c5fd4b1477d8150f83961ff49bb",
  clientSecret: "a4867eecb8ed4df39bd533b48d27d76a",
  redirectUri: "http://localhost:3000/",
};

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.post("/login", (req, res) => {
  //  setup
  let spotifyApi = new spotifyWebApi(credentials);

  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
  const code = req.body.code;

  // Retrieve an access token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // Returning the User's AccessToken in the json formate
      res.json({
        accessToken: data.body.access_token,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.sendStatus(400);
    });
});

app.render("/base-page.html", (req, res) => {
  if(err) console.log(err);
  console.log(html);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
