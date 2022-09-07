const router = require('express').Router();
const useHeader = require('../middlewares/useHeader');
const auth = require('./auth');
const accounts = require('./accounts');

router.use(useHeader);

router.use('/auth', auth);
router.use('/accounts', accounts);

module.exports = router;
