const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError, languageMapper } = require('../helpers/utils');
const driverService = require('../services/driver.service');
const smsService = require('../services/sms.service');
const client = require('../helpers/redisClient');

module.exports = {
  sendOtp: async (req, res) => {
    try {
      const driver = await driverService.findOne(
        { staffId: parseInt(req.body.staffId) },
        { mobileNumber: 1, _id: 0 }
      );
      if (!driver)
        return res
          .status(404)
          .json({ msg: 'No Driver Found with this Staff Id' });
      let OTP = await client.get(config.REDIS_PREFIX + req.body.staffId);
      if (!OTP || config.isDevelopment) {
        OTP = config.isDevelopment ? 123456 : _.random(9999, 99999);
        await client.set(
          config.REDIS_PREFIX + req.body.staffId,
          OTP,
          'ex',
          300
        );
      }
      
      const toSend = _.template(languageMapper(config.otp.sms, req.language))({ OTP });
      const isSent = config.isDevelopment || await smsService.send(driver.mobileNumber.toString(), toSend);
      if (isSent)
        return res.json({
          msg: _.template(languageMapper(config.otp.client, req.language))({
            mobileLast4digit: driver.mobileNumber.toString().slice(-4),
          }),
        });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  verifyOtp: async (req, res) => {
    let isVerified = await client.get(config.REDIS_PREFIX + req.body.staffId) || false;
    isVerified = isVerified == req.body.OTP;
    if (!isVerified) return res.status(400).json({ msg: languageMapper(config.otp.wrongOtp, req.language) });
    
    const tokenData = { staffId: req.body.staffId};
    const toSend = {
      accessToken: jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '1d' }),
      refreshToken: jwt.sign(tokenData, config.JWT_SECRET, {
        expiresIn: '14d',
      })
    }
    Object.assign(toSend, await driverService.findOne(
      { 'staffId': parseInt(req.body.staffId) },
      { _id: 0, mobileNumber: 1, name: 1, location: 1 }
    ))    
    client.del(config.REDIS_PREFIX + req.body.staffId)
    return res.json(toSend);
  },
};
