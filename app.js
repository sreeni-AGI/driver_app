const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const utils = require('./helpers/utils');
const { driverSchemaRule } = require('./model/driver.model');
const app = express();
const error = require("./middlewares/error");

app.use(cors());
app.use(express.json());

app.use(logger.routerLogger());

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
  const toSend = {
    version: 1.0,
    baseEndPoint: '/api',
    driver: {
      path: '/driver',
      protected: 'x-api-key',
      methods: {
        get: ['/', '/:staffId'],
        post: ['/'],
        put: ['/:staffId'],
        patch: ['/:staffId'],
        delete: ['/:staffId'],
      },
      query: ['filter', 'projection'],
      schema: utils.schemaDoc(driverSchemaRule),
    },
  };
  return res.json(toSend);
});

app.use(logger.errorLogger());
app.use(error.errorHandler);

module.exports = app;
