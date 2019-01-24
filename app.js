//create default search values for spotify and movie APIS
// take in data from random.txt and run spotify search with input

// Environment variables for spotify API
require("dotenv").config();

// variables
const axios = require("axios");
const moment = require("moment")
// const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

const fs = require("fs");
const command = process.argv[2];
const userInput = process.argv.splice(3,process.argv.length).join("+");


// Commands from node:

// concert-this function
// run user input in bandsintown api and return results about event
function concertThis() {
  axios
    .get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`)
    .then(response => {
      console.log(`The venue is ${response.data[0].venue.name}, in ${response.data[0].venue.city}, ${response.data[0].venue.region}`);
      let dateConvert = JSON.stringify(response.data[0].datetime);
      datePerform = moment(dateConvert, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")
      console.log(datePerform);
      console.log("-------------------------")
    })
    .catch(error => console.log(error));
};

// spotify-this-song function
// take in user input and return data about the song searched
function spotifyThisSong(input) {
  spotify
    .request(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=1`)
    .then(data => {
      console.log(
        `Song: ${data.tracks.items[0].name} \nAlbum: ${data.tracks.items[0].album.name} \nBand: ${data.tracks.items[0].artists[0].name}  \nPreview the song here: ${data.tracks.items[0].preview_url}`)
        console.log("-------------------------")
    })    
    .catch(error => console.log(error));

}

// movie-this function
// take in user input and return data about the movie that was searched
function movieThis(input) {
  axios
    .get(`http://www.omdbapi.com/?apikey=trilogy&t=${input}`)
    .then(response => {
      console.log(`Title: ${response.data.Title} \nYear released: ${response.data.Year} \nIMDB rating: ${response.data.imdbRating} \nRotton Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry movie was produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
      console.log("-------------------------")
    })
    .catch(error => console.log(error));
};

// do-what-it-says function
// take song from random.txt file and use it as search paramenter for spotify API
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", (error, data) => {
    if (error) {
      return console.log(error)
    };
    const dataArr = data.split(",");
    const spotifyInput = dataArr[1].replace(/ /g, "+");

    spotifyThisSong(spotifyInput);
  });
};

// Create switch statement that runs each function depending on what command user enters
switch (command) {
  
  case "concert-this":
    concertThis();
  break;

  case "spotify-this-song": {
    console.log(userInput)
    let defaultInput = "The Sign"
    let defaultSearch = defaultInput.replace(/ /g, "+")
    (userInput != undefined) ? spotifyThisSong(userInput) : spotifyThisSong(defaultSearch)
    // spotifyThisSong(userInput);
    }
  break;

  case "movie-this":
    // let defaultInput = "Mr. Nodoby";
    // let defaultSearch = defaultInput.split(" ").join("+");
    // (userInput != "") ? movieThis(userInput) : movieThis(defaultSearch)
    movieThis(userInput);
  break;

  case "do-what-it-says":
    doWhatItSays();
  break;

  default:
    console.log("Please enter a command");
}; 