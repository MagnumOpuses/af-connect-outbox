const tokenService = require("../service/token.service");

async function storeValue(req, res) {
  const token = req.body.token;

  let value = req.body.value;
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }

  try {
    const writeResult = await tokenService.write(token, value);
    if (writeResult) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(400).json({ message: "Could not write value" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getValue(req, res) {
  const token = req.query.sessionToken;
  if (!token) {
    console.error("token not present");
    return res.status(400).send({ message: "session token needed" });
  }

  try {
    const value = await tokenService.read(token);
    if (value) {
      return res.status(200).json({ value: value });
    } else {
      return res.status(200).send({ value: "" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  storeValue,
  getValue
};
