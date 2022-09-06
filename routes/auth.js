const authController = require('../controller/auth.controller');

const router = require('express').Router();


router.post('/send', authController.send);
router.post('/verify', authController.verify);


module.exports = router;