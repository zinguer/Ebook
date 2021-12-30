const { check, validationResult } = require("express-validator");

exports.addValidation = () => [
  check("name", "name is required"), //.notEmpty()
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
