const redisClient = require('../lib/redis');

async function registerValue(req, res) {
    const token = req.body.token;
    let value = req.body.value;
    console.log(`value: ${value}`);

    if (!token) {
        console.error("token not present");
        return res.status(400).send({"status": 400, "message": "session token needed"});
    }

    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }

    try {
        let reply = await redisClient.setValue(token, value);
        console.log(reply);
        return res.status(200).send({"status": 200, "message": "Success"});
    } catch (err) {
        console.log(err);
        return res.status(500).send({"status": 500, "message": "Internal server error"});
    }
}

async function getValue(req, res) {
    const token = req.query.sessionToken;
    console.log("token value inside get: ", token)
    if (!token) {
        console.error("token not present");
        return res.status(400).send({"status": 400, "message": "session token needed"});
    }

    try {
        let value = await redisClient.getValue(token);
        let rep = await redisClient.deleteValue(token);
        console.log(value, rep);
        return res.status(200).send({"status": 200, "value": value});
    } catch (err) {
        console.log(err);
        return res.status(500).send({"status": 500, "message": "Internal server error"});
    }
}

module.exports = {
    registerValue,
    getValue
};