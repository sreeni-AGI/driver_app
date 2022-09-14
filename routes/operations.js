const operationController = require('../controller/operation.controller');


const router = require('express').Router();


router.get('/latelogin', operationController.lateLogin);

module.exports = router;