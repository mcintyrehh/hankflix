const router = require("express").Router();
const movieController = require("../../controllers/movieController");

// matches with '/api/movie'
router.route("/")
    .post(movieController.create)
    .get(movieController.get)

// matches with '/api/movie/list'
router.route("/list")
    .get(movieController.list)
    
// matches with '/api/movie/:id'
router.route('/:id')
    .get(movieController.search)
    .delete(movieController.remove)

// matches with '/api/movie/imdb/:id'
router.route('/imdb/:id')
    .get(movieController.getID);

 module.exports = router;
