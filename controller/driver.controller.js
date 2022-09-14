const driverService = require('../services/driver.service');

module.exports = {
  find: async (req, res) => {
    try {
      const data = await driverService.find(req.query.filter, req.query.projection);
      return res.json(data)
    } catch (error) {
      return res.status(400).send(formatError(error));
    }

  },
  findOne: async (req, res) => {
    try {
      const data = await driverService.findOne({"staffId":req.params.staffId}, req.query.projection);
      return res.json(data)
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  create: async (req, res) => {
    try {
      const driverResult = await driverService.create(req.body);
      return res.status(201).json(driverResult);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },

  updateOne: async (req, res) => {
    try {
      req.body.staffId = parseInt(req.params.staffId);
      const driver = await driverService.updateOne(
        req.body.staffId,
        req.body
      );
      return res.status(202).json(driver);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  patchOne: async(req, res)=>{
    try {
      const driver = await driverService.patchOne(
        parseInt(req.params.staffId),
        req.body
      );
      return res.status(202).json(driver);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  deleteOne: async (req, res) => {
    try {
      const delDriver = await driverService.deleteOne(
        parseInt(req.params.staffId)
      );
      return res.json(delDriver);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }  
};
