const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const televisionSchema = new Schema ({
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
    monitored: {
        type: Boolean,
    },
    addOptions: {
        type: Boolean
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    totalEpisodeCount: {
        type: Number
    },
    episodeCount: {
        type: Number
    },
    seasonCount: {
        type: Number,
        required: false
    }
});

const TVShow = mongoose.model("TVShow", televisionSchema);
module.exports = TVShow;