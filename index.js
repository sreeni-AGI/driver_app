const app = require('./app');
const config = require('./config');
const redisClient = require('./helpers/redisClient');
const useDb = require('./helpers/useDb');

async function main() {
  await config.appConfig();
  await redisClient.ping();
  console.log('redis connected');
  await useDb;
  console.log('mongodb connected');
  app.listen(3001);
  return true;
}

main()
  .then(() => console.log('Server is running at http://localhost:3001'))
  .catch(console.error);
