const axios = require('axios');
const async = require('async');
const request = require('request');
const app = require('express')();

app.locals.numberOfLoads = 0;

const artWorkController = {

  retrieveIDs (req, res) {
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(idObj => idObj.data)
    .then(id => {
      const sorted = id.sort((a,b) => a-b);
      return res.json(sorted);
    });
  },

  retrieveInitialArts (req, res) {
    function getRequest(url, callback) {
      const options = {
        url,
        json : true
      };
      request(options, (err, res, body) => callback(err, body))
    }
    //initial request to get first 12 IDs
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(listOfIDs => {
      return listOfIDs.data.sort((a,b) => a-b).filter((allIDs, index) => index < 12);
    })
    //use those IDs to create data for display
    .then(filteredIDs => {
      app.locals.numberOfLoads = 12;
      let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
      async.map(idsToCall, getRequest, (err, result) => {
        if(err) return err;
        return res.send(result);
      })
    })
  },

  retrieveArts (req, res) {

    function getRequest(url, callback) {
      const options = {
        url,
        json : true
      };
      request(options, (err, res, body) => callback(err, body));
    }
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(listOfIDs => {
      //filter out 12 additional ids to use to get arts we want
      return listOfIDs.data.sort((a,b) => a-b).filter((allIDs, index) => {
        return index >= app.locals.numberOfLoads && index < 12 + app.locals.numberOfLoads;
      })
    })
    //use those IDs to create data for display
    .then(filteredIDs => {
      app.locals.numberOfLoads += 12;
      let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
      async.map(idsToCall, getRequest, (err, result) => {
        if(err) return err;
        return res.send(result);
      })
    })
  },

  searchArtist (req, res) {
    function getRequest(url, callback) {
      const options = {
        url,
        json : true
      };
      request(options, (err, res, body) => callback(err, body));
    }
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    //use those IDs to create data for display
    .then(filtered => filtered.data.sort((a,b) => a-b).filter(ids => ids < 500))
    .then(listOfIDs => {
      let idsToCall = listOfIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
      async.map(idsToCall, getRequest, (err, result) => {
        if(err) return err;
        return res.send(result);
      })
    })
  }

}

module.exports = artWorkController;