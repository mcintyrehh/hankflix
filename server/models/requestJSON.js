const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieRequestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imdb_id: {
        type: String,
        required: true
    },
    poster_url: {
        type: String
    }

});

const MovieRequestJSON = mongoose.model("MovieRequestJSON", movieRequestSchema);

module.exports = MovieRequestJSON;