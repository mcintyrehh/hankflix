const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	email: { type: String, unique: true },
	password: { type: String, unique: false, required: false },
	username: { type: String, unique: true, required: true},
	
	phoneNumber: { type: Number, unique: false, required: false },
	savedTV: [{ type: Schema.Types.ObjectId, ref: "SavedTV"}],
	savedMovies: [{ type: Schema.Types.ObjectId, ref: "SavedMovies"}]
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
