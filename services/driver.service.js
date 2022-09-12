const { driverModel } = require("../model/driver.model");
module.exports = {
  findOne: (filter, projection = {}) => driverModel.findOne(filter, projection).lean(),
  findOne: (filter, projection = {}) => driverModel.findOne(filter, projection).lean(),
  create: driverData => driverModel.create(driverData),
  updateOne: (staffId, driverData) => driverModel.replaceOne({ staffId }, driverData),
  deleteOne: staffId => driverModel.updateOne({ staffId }, { $set: { isDeleted: true } })
};
