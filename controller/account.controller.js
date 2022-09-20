const { formatError } = require('../helpers/utils');
const accountService = require('../services/account.service');

module.exports = {
  collection: async (req, res) => {
    try {
      const collectionDate = req.query.collectionDate;
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (!collectionDate.match(regex))
        return res.status(404).json({ message: 'Incorrect Date format' });
      const { data: collectionDetails } = await accountService.getCollection(
        collectionDate,
        req.staffId
      );
      return res.json(collectionDetails);
    } catch (error) {
      return res.status(400).json(formatError(error));
    }
  },
  outstanding: async (req, res) => {
    try {
      const { data: outstandingDetails } = await accountService.getOutstanding(req.staffId);
      return res.json(outstandingDetails);
    } catch (error) {
      return res.status(400).json(formatError(error));
    }
  },
};
