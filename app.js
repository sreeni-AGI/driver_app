const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { routerLogger, errorLogger } = require('./middlewares/logger');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const useReqResLog = require("./middlewares/useReqResLog");

app.use(cors());
app.use(express.json());
app.use(useReqResLog);

app.use(routerLogger(mongoose.connection, 'routeLog'));

app.use('/api', require('./routes'));

app.get('/', (req, res) => res.send('BFF for car and taxi'));

app.use(errorLogger(mongoose.connection, 'errorLog'));

module.exports = app;
