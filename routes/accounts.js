const accountController = require('../controller/account.controller');

const router = require('express').Router();

router.get('/collection', accountController.collection);
router.get('/outstanding', accountController.outstanding);

module.exports = router;