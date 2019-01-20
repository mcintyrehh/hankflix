const router = require("express").Router();
const requestRoutes = require("./request");
const sonarrRoutes = require("./sonarr");

// API routes
router.use("/requests", requestRoutes);
router.use("/sonarr", sonarrRoutes);
module.exports = router;