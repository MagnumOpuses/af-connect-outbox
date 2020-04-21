const { read, write } = require("../service/token.service");

exports.storeValue = async (req, res) => {
  try {
    (await write(req.body.token, req.body.value))
      ? res.status(200).json({ message: "Success" })
      : res.status(400).json({ message: "Could not write value" });
  } catch (err) {
    console.log("Failed to store value: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getValue = async (req, res) => {
  try {
    const value = await read(req.query.sessionToken);
    value
      ? res.status(200).json({ value: value })
      : res.status(200).send({ value: "" });
  } catch (err) {
    console.log("Failed to get value: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
