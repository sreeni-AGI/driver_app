const Redis = require('ioredis');

        const redisClient = new Redis({
        host: 'redis-18809.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18809,
        password: 'OZGV3IeQNpWb9bHWj2TDA16tYAt3w63d',
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        
      });

module.exports = redisClient;
