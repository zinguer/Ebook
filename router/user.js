const express = require("express");
const {
  Register,
  Login,
  EditUser,
  DeleteUser,
  GetAllUsers,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/upload");
const {
  registerValidation,
  validation,
  loginValidation,
} = require("../middlewares/userValidation");
const User = require("../models/User");

const router = express.Router();

// // test
// router.get("/", (req, res) => {
//   res.send("test route");
// });

// resgister
router.post("/register", registerValidation(), validation, Register);

// login

router.post("/login", loginValidation(), validation, Login);

// auth
router.get("/current", isAuth, (req, res) => {
  res.send({ msg: "authentified", user: req.user });
});

// edit User

router.put("/edituser/:id", upload.single("profilePicture"), EditUser);

// delete User

router.delete("/deleteuser/:id", DeleteUser);

// get all users

router.get("/getallusers", GetAllUsers);

module.exports = router;
