const redis = require("redis");
const config = require("../config");

let redisClient = undefined;

const onError = err => {
  console.log(`Redis Error: ${err}`);
  throw err;
};

const init = () =>
  new Promise((resolve, reject) => {
    redisClient = redis.createClient({
      host: config.redis_host,
      port: 6379
    });
    redisClient.auth(config.redis_password);
    redisClient.on("connect", res => {
      console.log(`Redis is successfully connected`);
      this.redisClient = redisClient;
      return resolve(this.redisClient);
    });
    redisClient.on("error", onError);
  });

const quit = () =>
  new Promise((resolve, reject) => {
    redisClient.quit((err, reply) => {
      console.log("Redis client quitted");
      return resolve();
    });
  });

const setValue = (key, value = "") =>
  new Promise((resolve, reject) =>
    redisClient.set(key, value, "EX", config.redisTimeout, (err, reply) =>
      err ? reject(err) : resolve(reply)
    )
  );

const getValue = key =>
  new Promise((resolve, reject) =>
    redisClient.get(key, (err, reply) => (err ? reject(err) : resolve(reply)))
  );

const deleteValue = key =>
  new Promise((resolve, reject) =>
    redisClient.del(key, (err, reply) => (err ? reject(err) : resolve(reply)))
  );

const getAndDeleteValue = async key => {
  const value = await getValue(key);
  await deleteValue(key);
  return value;
};

const checkKeyExist = key =>
  new Promise((resolve, reject) =>
    redisClient.exists(key, (err, reply) =>
      err ? reject(err) : resolve(reply)
    )
  );

module.exports = {
  init,
  quit,
  setValue,
  getValue,
  deleteValue,
  getAndDeleteValue,
  checkKeyExist
};
