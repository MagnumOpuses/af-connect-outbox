const { check, param, query, body } = require("express-validator/check");

exports.storeValue = [
  check("token")
    .exists()
    .withMessage("Missing param")
    .isString()
    .withMessage("Must be of type string")
];

exports.getValue = [
  query("sessionToken")
    .exists()
    .withMessage("Missing param")
    .isString()
    .withMessage("Must be of type string")
];
