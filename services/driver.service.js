const { driverModel } = require("../model");
module.exports = {
  find: (filter, projection = {}) => driverModel.find(filter, projection).lean(),
  findOne: (filter, projection = {}) => driverModel.findOne(filter, projection).lean(),
  create: driverData => driverModel.create(driverData),
  updateOne: (staffId, driverData) => driverModel.replaceOne({ staffId }, driverData),
  deleteOne: staffId => driverModel.updateOne({ staffId }, { $set: { isDeleted: true } })
};

