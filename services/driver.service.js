const { driverModel } = require('../model');
module.exports = {
  find: (filter, projection = {}) =>
    driverModel.find(filter, projection).lean(),
  findOne: (filter, projection = {}) =>
    driverModel.findOne(filter, projection).lean(),
  create: (driverData) => driverModel.create(driverData),
  updateOne: async (staffId, driverData) => {
    const isUpdated = await driverModel.replaceOne({ staffId }, driverData, {
      runValidators: true,
    });
    if (!isUpdated.matchedCount) throw 'Driver Not Found';
    return isUpdated;
  },
  patchOne: (staffId, driverData) =>
    driverModel.updateOne({ staffId }, driverData, { runValidators: true }),
  deleteOne: (staffId) =>
    driverModel.updateOne({ staffId }, { $set: { isDeleted: true } }),
};
