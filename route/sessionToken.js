const redis = require('../lib/redis');

module.exports = (req, res) => {
    const token = req.body.token;
    console.log(`from inside sessionToken module ${token}`);

    redis.setKey(token, "value1").then(
        r => console.log(r),
        err => console.log(err)
    )
    // redis.getValue(token);
}