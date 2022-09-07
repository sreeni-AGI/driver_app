const { MongoClient } = require('mongodb');
const expressWinston = require('express-winston');
const winston = require('winston');
require('winston-mongodb').MongoDB;

module.exports = function (db, option, name) {
  return {
    connect: async () => {
      if (typeof db === 'string') {
        const parseUri = new URL(db);
        if(option.user) parseUri.username = option.user;
        if(option.pass) parseUri.password = option.pass;
        parseUri.pathname = option.dbName || 'appLog'
        db = parseUri.href;
        const client = new MongoClient(parseUri.href, {useUnifiedTopology: true});
        await client.connect();
        db = client.db(parseUri.pathname.slice(1));
        return true
      }
    },
    mongoTransport: (collection) => {
      return new winston.transports.MongoDB({
        db,
        name,
        collection,
        metaKey: 'meta',
        handleExceptions: true,
      });
    },
    routerLogger: function () {
      return expressWinston.logger({
        transports: [this.mongoTransport('route')],
        format: winston.format.json(),
        statusLevels: true,
        msg:'{{req.method}} {{req.url}}',
        requestWhitelist: [
          'url',
          'headers',
          'method',
          'body',
          'query',
        ],
        responseWhitelist: ['_headers', 'statusCode', 'body', 'responseTime'],
        headerBlacklist: ['connection'],
      });
    },
    errorLogger: function () {
      return expressWinston.errorLogger({
        transports: [this.mongoTransport('error')],
        format: winston.format.json(),
        dumpExceptions: true,
        showStack: true,
      });
    },
    customEvent: async (eventName, data) => {
      return (
        await db
          .collection('customEvents')
          .insertOne({ timestamp: new Date(), ...data, eventName, name })
      ).acknowledged;
    },
  };
};
