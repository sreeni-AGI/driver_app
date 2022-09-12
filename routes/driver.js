const driverController = require('../controller/driver.controller');
const router = require('express').Router();

router.get('/', driverController.findAll);
router.get('/:id', driverController.findOne);
router.post('/', driverController.create);
router.put('/:staffId', driverController.updateOne);
router.delete('/:staffId', driverController.deleteOne);

module.exports = router;
