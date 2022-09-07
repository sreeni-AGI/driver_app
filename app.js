const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use(logger.routerLogger());

app.use('/api', require('./routes'));

app.get('/', (req, res) => res.send('BFF for car and taxi'));

app.use(logger.errorLogger());

module.exports = app;
