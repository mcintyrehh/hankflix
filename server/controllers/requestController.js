const db = require("../models");

// Defining methods for the requestController
module.exports = {

    create: function(req, res) {
      db.Request
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    get: function(req, res) {
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
  