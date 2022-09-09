const driverController = require('../controller/driver.controller');
const router = require('express').Router();

router.post('/', driverController.create);
router.put('/:staffId', driverController.updateOne);
router.delete('/:staffId', driverController.deleteOne);

module.exports = router;
