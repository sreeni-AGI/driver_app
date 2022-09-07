require('dotenv').config();
const config = require('./config');
const redisClient = require('./helpers/redisClient');
const useDb = require('./helpers/useDb');
const logger = require('./middlewares/logger');

async function main() {
  await config.appConfig();
  await redisClient.ping();
  console.log('redis connected');
  await useDb;
  console.log('mongodb connected');
  await logger.connect();
  console.log('Mongo Logger Connected');
  const app = require('./app');
  app.listen(3001);
  return true;
}

main()
  .then(() => console.log('Server is running at http://localhost:3001'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
