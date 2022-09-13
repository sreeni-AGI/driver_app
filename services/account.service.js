const axios = require('axios');
const { config } = require('../config');
const { formatQuery } = require('../helpers/utils');

module.exports = {
  accountType: {
    COLLECTION: '/collections',
    OUTSTANDING: '/outstandings',
  },
  getCollection: function (date, driverId) {
    const uri = config.DRIVER_API_URL + this.accountType.COLLECTION + formatQuery({ 'driver-id': driverId, 'collection-date': date })
    return axios.get(
      uri,
      config.mgwConfig
    );
  },
  getOutstanding: function (driverId) {
    return axios.get(
      config.DRIVER_API_URL + this.accountType.OUTSTANDING + formatQuery({'driver-id': driverId}),
      config.mgwConfig
    );
  },
};
