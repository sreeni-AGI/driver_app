const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { driverSchema } = require('./driver.schema');

module.exports = {
  driverModel: model('drivernew', driverSchema),
  configModel: model(
    'config',
    new Schema({}, { collection: 'config', strict: false })
  ),
};
