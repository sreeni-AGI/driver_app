const accountController = require('../controller/account.controller');

const router = require('express').Router();

router.post('/collections',accountController.collection);

module.exports = router;