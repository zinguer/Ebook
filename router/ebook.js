const express = require("express");
const {
	EbookCheck,
	getAllEbooks,
	deletebook,
	updatebook,
	getOneEbook,
	updateBookImage,
	updateBookAudio,
} = require("../controllers/ebook.controller");
const { addValidation, validation } = require("../middlewares/bookValidation");
const ebookAudioUpload = require("../middlewares/ebookAudioUpload");
const ebookImageUpload = require("../middlewares/ebookImageUpload");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("test route");
});

// add e book
router.post("/addebook", addValidation(), validation, EbookCheck);

// get all e books
router.get("/getall", getAllEbooks);

// get one e book

router.get("/getone/:id", getOneEbook);

// delete e book
router.delete("/deletebook/:id", deletebook);

// update e book

router.put("/updatebook/:id", updatebook);

// add an image

router.put(
	"/updatebookimage/:id",
	ebookImageUpload.single("image"),
	updateBookImage,
);

router.put(
	"/updatebookaudio/:id",
	ebookAudioUpload.single("audio"),
	updateBookAudio,
);

module.exports = router;
