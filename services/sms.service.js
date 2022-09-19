const axios = require('axios');
const { config } = require('../config');
const { smsPayload } = require('../helpers/utils');

module.exports = {
  send: (mobileNumber, message) => {
    return axios.post(config.SMS_HOST, smsPayload(mobileNumber, message), {
      headers: {
        'x-api-key': config.SMS_API_KEY,
      },
    });
  },
};
