// Environment variables for spotify API
require("dotenv").config();

// variables
const axios = require("axios");
const keys = require("./keys.js");
const spotifyAPI = require("node-spotify-api");
const spotify = new Spotify({id, secret});
const command = process.argv[2];
const userInput = process.argv[3].split(" ").join("");


// Commands from node:
// concert-this function
function concertThis() {
  axios
    .get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`)
    .then(response => {
      // console.log(response)
      console.log(`The venue is ${response.data[0].venue.name}, in ${response.data[0].venue.city}, ${response.data[0].venue.region}`);
      const datePerform = moment(response.data[0].datetime).format("MM/DD/YYYY")
      console.log(datePerform);
    });
};

// spotify-this-song function.
function spotifyThisSong() {
  spotify
    .request(`https://api.spotify.com/v1/searchq=${userInput}&type=track`)
    .then(data => console.log(data));
}

// movie-this function
function movieThis() {
  axios
    .get("")
    .then(response => {
      
    })
}

// do-what-it-says function

// Create switch statement that runs each function when called upon
switch (command) {
  
  case "concert-this":
    concertThis();
  break;

  // case "spotify-this-song":
  //   spotifyThisSong();
  // break;

  // case "movie-this":
  //   movieThis();
  // break;

  // case "do-what-it-says":
  //   doWhatItSays();
  // break;

  default:
    console.log("Please enter a command");
}; 