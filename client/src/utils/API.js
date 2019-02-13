import axios from "axios";

export default {
  
  // Gets all books
  getAllRequests: function() {
    return axios.get("/api/movie");
  },
  // Gets the book with the given id
  getRequest: function(id) {
    return axios.get("/api/movie" + id);
  },
  checkID: function(query) { 
    return axios.get(`/api/movie/${query}`, query);
  },
  // Sends a new request to the server
  newRequest: function(requestData) {
    return axios.post("/api/movie", requestData);
  },
  getCollection: function() {
    return axios.get("/api/movie");
  },
  search: function(query) {
    return axios.get(`/api/movie/${query}`, query);
  },
  getID: function(query) {
    return axios.get(`/api/movie/imdb/${query}`, query);
  },

};