const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
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

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;