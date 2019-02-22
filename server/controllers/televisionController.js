const axios = require("axios");
const db = require("../models");
require("dotenv").config();


// Defining methods for the requestController
module.exports = {
  TVDBLogin: function(req, res) {
    axios.post(`https://api.thetvdb.com/login`, {
      apikey: process.env.TVDB_API,
      username: "mcintyrehhpe8",
      userkey: "QCMXKFYRC4Z2F7J7"
    })
    .then(function (response) {
      console.log(`TVDBLogin response: ${response.data}`);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  TVDBSearch: function(req, res) {
    console.log(req.params);
    const searchTerm = encodeURI(req.params.query);
    const authToken = req.headers.authorization;
    console.log(searchTerm);
    axios.get(`https://onraysonarr.duckdns.org/api/series/lookup?term=${searchTerm}&apikey=${process.env.SONARR_API}`)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  checkSeries: function(req, res) {
    db.TVShow.findOne({'tvdbId': req.params.series }, (err, match) => {
      if (match) {
        return res.json(match);
      }
      else {
        return res.json({
          monitored: "false",
          downloaded: "false"
        });
      }
    })
  },
  getCollection: function(req, res) {
    axios.get(`https://onraysonarr.duckdns.org/api/series?apikey=${process.env.SONARR_API}`)
    .then(function(response) {
      // console.log(response.data);
      const tvCollection = response.data;
      tvCollection.map(show => {
        db.TVShow.findOne({ 'tvdbId': show.tvdbId }, (err, match) => {
          if(match) {
            /*Need to add logic to update collection info with new episode/season download info
              currently it will just ignore the show if its already in the collection */
            return;
          }
          else {
            const addShow = {
              tvdbId: show.tvdbId,
              title: show.title,
              qualityProfileId: 1,
              titleSlug: show.titleSlug,
              images: show.images,
              seasons: show.seasons,
              seasonCount: show.seasonCount,
              totalEpisodeCount: show.totalEpisodeCount,
              episodeCount: show.episodeCount
            }
          db.TVShow.create(addShow);
          console.log("show added!");
          }
        })
      })
      return res.json(tvCollection);
    })
    .catch(function(error) {
      console.log(error);
    })
  }
};