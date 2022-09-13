const router = require('express').Router();
const useHeader = require('../middlewares/useHeader');
const auth = require('./auth');
const accounts = require('./accounts');
const driver = require('./driver');
const { uploadFile } = require('../helpers/aws');

router.use(useHeader);

router.use('/auth', auth);
router.use('/accounts', accounts);
router.use('/driver', driver);
router.post('/uploadFile', async (req, res)=> res.status(201).json({location: await uploadFile(req.files.file)}))

module.exports = router;
