const axios = require('axios');
const async = require('async');
const request = require('request');
const app = require('express')();

app.locals.numberOfLoads = 0;
app.locals.cachedIDs;
app.locals.cachedArtInfo;

const artWorkController = {

  retrieveIDs(req, res) {
    axios.get('https://appsheettest1.azurewebsites.net/sample/art/', { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(idObj => idObj.data)
      .then(id => {
        const sorted = id.sort((a, b) => a - b);
        app.locals.cachedIDs = sorted;
        return res.json(sorted);
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

    const filteredIDs = app.locals.cachedIDs.filter((allIDs, index) => index < 12);
    //use those IDs to create data for display
    app.locals.numberOfLoads = 12;
    let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
    async.map(idsToCall, getRequest, (err, result) => {
      if (err) return err;
      app.locals.cachedArtInfo = result;
      return res.json(result);
    })
  },

  retrieveAdditionalArts(req, res) {

    function getRequest(url, callback) {
      const options = {
        url,
        json: true
      };
      request(options, (err, res, body) => callback(err, body));
    }
    //filter out 12 additional ids to use to get arts we want
    const filteredIDs = app.locals.cachedIDs.filter((allIDs, index) => {
      return index >= app.locals.numberOfLoads && index < 12 + app.locals.numberOfLoads;
    })
    //use those IDs to create data for display
    app.locals.numberOfLoads += 12;
    //add 12 more results to cache
    let idsToCall = filteredIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`)
    async.map(idsToCall, getRequest, (err, result) => {
      if (err) return err;
      app.locals.cachedArtInfo = app.locals.cachedArtInfo.concat(result);
      return res.json(result);
    })
  },

  homePage(req, res) {
    //console.log("express cached Art: ", app.locals.cachedArtInfo)
    return res.json(app.locals.cachedArtInfo);
  },

  searchArtist(req, res) {
    function getRequest(url, callback) {
      const options = {
        url,
        json: true
      };
      request(options, (err, res, body) => callback(err, body));
    }
    let idsToCall = app.locals.cachedIDs.map(id => `https://appsheettest1.azurewebsites.net/sample/art/${id}`);
    idsToCall = idsToCall.filter((element, index) => index < 100);
    async.map(idsToCall, getRequest, (err, result) => {
      if (err) return err;
      return res.json(result);
    })
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
    //let filteredIDs = idsToCall.filter((element, index) => index < 50)
    async.map(idsToCall, getRequest, (err, result) => {
      if (err) return err;
      return res.json(result);
    })
  }

}

module.exports = artWorkController;