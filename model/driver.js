const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('driver', driverSchema);
