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
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(listOfIDs => {
      return listOfIDs.data.sort((a,b) => a-b).filter((allIDs, index) => {
        return index < 12;
      })
    })
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
      request(options, (err, res, body) => callback(err, body))
    }
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(listOfIDs => {
      return listOfIDs.data.sort((a,b) => a-b).filter((allIDs, index) => {
        //console.log("number of loads", app.locals.numberOfLoads)
        return index >= app.locals.numberOfLoads && index < 12 + app.locals.numberOfLoads;
      })
    })
    .then(filteredIDs => {
      app.locals.numberOfLoads += 12;
      let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
      async.map(idsToCall, getRequest, (err, result) => {
        if(err) return err;
        return res.send(result);
      })
    })
  }

}

module.exports = artWorkController;