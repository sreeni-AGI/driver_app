const mongoose = require('mongoose');
const {
  config: { MONGO_URL, MAX_MONGO_RETRY, mongodbOptions },
} = require('../config');
const db = mongoose.connection;

function connect() {
  console.log('mongo connecting...');
  mongoose.connect(MONGO_URL, mongodbOptions).catch(err => console.error('Mongo error.....', err.toString(), err.code));
}

if (!db.readyState) connect();

let retry = MAX_MONGO_RETRY;

module.exports = new Promise((resolve, reject) => {
  //for successful connection
  db.once('open', () => resolve(db));
  //for error in connection
  db.on('error', (err) => {
    if (!['ECONNREFUSED'].includes(err.code)) retry = 0;
    else {
      retry = --retry;
      setTimeout(connect, 3000);
    }
    if (!retry) return reject(err.toString());
  });
});
