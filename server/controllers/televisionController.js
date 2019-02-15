const axios = require("axios");
const db = require("../models");
require("dotenv").config();


// Defining methods for the requestController
module.exports = {

  getCollection: function(req, res) {
    axios.get(`https://onraysonarr.duckdns.org/api/series?apikey=${process.env.SONARR_API}`)
    .then(function(response) {
      console.log(response.data);
      const tvCollection = response.data;
      tvCollection.map(show => {
        db.TVShow.findOne({ 'tvdbId': show.tvdbId }, (err, match) => {
          if(match) {
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