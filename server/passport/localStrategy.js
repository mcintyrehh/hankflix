const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(email, password, done) {
		db.User.findOne({ 'email': email }, (err, userMatch) => {
			if (err) {
				return done(err);
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect email' });
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' });
			}
			return done(null, userMatch);
		});
	}
);

module.exports = strategy;
