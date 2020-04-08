const redis = require("redis");
const config = require("../config");

let redisClient = undefined;

module.exports = {
  // create and connect redis client to local instance.
  init: function() {
    return new Promise((resolve, reject) => {
      redisClient = redis.createClient({
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
  },

  // Quit the redis connection
  quit: function() {
    return new Promise((resolve, reject) => {
      redisClient.quit((err, reply) => {
        console.log("Redis client quitted");
        return resolve();
      });
    });
  },

  // setting value with key in redis with a configured timeout
  setValue: function(key, value = "") {
    return new Promise((resolve, reject) =>
      redisClient.set(key, value, "EX", config.redisTimeout, (err, reply) =>
        err ? reject(err) : resolve(reply)
      )
    );
  },

  // getting value by using the key
  getValue: function(key) {
    return new Promise((resolve, reject) =>
      redisClient.get(key, (err, reply) => (err ? reject(err) : resolve(reply)))
    );
  },

  // deleting value
  deleteValue: function(key) {
    return new Promise((resolve, reject) =>
      redisClient.del(key, (err, reply) => (err ? reject(err) : resolve(reply)))
    );
  },

  checkKeyExist: function(key) {
    return new Promise((resolve, reject) =>
      redisClient.exists(key, (err, reply) =>
        err ? reject(err) : resolve(reply)
      )
    );
  }
};
