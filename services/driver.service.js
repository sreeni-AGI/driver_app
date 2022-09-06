const driver = require("../model/driver");

module.exports = {
  details: async (filter, projection) => {
    return driver.findOne(filter, projection).lean();
  },
};
