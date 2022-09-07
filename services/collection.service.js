const axios = require('axios');
const { collection } = require('../controller/account.controller');
const { config } = require('../config');

module.exports = {
        getdetails: (date, driverId) => {
          const collectionPayload = {
            params: {driverId, date}
          }
          return axios.post(config.DRIVER_API_URL+"/Collections/Collections/", collectionPayload, {
              headers: {
                'x-api-key': config.DRIVER_API_KEY,
              },
            })
          }  
}