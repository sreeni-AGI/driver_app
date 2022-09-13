const axios = require('axios');
const { config } = require('../config');

module.exports = {
  accountType: {
    COLLECTION: '/Collections/Collections/',
    OUTSTANDING: '/Outstanding/Outstanding/'
  },
  getCollection: function(date, driverId) {
    const collectionPayload = {
      params: { driverId, date },
    };
    return axios.post(
      config.DRIVER_API_URL + this.accountType.COLLECTION,
      collectionPayload,
      {
        headers: {
          "x-api-key": config.DRIVER_COLLECTION_API_KEY,
        },
      }
    );
  },
  getOutstanding: function(driverId) {
    return axios.post(
      config.DRIVER_API_URL + this.accountType.OUTSTANDING, { driverId },
      {
        headers: {
          "x-api-key": config.DRIVER_OUTSTANDING_API_KEY
        },
      }
    );
  },
};
