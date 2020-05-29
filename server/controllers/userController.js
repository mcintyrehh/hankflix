const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    // console.log('===== user!!======');
    // console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { email, password, phoneNumber } = req.body;
    // ADD VALIDATION
    db.User.findOne({ email: email }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `${email} is already registered`,
        });
      }
      const newUser = new db.User({
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie("connect.sid"); // clean up!
      return res.json({ msg: "logging you out" });
    } else {
      return res.json({ msg: "no user to log out!" });
    }
  },
  auth: function (req, res, next) {
    // console.log(req.body);
    // console.log('================');
    next();
  },
  authenticate: (req, res) => {
    // console.log('POST to /login');
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser) {
      // console.log(`Deleting ${cleanUser.password}`);
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
  },
  //populating seperately, as '.populate("savedFake", "savedReal") would just try to populate the 'savedReal field of "savedFake"
  getAllSavedArticles: (req, res) => {
    // console.log(req);
    db.User.findById(req.params.id)
      .populate("savedFake")
      .populate("savedReal")
      .then((dbUser) =>
        res.json({
          savedFake: dbUser.savedFake,
          savedReal: dbUser.savedReal,
          votedOn: dbUser.votedOn,
        })
      )
      .catch((err) => res.status(422).json(err));
  },
  //Post to Plex API to get an authentication code
  plexLogin: (req, res) => {
    const options = {
      headers: {
        "X-Plex-Product": "Hankflix",
        "X-Plex-Platform": "Web",
        "X-Plex-Device": "Hankflix",
        "X-Plex-Client-Identifier": process.env.PLEX_CLIENT_ID,
      },
    };
    return axios
      .post("https://plex.tv/api/v2/pins.json?strong=true", null, options)
      .then((response) => {
        if (
          (response.data || {}).clientIdentifier === process.env.PLEX_CLIENT_ID
        ) {
          return res.json(response.data);
        } else {
          throw new Error("Client identifiers don't match");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //Gets to Plex API to return auth token once the user has authenticated
  plexToken: (req, res) => {
    console.log("*******************", req.body);
    const options = {
      headers: {
        "X-Plex-Client-Identifier": process.env.PLEX_CLIENT_ID,
      },
    };
    return axios
      .get(`https://plex.tv/api/v2/pins/${req.body.id}`, options)
      .then((response) => {
        console.log("**************");
        console.log(response);
        console.log("**************");
        if (
          (response.data || {}).clientIdentifier === process.env.PLEX_CLIENT_ID
        ) {
          return res.json(response.data);
        } else {
          throw new Error(
            "Client identifiers don't match, Auth Token Grab failed"
          );
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  },
  //Gets plex user info with the auth token
  plexUserAccount: (req, res) => {
    const options = {
      headers: {
        "X-Plex-Token": req.body.token,
      },
    };
    return axios
      .get(`https://plex.tv/users/account.json`, options)
      .then((response) => {
        console.log("&&&&&&&&&&&&&&&");
        console.log(response.data);
        console.log("&&&&&&&&&&&&&&&");
        return res.json(response.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  },
};
