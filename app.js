const express = require('express');
const app = express();

app.get('/', (req,res) => res.send('BFF for car and taxi'));


module.exports = app;