const Redis = require("ioredis");
const { config } = require('../config/config');

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
});

redis.on("connect", () => console.log("Connected to Redis Cloud"));
redis.on("error", (err) => console.error("Error in Redis:", err));

module.exports = redis;
