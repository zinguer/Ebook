const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
	destination: "client/public/ebookImages",
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname),
		);
	},
});

const ebookImageUpload = multer({
	storage: storage,
});

module.exports = ebookImageUpload;
