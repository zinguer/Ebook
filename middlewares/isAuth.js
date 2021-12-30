const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
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

    req.user = findUser;

    next();
  } catch (error) {
    return res.status(400).send({ error: [{ msg: "not verified", error }] });
  }
};

module.exports = isAuth;
