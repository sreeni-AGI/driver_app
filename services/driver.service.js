const { driverModel } = require("../model/driver.model");

module.exports = {
  findAll: () => { 
    const result = driverModel.find();
    if(result) {
      return result;
    } else {
      throw new Error("notFound");
    }
  },
  findOne: (filter, projection = {}) => { 
    const result = driverModel.findOne(filter, projection).lean();
    if(result) {
      return result;
    } else {
      throw new Error("notFound");
    }
  },
  create: driverData => driverModel.create(driverData),
  updateOne: (staffId, driverData) => driverModel.replaceOne({ staffId }, driverData),
  deleteOne: staffId => driverModel.updateOne({ staffId }, { $set: { isDeleted: true } })
};
