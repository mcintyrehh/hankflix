const router = require("express").Router();
const movieRoutes = require("./movie");
const televisionRoutes = require("./television");

// API routes
// will serve routes for /api/movie
router.use("/movie", movieRoutes);
// will serve routes for /api/television
router.use("/television", televisionRoutes);

module.exports = router;