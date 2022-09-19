const operationController = require('../controller/operation.controller');


const router = require('express').Router();


router.get('/latelogin', operationController.lateLogin);
router.get('/accidents',operationController.accidentList);
module.exports = router;