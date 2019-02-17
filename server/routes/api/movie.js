const router = require("express").Router();
const movieController = require("../../controllers/movieController");

// matches with '/api/movie'
router.route("/")
    .post(movieController.create)
    .get(movieController.getCollection)

// matches with '/api/movie/list'
router.route("/list")
    .get(movieController.list)
// matches with '/api/movie/movie-search
router.route("/movie-search/:id")
    .get(movieController.searchByTerm)
// matches with '/api/movie/:id'
router.route('/:id')
    .get(movieController.statusCheck)
    .delete(movieController.remove)
router.route('/radarr-post')
    .post(movieController.radarrPost)
// matches with '/api/movie/imdb/:id'
router.route('/imdb/:id')
    .get(movieController.getID);

 module.exports = router;
