const app = require('./app');
const config = require('./config');
const redisClient = require('./helpers/redisClient');

async function main() {
  await config.appConfig();
  await redisClient.ping();
  console.log('redis connected');
  app.listen(3001);
  return true;
}

main()
  .then(() => console.log('Server is running at http://localhost:3001'))
  .catch(console.error);
