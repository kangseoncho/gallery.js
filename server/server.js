//house all middleware functions
const ArtWorkController = require('./artWorkController');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use(bodyParser.json());

//display website
app.use('/', express.static(path.join(__dirname, "./../public")));
app.get('/', (req, res) => { return });

//get all list of IDs
app.get('/ids', ArtWorkController.retrieveIDs);
//get artwork information with IDs
app.get('/gallery', ArtWorkController.retrieveArts);

app.listen(3000, () => {
  console.log("direectory name: ", __dirname);
  console.log(`listening on port ${port}!`)
});