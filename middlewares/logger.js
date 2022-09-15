const { config } = require('../config');
const mongoLogger = require('../helpers/mongoLogger');
const mongoLogUri =config.MONGO_URL ;

module.exports = mongoLogger(mongoLogUri, config.mongodbOptions, 'driver');
