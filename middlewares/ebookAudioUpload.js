const multer = require("multer");

const path = require("path");

const audiobokkstorage = multer.diskStorage({
	destination: "client/public/ebookAudio",
	limits: { fileSize: 100000000000000000 },

	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname),
		);
	},
});

const ebookAudioUpload = multer({
	storage: audiobokkstorage,
	fileFilter: function (req, file, cb) {
		const allowedMimeTypes = ["audio/wav", "audio/mp3"];
		if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
			cb(null, false);
		}
		cb(null, true);
	},
});

module.exports = ebookAudioUpload;
