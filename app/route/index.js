const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validation.middleware");

const mainValidator = require("../validator/main.validator");
const { storeValue, getValue } = require("../controllers/main.controller");

// define the home page route
router.get("/", (req, res) => res.send(`AF-connect-outbox is alive`));

// define the register session token route
router.post("/store", [mainValidator.storeValue, validate], storeValue);

// define the get the envelop using the sessiontoken
router.get(
  "/envelop?:sessionToken",
  [mainValidator.getValue, validate],
  getValue
);

module.exports = router;
