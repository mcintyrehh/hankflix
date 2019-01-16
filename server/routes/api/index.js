const router = require("express").Router();
const requestRoutes = require("./request");

// Book routes
router.use("/requests", requestRoutes);

module.exports = router;