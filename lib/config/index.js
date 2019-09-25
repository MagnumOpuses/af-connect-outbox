// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT || 8100,
  redisTimeout: 300
};
