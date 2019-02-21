import axios from "axios";

export default {
  
  // gets all movies in radarr collection, populates/updates local db
  getCollection: function() {
    return axios.get("/api/movie");
  },
  // searches for new movies on trakt by search query
  searchByTerm(query) {
    return axios.get(`/api/movie/movie-search/${query}`, query);
  },
  searchByID(id) {
    return axios.get(`/api/movie/movie-search/imdb-id/${id}`, id)
  },
  // checks the monitored/downloaded status by a movie's tmdb id
  checkStatus: function(id) {
    return axios.get(`/api/movie/${id}`, id);
  },
  // adds a movie request to /api/movie/list, to be picked up by radarr when it scrapes the url every 15 mins 
  // (as a failsafe incase the below POST doesn't work)
  newRequest: function(requestData) {
    return axios.post("/api/movie", requestData);
  },
  // posts a new movie to radarr, adds to collection
  radarrPost: function(data) {
    return axios.post("/api/movie/radarr-post", data);
  },

  /********************************/
  /*******TELEVISION ROUTES********/
  /********************************/
  getTVCollection: function() {
    return axios.get("/api/television/collection");
  },
  tvdbLogin: function() {
    return axios.get("api/television/tvdb-login");
  },
  tvdbSearch: function(obj) {
    return axios.post(`/api/television/search/${obj.id}`, obj.token);
  }
};