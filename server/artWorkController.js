const axios = require('axios');
const async = require('async');
const request = require('request');

const artWorkController = {

  retrieveIDs: (req, res) => {
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(idObj => idObj.data)
    .then(id => res.json(id));
  },

  retrieveArts: (req, res) => {
    function getRequest(url, callback) {
      const options = {
        url,
        json : true
      };
      request(options, (err, res, body) => callback(err, body))
    }
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(listOfIDs => listOfIDs.data.filter((allIDs) => allIDs <= 200))
    .then(filteredIDs => {
      let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
      async.map(idsToCall, getRequest, (err, result) => {
        if(err) return err;
        return res.send(result);
      })
    })
  }

}

module.exports = artWorkController;