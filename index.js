const app = require('./app');
const config = require('./config');
const redisClient = require('./helpers/redisClient');
const useDb = require('./helpers/useDb');
const logger = require("./helpers/logger");

async function main() {
  await config.appConfig();
  await redisClient.ping();
  logger.info('redis connected');
  await useDb;
  logger.info('mongodb connected');
  app.listen(3001);
  return true; 
}

main()
  .then(() => logger.info('Server is running at http://localhost:3001'))
  .catch(logger.error);
