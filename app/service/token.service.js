const redisClient = require("../lib/redis");

const write = async (token, value) => {
  return (await redisClient.setValue(token, value)) === "OK";
};

const read = async token => {
  if (await redisClient.checkKeyExist(token)) {
    const value = await redisClient.getValue(token);
    await redisClient.deleteValue(token);
    return value;
  } else {
    return false;
  }
};

module.exports = {
  write,
  read
};
