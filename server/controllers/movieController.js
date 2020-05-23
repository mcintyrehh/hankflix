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
      axios.get(`https://api.themoviedb.org/3/search/movie/lookup?term=?api_key=${process.env.TMDB_API}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(function(response) {
          const responseBlock = response.data
          return res.json(responseBlock);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    searchByTerm: function(req, res) {
      console.log(req.params.id);
      //replaces spaces in search terms  with %20 per radarr api docs
      const query = encodeURIComponent(req.params.id.trim())
      console.log(query);
      axios.get(`${process.env.RADARR_URL}/api/movie/lookup?term=${query}&apikey=${process.env.RADARR_API}`)
      .then(function(response) {
        const responseBlock = response.data
        console.log(responseBlock);
        return res.json(responseBlock);
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    searchById: function(req, res) {
      const id = req.params.id;
      console.log(query);
      axios.get(`${process.env.RADARR_API}/api/movie/lookup/imdb?imdbId=${id}`)
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
      db.Collection.findOne({ 'tmdb_id': req.params.id}, (err, match) => {
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
      axios.get(`${process.env.RADARR_URL}/api/movie?apikey=${process.env.RADARR_API}`)
      .then(function(response) {
          const allMovies = response.data
          /*For every movie returned, it checks our current collection db to see if it exists already
          -if it exists and the monitored/downloaded status are the same --- it moves on
          -if it exists and the statuses differ, it updates them to the most recent info
          -if it doesn't already exist we add a new entry */
          allMovies.map(movie => {
            const query = { 'tmdb_id': movie.tmdbId }
            db.Collection.findOne(query, (err, match) => {
              if (match) {
                if (match.imdb_id === '' || !match.imdb_id) {
                  return;
                }
                if ((match.monitored == movie.monitored.toString()) && (match.downloaded == movie.downloaded.toString())) {
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
                  image: ((movie || {}).images[0] || {}).url, //makes sure we're never reading .url of undefined, if a property doesn't exist it creates an empty object on the fly
                  downloaded: movie.downloaded,
                  monitored: movie.monitored,
                  imdb_id: movie.imdbId,
                  tmdb_id: movie.tmdbId,
                  added: movie.added,
                }
                db.Collection.create(movieAdd);
                console.log(`${movie.title} (${movie.year}) - added!`)
              }
            })
          })
          return res.json(allMovies);
      })
      .catch(function(error) {
          console.log(error);
      })
    },
    /* takes the object of movie information generated from the API.radarrPost(radarrPostData) function and adds a new movie
       - returns json object if successful */
    radarrPost: function(req, res) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
      console.log(req.body);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
      axios.post(`${process.env.RADARR_URL}/api/movie?apikey=${process.env.RADARR_API}`, req.body)
      .then(function (response) {
        return res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  