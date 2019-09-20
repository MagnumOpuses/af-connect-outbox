const redis = require('redis');
const config = require('../config');

// create and connect redis client to local instance.
const redisClient = redis.createClient({socket_keepalive: true});

redisClient.on('connect', res => console.log(`Redis is successfully connected`));

redisClient.on('error', err => console.log(`Redis Error: ${ err }`));

// setting value with key in redis with a configured timeout
const setValue = (key, value) => new Promise(
    (resolve, reject) => redisClient.set(key, value, 'EX', config.redisTimeout, (err, reply) => (err) ? reject(err): resolve(reply))
);

// getting value by using the key
const getValue = (key) => new Promise(
    (resolve, reject) => redisClient.get(key, (err, reply) => (err) ? reject(err): resolve(reply))
);

// deleting value
const deleteValue = (key) => new Promise(
    (resolve, reject) => redisClient.del(key, (err, reply) => (err) ? reject(err): resolve(reply))
);

module.exports = {
    setValue,
    getValue,
    deleteValue
};

