const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
  check("email", "email is required").isEmail(),
  check("password", "password is too short").isLength({ min: 6 }),
  // check("name", "name is required").notEmpty(),
  check("username", "user name is required").notEmpty(),
  // check("birthday", "your underaged").isInt({ min: 3 }),
];

exports.loginValidation = () => [
  check("userInput", "email or user name is required").notEmpty(),
  check("password", "password is required").notEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
