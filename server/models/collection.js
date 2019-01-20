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
        type: String
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
        required: false
    },
    added: {
        type: Date
    }

});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;