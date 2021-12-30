const Comment = require("../models/Comment");
const Ebook = require("../models/Ebook");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.addComment = async (req, res) => {
	try {
		const token = req.headers["authorization"];

		if (!token) {
			return res.status(401).send({ errors: [{ msg: "not token" }] });
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (!decoded) {
			return res.status(401).send({ errors: [{ msg: "not password" }] });
		}
		const findUser = await User.findById(decoded._id);
		if (!findUser) {
			return res.status(401).send({ errors: [{ msg: "not user found" }] });
		}

		// cheking book
		let ebook = await Ebook.findOne({ _id: req.params.id });
		if (!ebook) {
			return res.status(400).send({ msg: "book not found" });
		}

		const { description } = req.body;
		const date = Date.now();

		const newComment = new Comment({
			...req.body,
			description: description,
			id_ebook: ebook._id,
			id_user: findUser._id,
			date: date,
		});

		await newComment.save();

		res.send({
			msg: "comment added successfully",
			comment: newComment,
			ebook,
			findUser,
		});
	} catch (error) {
		res.status(400).send({ msg: " adding comment failed" });
	}
};

exports.getComment = async (req, res) => {
	try {
		// cheking book
		let ebookComment = await Comment.find({ id_ebook: req.params.id });
		res.status(200).send({ msg: "comments found", ebookComment });
	} catch (error) {
		res.status(400).send({ msg: "get comment failed" });
	}
};

exports.getAllComments = async (req, res) => {
	try {
		let allComments = await Comment.find();
		res.status(200).send({ msg: "all comments found", allComments });
	} catch (error) {
		res.status(400).send({ msg: "get all comments failed" });
	}
};
