const redisClient = require("../lib/redis");

exports.write = async (token, value) =>
  (await redisClient.setValue(token, value)) === "OK";

exports.read = async token =>
  (await redisClient.checkKeyExist(token))
    ? await redisClient.getAndDeleteValue(token)
    : false;
