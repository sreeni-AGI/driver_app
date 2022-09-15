const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError, languageMapper } = require('../helpers/utils');
const driverService = require('../services/driver.service');
const smsService = require('../services/sms.service');
const client = require('../helpers/redisClient');
const constant = require('../helpers/constant');

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
      let otp = await client.get(config.REDIS_PREFIX + constant.OTP + req.body.staffId);
      if (!otp || config.isDevelopment) {
        otp = config.isDevelopment ? 123456 : _.random(9999, 99999);
        await client.set(
          config.REDIS_PREFIX+ constant.OTP + req.body.staffId,
          otp,
          'ex',
          300
        );
      }
      
      const toSend = _.template(languageMapper(config.otp.sms, req.language))({ otp });
      const isSent = config.isDevelopment || await smsService.send(driver.mobileNumber.toString(), toSend);
      if (isSent)
        return res.json({
          msg: _.template(languageMapper(config.otp.client, req.language))({
            mobileLast4digit: driver.mobileNumber.toString().slice(-4),
          }),
        });
    } catch (error) {
      return res.status(400).json(formatError(error));
    }
  },
  verifyOtp: async (req, res) => {
    try {
      let isVerified = await client.get(config.REDIS_PREFIX + constant.OTP + req.body.staffId) || false;
      isVerified = isVerified == req.body.OTP;
      if (!isVerified) throw {message: languageMapper(config.otp.wrongOtp, req.language)};
      
      const tokenData = { staffId: req.body.staffId};
      const toSend = {
        accessToken: jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '1d' }),
        refreshToken: jwt.sign(tokenData, config.JWT_SECRET, {
          expiresIn: '14d',
        })
      }
      Object.assign(toSend, await driverService.findOne(
        { 'staffId': parseInt(req.body.staffId) },
        { _id: 0, rtaId: 1, mobileNumber: 1, name: 1, emailId:1, careemId:1, national:1, location: 1,  }
      ))    
      client.del(config.REDIS_PREFIX + constant.OTP + req.body.staffId)
      return res.json(toSend);
    } catch (error) {
      return res.status(400).json(formatError(error))
    }
  },
};
