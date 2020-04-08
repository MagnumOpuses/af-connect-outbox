const redis = require("redis");
const config = require("../config");

module.exports = function(opts) {
  this.redisClient = undefined;

  // create and connect redis client to local instance.
  this.init = function() {
    return new Promise((resolve, reject) => {
      const redisClient = redis.createClient({
        host: config.redis_host,
        port: 6379
      });

      redisClient.on("connect", res => {
        console.log(`Redis is successfully connected`);
        this.redisClient = redisClient;
        return resolve();
      });

      redisClient.on("error", err => {
        console.log(`Redis Error: ${err}`);
        return reject();
      });
    });
  };

  // setting value with key in redis with a configured timeout
  this.setValue = function(key, value = "") {
    return new Promise((resolve, reject) =>
      this.redisClient.set(
        key,
        value,
        "EX",
        config.redisTimeout,
        (err, reply) => (err ? reject(err) : resolve(reply))
      )
    );
  };

  // getting value by using the key
  this.getValue = function(key) {
    return new Promise((resolve, reject) =>
      this.redisClient.get(key, (err, reply) =>
        err ? reject(err) : resolve(reply)
      )
    );
  };

  // deleting value
  this.deleteValue = function(key) {
    return new Promise((resolve, reject) =>
      this.redisClient.del(key, (err, reply) =>
        err ? reject(err) : resolve(reply)
      )
    );
  };

  this.checkKeyExist = function(key) {
    return new Promise((resolve, reject) =>
      this.redisClient.exists(key, (err, reply) =>
        err ? reject(err) : resolve(reply)
      )
    );
  };
};
