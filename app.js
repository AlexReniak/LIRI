// Environment variables for spotify API
require("dotenv").config();

// variables
const axios = require("axios");
const moment = require("moment")
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
const command = process.argv[2];
let userInput = process.argv.splice(3,process.argv.length).join("+");


// Commands from node:

// concert-this function
function concertThis() {
  axios
    .get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`)
    .then(response => {
      console.log(`The venue is ${response.data[0].venue.name}, in ${response.data[0].venue.city}, ${response.data[0].venue.region}`);
      let dateConvert = JSON.stringify(response.data[0].datetime);
      datePerform = moment(dateConvert, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")
      console.log(datePerform);
    })
    .catch(error => console.log(error));
};

// spotify-this-song function
function spotifyThisSong(input) {
  spotify
    .request(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=1`)
    .then(data => {
      console.log(
        `Song: ${data.tracks.items[0].name} \nAlbum: ${data.tracks.items[0].album.name} \nBand: ${data.tracks.items[0].artists[0].name}  \nPreview the song here: ${data.tracks.items[0].preview_url}`)
    })    
    .catch(error => console.log(error));

}

// movie-this function
function movieThis(input) {
  axios
    .get(`http://www.omdbapi.com/?apikey=trilogy&t=${input}`)
    .then(response => {
      console.log(`Title: ${response.data.Title} \nYear released: ${response.data.Year} \nIMDB rating: ${response.data.imdbRating} \nRotton Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry movie was produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
    })
    .catch(error => console.log(error));

    // response.data.Title
    // response.data.Year
    // response.data.imdbRating
    // response.data.Ratings[1].Value
    // response.data.Country
    // response.data.Language
    // response.data.Plot
    // response.data.Actors
}

// do-what-it-says function

// Create switch statement that runs each function when called upon
switch (command) {
  
  case "concert-this":
    concertThis();
  break;

  case "spotify-this-song":
    spotifyThisSong(userInput);
    // if (userInput === undefined) {
    //   let defaultInput = "The Sign";
    //   defaultInput.split(" ").join("+");
    //   spotifyThisSong(defaultInput);
    // }  
    // else {
    //   spotifyThisSong(userInput);
    // }
  break;

  case "movie-this":
    movieThis(userInput);
  break;

  // case "do-what-it-says":
  //   doWhatItSays();
  // break;

  default:
    console.log("Please enter a command");
}; 