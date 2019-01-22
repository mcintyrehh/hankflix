const db = require("../models");

// Defining methods for the requestController
module.exports = {

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
    
    get: function(req, res) {
      console.log(req.params.id);
      db.Collection
        .find({ 'imdb_id': req.params.id })
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
  