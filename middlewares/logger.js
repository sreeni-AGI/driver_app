const expressWinston = require('express-winston');
const winston = require('winston');
require('winston-mongodb').MongoDB;
const MongoTransport = (db, collection) =>
  new winston.transports.MongoDB({
    db,
    collection,
    metaKey: 'meta',
    handleExceptions: true
  });

const routerLogger = (db, collection) =>
  expressWinston.logger({
    transports: [MongoTransport(db, collection)],
    format: winston.format.json(),
    statusLevels: true,
    requestWhitelist: [
      'url',
      'headers',
      'method',
      'body',
      'originalUrl',
      'query',
    ],
    responseWhitelist: ['_headers', 'statusCode', 'body', 'responseTime'],
    headerBlacklist: ['connection'],
  });

const errorLogger = (db, collection) => expressWinston.errorLogger({
  transports: [MongoTransport(db, collection)],
  format: winston.format.json(),
  dumpExceptions: true,
  showStack: true,
});

module.exports = {
  routerLogger,
  errorLogger
};
