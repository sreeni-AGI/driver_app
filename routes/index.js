const router = require('express').Router();
const useHeader = require('../middlewares/useHeader');
const { uploadFile } = require('../helpers/aws');
const { formatError } = require('../helpers/utils');
const auth = require('./auth');
const accounts = require('./accounts');
const driver = require('./driver');
const accident = require('./accident');


router.use(useHeader);

router.post('/uploadFile', async (req, res)=> {
    try {
        return res.status(201).json({location: await uploadFile(req.files.file)})
    } catch (error) {
        return res.status(400).json({msg: formatError(error)})
    }
})
router.use('/auth', auth);
router.use('/accounts', accounts);
router.use('/driver', driver);
router.use('/accident', accident)


module.exports = router;
