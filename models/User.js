const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
	username: {
		type: String,
		required: String,
	},
	name: {
		type: String,
		// required: String,
	},
	email: {
		type: String,
		required: String,
	},
	password: {
		type: String,
		required: String,
	},
	birthday: {
		type: Date,
		// required: Date,
	},
	phone: {
		type: String,
	},
	profilePicture: {
		type: String,
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

module.exports = User = mongoose.model("user", UserSchema);
