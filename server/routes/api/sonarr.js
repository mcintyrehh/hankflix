const router = require("express").Router();
const sonarrController = require("../../controllers/sonarrController");

router.route("/")
    // matches with '/api/sonarr'
    .get(sonarrController.get);
router.route('/:id')
    // matches with '/api/sonarr/:id' in routes
    .get(sonarrController.search);

module.exports = router;
