const axios = require('axios');
const { config } = require('../config');
const { formatQuery } = require('../helpers/utils');

module.exports = {
  FINES_ENQ: '/fine-enquiry',
  getFines: function(driverId) {
    const uri =
      config.FINES_ENQUIRY_API_URL +
      this.FINES_ENQ +
      formatQuery({ 'driver-id': driverId });
    return axios.get(uri, config.mgwConfig);
  },
};
