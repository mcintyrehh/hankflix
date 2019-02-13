const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const newTelevisionSchema = new Schema ({
    tvdbId: {
        type: String,
        required: true
    },
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
    seasons: {
        type: Array, 
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const TVRequest = mongoose.model("TVRequest", savedTVSchema);
module.exports = TVRequest;