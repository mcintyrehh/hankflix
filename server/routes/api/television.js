const router = require("express").Router();
const televisionController = require("../../controllers/televisionController");

router.route("/collection")
    // matches with '/api/television/collection'
    .get(televisionController.getCollection);
// router.route('/:id')
//     // matches with '/api/sonarr/:id' in routes
//     .get(sonarrController.search);
// router.route('/imdb/:id')
//     .get(sonarrController.getID);

module.exports = router;
