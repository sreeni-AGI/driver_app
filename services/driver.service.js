const mongoose = require('mongoose');

module.exports = {
  details: async (filter, projection = {}) => {
    return mongoose.connection.db
      .collection('drivers')
      .findOne(filter, { projection });
  },
};
