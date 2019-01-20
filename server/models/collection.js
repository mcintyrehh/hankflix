const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String
    },
    year: {
        type: Number
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: URL
    },
    downloaded: {
        type: String,
        required: true
    },
    monitored: {
        type: String,
        required: true
    },
    imdb_id: {
        type: String,
        required: true
    },
    poster_url: {
        type: String
    },
    added: {
        type: Date
    }

});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;