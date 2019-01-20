const axios = require("axios");
const db = require("../models");
require("dotenv").config();


// Defining methods for the requestController
module.exports = {

    get: function(req, res) {
        axios.get(`https://onrayradarr.duckdns.org/api/movie?apikey=${process.env.SONARR_API}`)
        .then(function(response) {
            const allMovies = response.data
            allMovies.map(movie => {
              db.Collection.findOne({ 'imdb_id': movie.imdbId }, (err, match) => {
                if (match) {
                  return;
                }
                else {
                  const movieAdd = {
                    title: movie.title,
                    overview: movie.overview,
                    year: movie.year,
                    status: movie.status,
                    image: movie.images[0].url,
                    downloaded: movie.downloaded,
                    monitored: movie.monitored,
                    imdb_id: movie.imdbId,
                    added: movie.added
                  }
                  db.Collection.create(movieAdd);
                  console.log("movie added!");
                }
              })
            })
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