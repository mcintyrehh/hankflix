const mongoose = require("mongoose");
const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'username': username }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password
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
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
  },
  //populating seperately, as '.populate("savedFake", "savedReal") would just try to populate the 'savedReal field of "savedFake"
  getAllSavedArticles: (req, res) => {
    console.log(req);
    db.User.findById(req.params.id)
      .populate("savedFake")
      .populate("savedReal")
      .then(dbUser => res.json({savedFake: dbUser.savedFake, savedReal: dbUser.savedReal, votedOn: dbUser.votedOn}))
      .catch(err => res.status(422).json(err));
  },
  updateUserSavedFakeArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$push: {savedFake: req.body.fakeArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  },
  updateUserSavedRealArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$push: {savedReal: req.body.realArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  },
  removeUserSavedFakeArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$pull: {savedFake: req.body.fakeArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  },
  removeUserSavedRealArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$pull: {savedReal: req.body.realArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  },
  //referenced vote history, passing the article id
  addToVotedOn: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$push: {votedOn: req.body.articleId }})
      .then(() => res.json({message: "Vote Recorded"}))
      .catch(err => res.status(422).json(err));
  },
  removeFromVotedOn: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$pull: {votedOn: req.body.articleId }})
      .then(() => res.json({message: "Vote Recorded"}))
      .catch(err => res.status(422).json(err));
  }
};