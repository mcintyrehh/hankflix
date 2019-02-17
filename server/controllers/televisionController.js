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
    console.log("test");
    const searchTerm = req.params.query;
    console.log(searchTerm);
    axios.get(`https://api.thetvdb.com/search/series?name=${searchTerm}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTAzMzQ3NjksImlkIjoiIiwib3JpZ19pYXQiOjE1NTAyNDgzNjksInVzZXJpZCI6NTIwNTEwLCJ1c2VybmFtZSI6Im1jaW50eXJlaGhwZTgifQ.uMcc4ObjYtkWY7iU47OxkhsqelPb6jIWbPImDYDDlf20OUeXm2QGVeKl_zoR3FA0D_h-plM7ZfQ-1iWR3_6xx5rmQ5s-44c6QjW3ukn2hlpvqng_dB5Wn5UJXltl5wjvWNfEP6HilCCK6V3i_3DoOuhiBel_1W_YKkFW2THyqpGCKjTfqaRrHVJ5k1dGdnsK7hH2ev9IdqsfPA8yfjgiamWr4yYf6VUJbSB0_fK80Ie3XYbLv1l6fwMDILp69hYldqtGKxWCyo5Z1DMxzUDwzP6Vv47MoNFUsa6XucqB3RmRtwQlWojJ80a_xZO3WKRKxM12vX3l-PhOUAvikYi5bg`
      }
    })
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
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
  },
  searchTVDB: function(req, res) {
    axios.get(`https://api.thetvdb.com/`)
  }
};