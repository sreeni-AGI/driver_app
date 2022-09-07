const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const logger = require("./helpers/logger");
const useReqResLog = require("./middlewares/useReqResLog");

app.use(cors());
app.use(express.json());
app.use(useReqResLog);
app.use((req, res, next) => {
    logger;
    next();
});

app.use('/api', require('./routes'));

app.get('/', (req, res) => res.send('BFF for car and taxi'));

module.exports = app; 
