import axios from "axios";

export default {
  // Gets user info
  getUser: function() {
    return axios.get('/auth/user');
  },
  // Logs the user out
  logout: function() {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function(username, password) {
    return axios.post('/auth/login', { username, password });
  },
  // Log in with Plex credentials
  plexLogin: function() {
    return axios.post('/auth/plex-login');
  },
  // Gets plex AuthToken
  plexToken: function(id) {
    return axios.post('/auth/plex-token', {id: id});
  },
  // Gets Plex user information 
  plexUserInfo: function(token) {
    return axios.post('/auth/plex-user-account', {token: token});
  },
  // New user registration
  signup: function(userData) {
    return axios.post('/auth/signup', userData);
  },
  isLoggedIn: function() {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    if(userInfo.authToken) {
      return {loggedIn: true, user: userInfo}
    } else {
      return {loggedIn: false, user: null}
    }
  }
};
