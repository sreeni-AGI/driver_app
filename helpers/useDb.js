const mongoose = require('mongoose');
const {config: {MONGO_URL}} = require('../config');
const db = mongoose.connection;
if(!db.readyState){
  mongoose.connect(MONGO_URL);
}

module.exports = new Promise((resolve, reject) => {
  //for successful connection
  db.once('open', () => resolve(db));
  //for error in connection
  db.on('error', reject);
});