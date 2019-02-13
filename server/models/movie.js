const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const newMovieSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    qualityProfileId: {
        type: Number,
        required: true
    },
    titleSlug: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    tmdbID: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    path: {
        type: String, 
        required: true
    },
    monitored: {
        type: Boolean,
        default: true,
        required: true
    },
    addOptions: {
        searchForMovie: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const MovieRequest = mongoose.model("MovieRequest", newMovieSchema);
module.exports = MovieRequest;