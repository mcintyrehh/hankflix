const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const televisionSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    alternativeTitles: {
        type: Array
    },
    sortTitle: {
        type: String,
    },
    seasonCount: {
        type: Number
    },
    totalEpisodeCount: {
        type: Number
    },
    episodeCount: {
        type: Number
    },
    episodeFileCount: {
        type: Number
    },
    sizeOnDisk: {
        type: Number
    },
    status: {
        type: String
    },
    overview: {
        type: String
    },
    previousAiring: {
        type: Date
    },
    network: {
        type: String
    },
    airTime: {
        type: String
    },
    images: {
        type: Array,
        required: true
    },
    seasons: {
        type: Array, 
        required: true
    },
    year: {
        type: Number
    },
    path: {
        type: String
    },
    profileId: {
        type: Number
    },
    seasonFolder: {
        type: Boolean,
        default: true
    },
    monitored: {
        type: Boolean,
    },
    useSceneNumbering: {
        type: Boolean,
        default: false
    },
    runtime: {
        type: Number
    },
    tvdbId: {
        type: String,
        required: true
    },
    tvRageId: {
        type: String
    },
    tvMazeId: {
        type: String
    },
    firstAired: {
        type: Date
    },
    lastInfoSync: {
        type: Date
    },
    seriesType: {
        type: String
    },
    cleanTitle: {
        type: String
    },
    imdbId: {
        type: String
    },
    titleSlug: {
        type: String
    },
    certification: {
        type: String
    },
    genres: {
        type: Array
    },
    tags: {
        type: Array
    }, 
    added: {
        type: Date,
    },
    ratings: {
        type: Object
    },
    qualityProfileId: {
        type: Number
    },
    id: {
        type: Number
    }
});

const TVShow = mongoose.model("TVShow", televisionSchema);
module.exports = TVShow;