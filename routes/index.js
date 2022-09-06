const router = require('express').Router();
const useHeader = require('../middlewares/useHeader');
const auth = require('./auth');

router.use(useHeader);

router.use('/auth', auth);

module.exports = router;
