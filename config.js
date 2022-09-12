const { configModel } = require('./model');

const {
  NODE_ENV,
  MAX_REDIS_RETRY,
  MAX_MONGO_RETRY,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_PREFIX,
  SMS_HOST,
  SMS_API_KEY,
  JWT_SECRET,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASS,
  DRIVER_API_URL,
  DRIVER_OUTSTANDING_API_KEY,
  DRIVER_COLLECTION_API_KEY,
  DRIVER_X_API_KEY
} = process.env;

module.exports = {
  config: {
    isDevelopment: NODE_ENV === 'dev',
    MAX_REDIS_RETRY,
    MAX_MONGO_RETRY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    REDIS_PREFIX,
    SMS_HOST,
    SMS_API_KEY,
    JWT_SECRET,
    MONGO_URL,
    DRIVER_API_URL,
    DRIVER_OUTSTANDING_API_KEY,
    DRIVER_COLLECTION_API_KEY,
    DRIVER_X_API_KEY,
    mongodbOptions: {
      user: MONGO_USER,
      pass: MONGO_PASS
    }
  },

  appConfig: async function () {
    const configData = await configModel.find({ __v : 0 }).lean();
    Object.assign(this.config, configData);
  },
};
