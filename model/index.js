const mongoose = require('mongoose');
const { driverSchema } = require('./driver.schema');

module.exports = {
    driverModel: mongoose.model('drivernew', driverSchema)
}