const router = require("express").Router();
const requestController = require("../../controllers/requestController");

router.route("/")
    // matches with '/api/requests'
    .post(requestController.create)
    .get(requestController.get)
router.route("/list")
    // matches with '/api/requests/list'
    .get(requestController.list)
router.route('/:id')
    // matches with '/api/requests/:id'
    .get(requestController.get)
    .delete(requestController.remove)

 module.exports = router;
