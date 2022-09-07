const {
  MAX_REDIS_RETRY,
  MAX_MONGO_RETRY,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_PRIFIX,
  SMS_HOST,
  SMS_API_KEY,
  JWT_SECRET,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASS,
  DRIVER_API_URL,
  DRIVER_API_KEY
} = process.env;

module.exports = {
  config: {
    MAX_REDIS_RETRY,
    MAX_MONGO_RETRY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    REDIS_PRIFIX,
    SMS_HOST,
    SMS_API_KEY,
    JWT_SECRET,
    MONGO_URL,
    DRIVER_API_URL,
    DRIVER_API_KEY,
    mongodbOptions: {
      user:MONGO_USER,
      pass: MONGO_PASS
    }
  },
  appConfig: async function () {
    Object.assign(this.config, {
      otp: {
        sms: {
          EN: 'OTP for car taxi app login is ${OTP}',
        },
        client: {
          EN: 'Enter the OTP which is send to your registered mobile number *****${mobileLast4digit}',
        },
        wrongOtp: {
          EN: 'OTP Mismatch, Try Again',
        },
      },
    });
  },
};
