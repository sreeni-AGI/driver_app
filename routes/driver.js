// CRUD


// take projection mind


// ger /docs  => roshan
//get / => collins
// get /:id = colins
// post /  => tanzeel
// put /:id => tanzeel
//patch /:id   => roshan

//delete /:id => tanzeel


const driverController = require('../controller/driver.controller');

const router = require('express').Router();

router.post('/', driverController.create);
router.put('/:staffId', driverController.updateOne);
router.delete('/:staffId', driverController.deleteOne);

module.exports = router;
