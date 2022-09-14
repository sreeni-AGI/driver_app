
const { formatError } = require('../helpers/utils');
const { config } = require('../config');
const operationService = require('../services/operation.service');
const client = require('../helpers/redisClient');
const { LATELOGIN } = require('../helpers/constant');

module.exports = {
    lateLogin: async (req, res) => {
      try { 
      const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) (0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/;
      if (!dateTimeRegex.test(req.query.loginDateTime) ) throw {message:'Incorrect Date'};
      let isLateLogonResp = await client.get(config.REDIS_PREFIX+LATELOGIN + req.staffId);
      if(isLateLogonResp) return res.json(JSON.parse(isLateLogonResp));      
        const {data:lateLoginResp} = await operationService.checkLateLogin(
          (req.query.loginDateTime,
            req.staffId
          ))
          await client.set(
            config.REDIS_PREFIX+ LATELOGIN + req.staffId,
            JSON.stringify(lateLoginResp),
            'ex',
            500
          );         
        return res.json(lateLoginResp);     
      } catch(error){
        return res.status(400).json({msg: formatError(error)})
      }
    }
}