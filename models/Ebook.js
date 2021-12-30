const mongoose = require("mongoose");

const { Schema } = mongoose;

const EbookSchema = new Schema({
	name: {
		type: String,
		// required: String,
	},
	genre: {
		type: String,
		// required: String,
	},
	duration: {
		type: String,
		// required: String,
	},

	language: {
		type: String,
		// required: String,
	},
	release: {
		type: Number,
		// required: Number,
	},
	rate: {
		type: Number,
		// required: Number,
	},
	description: {
		type: String,
		// required: String,
	},
	image: {
		type: String,
	},
	audio: {
		type: String,
	},
	image: {
		type: String,
	},
});

module.exports = Ebook = mongoose.model("Ebook", EbookSchema);
