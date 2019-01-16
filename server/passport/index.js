const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const db = require('../models');

passport.serializeUser((user, done) => {
	console.log('Serialize called');
	console.log(user); // the whole raw user object!
	console.log('---------');
	done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
	console.log('Deserialize called');
	db.User.findOne(
		{ _id: id },
		'firstName lastName username',
		(err, user) => {
			console.log('Deserialize user called');
			console.log(user);
			console.log('--------------');
			done(null, user);
		}
	);
});

// Register Strategies
passport.use(LocalStrategy);

module.exports = passport;
