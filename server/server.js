//house all middleware functions
const ArtWorkController = require('./artWorkController');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

//app.locals.numberOfLoads = 0;

app.use(bodyParser.json());

//display website
app.use('/', express.static(path.join(__dirname, "./../public")));
app.get('/', (req, res) => { return });

//get all list of IDs
app.get('/ids', ArtWorkController.retrieveIDs);
//set state for displaying initial artworks
app.get('/initialGallery', ArtWorkController.retrieveInitialArts);
//get additional artworks
app.get('/gallery', ArtWorkController.retrieveAdditionalArts);
//search for requested artist
app.get('/searchArtist', ArtWorkController.searchArtist);
//cache all art info into local storage
app.get('/allArtist', ArtWorkController.cachedArtInfo);
//take me back to main page
app.get('/home', ArtWorkController.homePage);


app.listen(3000, () => {
  console.log("direectory name: ", __dirname);
  console.log(`listening on port ${port}!`);
});