const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
  	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	savedFake: [{ type: Schema.Types.ObjectId, ref: "FakeArticles"}],
	savedReal: [{ type: Schema.Types.ObjectId, ref: "RealArticles"}],
	votedOn: [{ type: Schema.Types.ObjectId }]
	/* 
		After minimum viable product is complete, we can discuss sending to database what user upvote/downvote to better tailer what the user will see on the site. 
		Also need to store which articles the user upvote/downvote to make sure they aren't about to vote up or down multiple times, server-side
	*/
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('No password provided!');
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
