const Ebook = require("../models/Ebook");

exports.EbookCheck = async (req, res) => {
	try {
		const { name, genre, language, release, duration, description } = req.body;

		const findEbook = await Ebook.findOne({ name });

		// cheking Ebook name
		if (findEbook) {
			return res
				.status(400)
				.send({ errors: [{ msg: "this ebook name exists" }] });
		}
		const newEbook = new Ebook({ ...req.body });

		await newEbook.save();

		res.send({ msg: "ebook saved succesfully !!", ebook: newEbook });
	} catch (error) {
		res.status(400).send({ msg: "adding e book failed", error });
	}
};

exports.getAllEbooks = async (req, res) => {
	try {
		const listbooks = await Ebook.find();
		res.status(200).send({ msg: "get all ebooks", ebooks: listbooks });
	} catch (error) {
		res.status(400).send({ msg: "can not save the Contact", error });
	}
};

exports.getOneEbook = async (req, res) => {
	try {
		let ebook = await Ebook.findOne({ _id: req.params.id });
		res.status(200).send({ msg: "get one book", ebook });
	} catch (error) {
		res.status(400).send({ msg: " can not get one" });
	}
};

exports.deletebook = async (req, res) => {
	try {
		await Ebook.deleteOne({ _id: req.params.id });
		res.status(200).send({ msg: "delete book succ" });
	} catch (error) {
		res.status(400).send({ msg: "can not delete book " });
	}
};

exports.updatebook = async (req, res) => {
	try {
		const update = await Ebook.updateOne(
			{ _id: req.params.id },
			{ $set: { ...req.body } },
		);
		if (update) {
			res.status(200).send({ msg: "update book succ" });
		} else {
			res.status(400).send({ msg: "no modification " });
		}
	} catch (error) {
		res.status(400).send({ msg: " update failed " });
	}
};

exports.updateBookImage = async (req, res) => {
	try {
		let image = "";

		// checking image

		if (req.file) {
			image = req.file.filename;
		}

		const update = await Ebook.updateOne(
			{ _id: req.params.id },
			{ $set: { image: image } },
		);

		if (update) {
			res.status(200).send({ msg: "image added", update });
		}
	} catch (error) {
		res.status(400).send({ msg: "adding image failed" });
	}
};

exports.updateBookAudio = async (req, res) => {
	try {
		let audio = "";

		// checking audio

		if (req.file) {
			audio = req.file.filename;
		}

		const update = await Ebook.updateOne(
			{ _id: req.params.id },
			{ $set: { audio: audio } },
		);

		if (update) {
			res.status(200).send({ msg: "audio added", update });
		}
	} catch (error) {
		res.status(400).send({ msg: "adding audio failed" });
	}
};
