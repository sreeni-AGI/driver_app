
const { formatError, eodTime } = require('../helpers/utils');
const { config } = require('../config');
const operationService = require('../services/operation.service');
const client = require('../helpers/redisClient');
const constant = require('../helpers/constant');

module.exports = {
    lateLogin: async (req, res) => {
      try { 
      const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) (0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/;
      if (!dateTimeRegex.test(req.query.loginDateTime) ) throw {message:'Incorrect Date'};
      const isLateLoginResp = await client.get(config.REDIS_PREFIX+ constant.LATE_LOGIN + req.staffId);
      if(isLateLoginResp) return res.json({message:'You have already logged in'});         
        const {data:lateLoginResp} = await operationService.checkLateLogin(
          req.query.loginDateTime,
            req.staffId
          );
          await client.set(
            config.REDIS_PREFIX+ constant.LATE_LOGIN + req.staffId,
            JSON.stringify(lateLoginResp),
            'ex',
            43200
          );         
        return res.json({message:'You have logged in successfully'});     
      } catch(error){
        return res.status(400).json({msg: formatError(error)})
      }
    }
}