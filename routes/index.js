const router = require('express').Router();
const useHeader = require('../middlewares/useHeader');
const auth = require('./auth');
const accounts = require('./accounts');
const driver = require('./driver');

router.use(useHeader);

router.use('/auth', auth);
router.use('/accounts', accounts);
router.use('/driver', driver);

module.exports = router;
