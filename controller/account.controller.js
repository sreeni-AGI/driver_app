const { formatError } = require('../helpers/utils');
const collectionService = require('../services/collection.service');

module.exports = {
  collection: async (req, res) => {
    try {
      const collectionDate = req.body.collectionDate;
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (!collectionDate.match(regex))
        return res
          .status(404)
          .json({ msg: 'Incorrect Date format' });      
      const {data: collectiondDetails} = await collectionService.getdetails(collectionDate, req.staffId);
      if (!collectiondDetails)
        return res
          .status(404)
          .json({ msg: 'Collection Details not found' });
      return res.json(collectiondDetails);
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
};