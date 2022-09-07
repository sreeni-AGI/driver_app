const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { routerLogger } = require('./middlewares/logger');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use(routerLogger(mongoose.connection, 'routeLog'));

app.use('/api', require('./routes'));

app.get('/', (req, res) => res.send('BFF for car and taxi'));

app.use(routerLogger(mongoose.connection, 'errorLog'));

module.exports = app;
