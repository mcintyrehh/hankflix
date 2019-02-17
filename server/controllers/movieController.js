const db = require("../models");
const axios = require("axios");

// Defining methods for the requestController
module.exports = {

    create: function(req, res) {
      const imdbID = req.body.imdb_id;
      const title = req.body.title;
      // console.log(imdbID);
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
    getID: function(req, res) {
      const query = req.params.id;
      axios.get(`https://api.themoviedb.org/3/movie/${query}?api_key=${process.env.TMDB_API}&language=en-US`)
        .then(function(response) {
          const responseBlock = response.data;
          // console.log(responseBlock);
          return res.json(responseBlock);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    search: function(req, res) {
      console.log(req.params.id);
      const query = req.params.id;
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(function(response) {
          const responseBlock = response.data
          console.log(responseBlock);
          return res.json(responseBlock);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    statusCheck: function(req, res) {
      console.log(req.params.id)
      db.Collection.findOne({ 'imdb_id': req.params.id}, (err, match) => {
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
      // hits radarr api and returns an object containing the entire movie collection
      axios.get(`https://onrayradarr.duckdns.org/api/movie?apikey=${process.env.RADARR_API}`)
      .then(function(response) {
          const allMovies = response.data
          /*For every movie returned, it checks our current collection db to see if it exists already
          -if it exists and the monitored/downloaded status are the same --- it moves on
          -if it exists and the statuses differ, it updates them to the most recent info
          -if it doesn't already exist we add a new entry */
          allMovies.map(movie => {
            const query = { 'imdb_id': movie.imdbId }
            db.Collection.findOne(query, (err, match) => {
              if (match) {
                if (match.imdb_id === '' || !match.imdb_id) {
                  return;
                }
                // console.log(`${match.title} - Monitored: ${match.monitored} vs ${movie.monitored}`)
                // console.log(`${match.title} - Downloaded: ${match.downloaded} vs ${movie.downloaded}`)
                // console.log(typeof match.monitored)
                // console.log(typeof movie.monitored)
                if ((match.monitored == movie.monitored.toString()) && (match.downloaded == movie.downloaded.toString())) {
                  // console.log("*****MATCH*****")
                  return;
                }
                else {
                  console.log("missmatch");
                  console.log(match);
                  db.Collection.findOneAndUpdate(query, { monitored: movie.monitored, downloaded: movie.downloaded }, (err, match) => {
                    // console.log(`updated ${match.title}`);
                  })
                  return;
                }
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
                console.log("movie added!")
                console.log(movieadd);
              }
            })
          })
          return res.json(allMovies);
      })
      .catch(function(error) {
          console.log(error);
      })
    },
    list: function(req, res) {
      db.Request
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.Request
      .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  };
  