var express = require('express');
var router = express.Router();
const authRoutes = require("./auth");
const apiRoutes = require("./api");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Auth Routes
router.use('./auth', authRoutes);

//API Routes
router.use("/api", apiRoutes);

module.exports = router;
