const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const collectionService = require('../services/collection.service');
const client = require('../helpers/redisClient');

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
      const collectiondDetails = await collectionService.getdetails(collectionDate, driverId);
      if (!collectiondDetails)
        return res
          .status(404)
          .json({ msg: 'Collection Details not found' });
      return res.json(collectiondDetails.data);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
};