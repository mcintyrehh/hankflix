import axios from "axios";

export default {
  
  // Gets all books
  getAllRequests: function() {
    return axios.get("/api/requests");
  },
  // Gets the book with the given id
  getRequest: function(id) {
    return axios.get("/api/requests" + id);
  },
  checkID: function(query) {
    return axios.get(`/api/requests/${query}`, query);
  },
  // Sends a new request to the server
  newRequest: function(requestData) {
    return axios.post("/api/requests", requestData);
  },
  getCollection: function() {
    return axios.get("/api/sonarr");
  },
  search: function(query) {
    return axios.get(`/api/sonarr/${query}`, query);
  },
  getID: function(query) {
    return axios.get(`/api/sonarr/imdb/${query}`, query);
  },

};