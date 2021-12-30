const express = require("express");
const connectDB = require("./config/connectDB");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(express.json());

app.use("/api/user", require("./router/user"));

app.use("/api/ebook", require("./router/ebook"));

app.use("/api/comment", require("./router/comment"));

// deploy
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, (error) =>
	error
		? console.log(error.mes)
		: console.log(`server is running on port ${PORT}`),
);
