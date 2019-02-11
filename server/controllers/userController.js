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
    const { email, password, phoneNumber } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'email': email }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `${email} is already registered`
        });
      }
      const newUser = new db.User({
        'email': email,
        'password': password,
        'phoneNumber': phoneNumber
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


};