const accountController = require('../controller/account.controller');

const router = require('express').Router();

router.post('/collections', accountController.collection);
router.post('/outstanding', accountController.outstanding);

module.exports = router;