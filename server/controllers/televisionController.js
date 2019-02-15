const axios = require("axios");
const db = require("../models");
require("dotenv").config();


// Defining methods for the requestController
module.exports = {

  getCollection: function(req, res) {
    axios.get(`https://onraysonarr.duckdns.org/api/series?apikey=${process.env.SONARR_API}`)
  }



  };