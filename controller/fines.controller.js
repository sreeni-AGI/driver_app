const finesService = require('../services/fines.service');

module.exports = {
  getFines: async (req, res) => {
    try {
      const result = await finesService.getFines(req.params.staffId);
      return res.json(result.data.Messages) 
    } catch (error) {
      return res.status(400).json({ msg: formatError(error) });
    }
  }
};
