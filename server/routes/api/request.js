const router = require("express").Router();
const requestController = require("../../controllers/requestController");

router.route("/")
    // matches with '/api/requests'
    .get(requestController.get);
router.route('/:id')
    // matches with '/api/requests/:id'
    .get(requestController.get)
    .delete(requestController.remove);

    module.exports = router;

    // get, put, delete routes