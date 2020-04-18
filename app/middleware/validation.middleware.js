const { validationResult } = require("express-validator");

exports.validate = function(req, res, next) {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(422).json({ errors: errors.array() });
};
