const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const collectionService = require('../services/collection.service');
const client = require('../helpers/redisClient');

module.exports = {
    collection: async (req, res) => {
      try {        
        const collectionDate = req.body.date;

        const token = req.headers.authorization;
        if(token){
        const decode = jwt.verify(token, config.JWT_SECRET);
        
        res.json({
            login: true,
            data: decode
        });
        }else{
    
            // Return response with error
            res.json({
                login: false,
                data: 'error'
            });
        }

          
      } catch(error){
        return res.status(400).send(formatError(error));
      }
    }
};