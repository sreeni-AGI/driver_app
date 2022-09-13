const axios = require('axios');
const { config } = require('../config');
const { smsPayload } = require('../helpers/utils');
const logger = require('../middlewares/logger');

module.exports = {
  send: async (mobileNumber, msg) => {
    // const data = await axios.post(config.SMS_HOST, smsPayload(mobileNumber, msg), {
    //   headers: {
    //     'x-api-key': config.SMS_API_KEY,
    //   },
    // });
    logger.customEvent('sendSms', {name:'roshan'});
    return true;
  },
};
