const router = require("express").Router();
const sonarrController = require("../../controllers/sonarrController");

router.route("/")
    // matches with '/api/sonarr'
    .post(sonarrController.create)
    .get(sonarrController.get);
router.route('/:id')
    // matches with '/api/articles/:id'
    //**will be used for adding a note to the article**/
    // .put(requestController.update)
    // .delete(requestController.remove);

    module.exports = router;

    // get, put, delete routes