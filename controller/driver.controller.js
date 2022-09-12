const driverService = require('../services/driver.service');
const error = require("../middlewares/error")

module.exports = {
  findAll: async (req, res, next) => {
    const { errorMsgs: { notFound } } = error;
    try {
      const data = await driverService.findAll();
      res.status(200).json(data);
    } catch (err) {
        next({
          status: notFound[err.msg].status,
          msg: notFound[err.msg].msg,
        });
    }
  },
  findOne: async (req, res) => {
    const { staffId } = req.params;
    try {
      const data = await driverService.findOne({ staffId });
      res.status(200).json(data);
    } catch (err) {
        next({
          status: notFound[err.msg].status,
          msg: notFound[err.msg].msg,
        });
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
        const driver = await driverService.updateOne(parseInt(req.params.staffId), req.body)
        return res.status(202).json(driver);
    } catch (error) {
        return res.status(400).send(formatError(error));
    }
  },
  deleteOne: async (req, res) => {
    try {
        const delDriver = await driverService.deleteOne(parseInt(req.params.staffId))
        return res.json(delDriver);
    } catch (error) {
        return res.status(400).send(formatError(error));
    }
  }
}