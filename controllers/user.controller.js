const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register User

exports.Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const findEmail = await User.findOne({ email });
    const findUserName = await User.findOne({ username });
    // cheking Email
    if (findEmail) {
      return res
        .status(400)
        .send({ errors: [{ msg: "this email is already registred" }] });
    }

    // cheking User name
    if (findUserName) {
      return res
        .status(400)
        .send({ errors: [{ msg: "this User namer is already used" }] });
    }

    //hashing password

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // add User

    const newUser = new User({ ...req.body });
    newUser.password = hashedPassword;

    //create the token
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // save the user
    await newUser.save();

    // all is good

    res.send({ msg: "user saved succesfully !!", user: newUser, token });
  } catch (error) {
    res.send({ errors: [{ msg: "register failed " }] });
  }
};

// login

exports.Login = async (req, res) => {
  try {
    const { userInput, password } = req.body;

    const userByEmail = await User.findOne({ email: userInput });
    const userByName = await User.findOne({ username: userInput });
    // checking email or username
    if (!userByName && !userByEmail) {
      return res
        .status(400)
        .send({ errors: [{ msg: "bad email or user name" }] });
    }

    // check password

    let checkPass = false;
    if (userByEmail) {
      checkPass = bcrypt.compareSync(password, userByEmail.password);
    } else {
      checkPass = bcrypt.compareSync(password, userByName.password);
    }

    if (!checkPass) {
      return res.status(400).send({ errors: [{ msg: "bad passowrd" }] });
    }

    // create token
    const user = userByEmail || userByName;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    // all is good
    return res.status(200).send({
      msg: "login success ! ",
      user: userByEmail || userByName,
      token,
    });
  } catch (error) {
    res.send({ errors: [{ msg: "Login Failed", error }] });
  }
};

exports.EditUser = async (req, res) => {
  let profilePicture = "";
  try {
    const { id } = req.params;

    if (req.file) {
      profilePicture = req.file.filename;
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body, profilePicture: profilePicture },
      }
    );
    res.send({ msg: "user uptadted", user });
  } catch (error) {
    res.status(400).send({ msg: "update failed", error });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });
    res.send({ msg: "user deleted" });
  } catch (error) {
    res.status(400).send({ msg: "can not delete" });
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).send({ msg: "get all users", users: listUsers });
  } catch (error) {
    res.status(400).send({ msg: "can not get all" });
  }
};
