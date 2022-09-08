const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const client = require('../helpers/redisClient');
const accountService = require('../services/account.service');

module.exports = {
  collection: async (req, res) => {
    try {
      const collectionDate = req.body.collectionDate;
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (collectionDate.match(regex) === null)
        return res
          .status(404)
          .json({ msg: 'Incorrect Date format' });
      const driverId = req.driverId;
      const collectionDetails = await accountService.getCollection(collectionDate, driverId);
      if (!collectionDetails)
        return res
          .status(404)
          .json({ msg: 'Collection Details not found' });
      return res.json(collectionDetails.data);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  outstanding: async (req, res) => {
    try {
      const { data: outstandingDetails } = await accountService.getOutstanding(req.driverId);
      if (!outstandingDetails)
        return res
          .status(404)
          .json({ msg: 'Outstanding details not found' });
      return res.json(outstandingDetails);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
};