const router = require("express").Router();
const requestController = require("../../controllers/requestController");

router.route("/")
    // matches with '/api/requests'
    .post(requestController.create)
    .get(requestController.get);
router.route('/:id')
    // matches with '/api/articles/:id'
    //**will be used for adding a note to the article**/
    // .put(requestController.update)
    .delete(requestController.remove);

    module.exports = router;

    // get, put, delete routes