const axios = require("axios");
const db = require("../models");
require("dotenv").config();


// Defining methods for the requestController
module.exports = {

    get: function(req, res) {
        console.log(process.env.SONARR_API)
        axios.get(`https://onrayradarr.duckdns.org/api/movie/1?apikey=${process.env.SONARR_API}`)
        .then(function(response) {
            const allMovies = response.data
            console.log(allMovies);
            return res.json(allMovies);
        })
        .catch(function(error) {
            console.log(error);
        })
    },
    create: function(req, res) {
      const imdbID = req.body.imdb_id;
      const title = req.body.title;
      console.log(imdbID);
      db.Request.findOne({ 'imdb_id': imdbID }, (err, requestMatch) => {
        if (requestMatch) {
          return res.json({
            error: `${title} has been already been requested and is being monitored by the server!`
          });
        }
        else {
          db.Request
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));        
        }
      })
    },
    remove: function(req, res) {
      db.Request
      .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  };
  