// Environment variables for spotify API
require("dotenv").config();

// variables
const keys = ("./keys.js");
const spotifyAPI = require("node-spotify-api");
const spotify = new Spotify({id, secret});
const command = process.argv[2];
const userInput = process.argv[3];

// Commands from node:
// concert-this function
function concertThis() {

}

// spotify-this-song function.
function spotifyThisSong() {
  spotify
    .request("https://api.spotify.com/v1")
    .then(data => console.log(data));
}

// movie-this function

// do-what-it-says function

// Create switch statement that runs each function when called upon
switch (command) {
  
  case "concert-this":
    concertThis();
  break;

  case "spotify-this-song":
    spotifyThisSong();
  break;

  case "movie-this":
    movieThis();
  break;

  case "do-what-it-says":
    doWhatItSays();
  break;

  default:
    console.log("Please enter a command");
}; 