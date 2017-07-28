const axios = require('axios');
const async = require('async');
const request = require('request');
const app = require('express')();

app.locals.cachedIDs;

const artWorkController = {

  retrieveIDs(req, res) {
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(idObj => idObj.data)
      .then(id => {
        const sorted = id.sort((a, b) => a - b);
        app.locals.cachedIDs = sorted;
        // console.log('length: ', app.locals.cachedIDs.filter(id => id < 1000).length)
        return res.json(sorted);
      });
  },

  cachedArtInfo(req, res) {
    function getRequest(url, callback) {
      const options = {
        url,
        json: true
      };
      request(options, (err, res, body) => callback(err, body));
    }
    let idsToCall = app.locals.cachedIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`);
    async.map(idsToCall, getRequest, (err, result) => {
      if (err) return err;
      return res.json(result);
    });
  },

  retrieveInitialArts(req, res) {
    function getRequest(url, callback) {
      const options = {
        url,
        json: true
      };
      request(options, (err, res, body) => callback(err, body))
    }
    //initial request to get first 12 IDs
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(listOfIDs => {
        return listOfIDs.data.sort((a, b) => a - b).filter((allIDs, index) => index < 12);
      })
      //use those IDs to create data for display
      .then(filteredIDs => {
        let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
        async.map(idsToCall, getRequest, (err, result) => {
          if (err) return err;
          return res.json(result);
        })
      })
  }

}

module.exports = artWorkController;