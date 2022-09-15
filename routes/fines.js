const finesController = require('../controller/fines.controller');
const router = require('express').Router();

router.get('/:staffId', finesController.getFines);

module.exports = router;
