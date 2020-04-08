const { validationResult } = require("express-validator");

exports.validate = function(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    console.log("Validation error: ", errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
};
