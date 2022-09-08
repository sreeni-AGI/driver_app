const driverModel = require("../model/driver.model");
module.exports = {
  findOne: async (filter, projection = {}) => {
    Object.assign(filter, {isDeleted: false})
    return driverModel.findOne(filter, projection);
  },
};
