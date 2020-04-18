// config.js
const dotenv = require("dotenv");
const parsedConfig = dotenv.config();

module.exports = {
  healthPort: parsedConfig.HEALTH_PORT || process.env.HEALTH_PORT || 9802,
  port: parsedConfig.PORT || process.env.PORT || 8100,
  redisTimeout: 300,
  redis_host: parsedConfig.REDIS_HOST || process.env.REDIS_HOST || "redis-db"
};
