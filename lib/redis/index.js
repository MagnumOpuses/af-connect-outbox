const redis = require('redis');
const {promisify} = require('util');


// create and connect redis client to local instance.

const redisClient = redis.createClient();

// const setKey = (key, value, callback) => setAsync()
// const getValue = key => redisClient.get(key, redis.print);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setex).bind(redisClient);

const setKey = (key, value) => new Promise(
    (resolve, reject) => redisClient.set(key, value, 'EX', 100, (err, res) => (err) ? reject(err): resolve(res))
);


const getValue = key => getAsync

module.exports = {
    redisClient,
    setKey,
    getValue
}

