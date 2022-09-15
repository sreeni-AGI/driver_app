const Redis = require('ioredis');
const { config } = require('../config');

const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
  retryStrategy(times) {
    if (times === parseInt(config.MAX_REDIS_RETRY)) {
      return false;
    }
    return Math.min(times * 50, 2000);
  },
  reconnectOnError(err) {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      // Only reconnect when the error contains "READONLY"
      return true; // or `return 1;`
    }
  },
});

module.exports = redisClient;
