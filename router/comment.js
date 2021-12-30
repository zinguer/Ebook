const express = require("express");
const {
	addComment,
	getComment,
	getAllComments,
} = require("../controllers/comment.controller");

const router = express.Router();

router.post("/addcomment/:id", addComment);

router.get("/getcomment/:id", getComment);

router.get("/getallcomments", getAllComments);

// test
// router.get("/", (req, res) => {
// 	res.send("test route");
// });
module.exports = router;
