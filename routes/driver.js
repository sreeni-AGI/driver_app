const driverController = require('../controller/driver.controller');
const usePublic = require('../middlewares/usePublic');
const router = require('express').Router();

router.use(usePublic);

router.get('/', driverController.find);
router.get('/:staffId', driverController.findOne);
router.post('/', driverController.create);
router.put('/:staffId', driverController.updateOne);
router.delete('/:staffId', driverController.deleteOne);

module.exports = router;
