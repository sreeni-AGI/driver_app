const driverModel = require("../model/driver.model");
module.exports = {
  findOne: (filter, projection = {}) => driverModel.findOne(filter, projection),
  create: driverData => driverModel.create(driverData),
  updateOne: (staffId, driverData) => driverModel.replaceOne({ staffId }, driverData),
  deleteOne: staffId => driverModel.updateOne({ staffId }, { $set: { isDeleted: true } })
};
