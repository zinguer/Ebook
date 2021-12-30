const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
	id_user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	id_ebook: {
		type: Schema.Types.ObjectId,
		ref: "Ebook",
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		// deafault: Date.now(),
	},
});

module.exports = Comment = model("Comment", CommentSchema);
