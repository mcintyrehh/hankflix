import axios from "axios";

export default {
  
  // Gets all books
  getAllRequests: function() {
    return axios.get("/api/movie");
  },
  // Gets the book with the given id
  getRequest: function(id) {
    return axios.get(`/api/movie/${id}`, id);
  },
  // checkID: function(query) { 
  //   return axios.get(`/api/movie/${query}`, query);
  // },
  // Sends a new request to the server
  newRequest: function(requestData) {
    return axios.post("/api/movie", requestData);
  },
  getCollection: function() {
    return axios.get("/api/movie");
  },
  search: function(query) {
    return axios.get(`/api/movie/movie-search/${query}`, query);
  },
  getID: function(query) {
    return axios.get(`/api/movie/imdb/${query}`, query);
  },
  statusCheck: function(query) {
    return axios.get(`/api/movie`)
  },
  getTVCollection: function() {
    return axios.get("/api/television/collection");
  },
  tvdbLogin: function() {
    return axios.get("api/television/tvdb-login");
  },
  tvdbSearch: function(query) {
    return axios.get(`/api/television/search/${query}`, query);
  }
};