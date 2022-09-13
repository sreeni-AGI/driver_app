const axios = require("axios");
const { config } = require("../config");
const { getDriverHeader } = require("../helpers/utils");


module.exports = {
  accountType: {
    COLLECTION: "/collections/",
    OUTSTANDING: "/outstandings/"
  },
  getCollection: function(date, driverId) {
    const collectionPayload = {
      params: { "driver-id":driverId, "collection-date":date },
    };
    return axios.get(
      config.DRIVER_API_URL + this.accountType.COLLECTION,
      collectionPayload,
      config.mgwConfig
    );
  },
  getOutstanding: function(driverId) {
    return axios.post(
      config.DRIVER_API_URL + this.accountType.OUTSTANDING, { driverId },
      config.mgwConfig
    );
  },
};
