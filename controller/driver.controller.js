const driverService = require('../services/driver.service');

module.exports = {
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