const driverController = require('../controller/driver.controller');
const router = require('express').Router();

router.get('/', driverController.find);
router.get('/:staffId', driverController.findOne);
router.post('/', driverController.create);
router.put('/:staffId', driverController.updateOne);
router.delete('/:staffId', driverController.deleteOne);

module.exports = router;
