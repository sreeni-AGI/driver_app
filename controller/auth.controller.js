const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const driverService = require('../services/driver.service');
const smsService = require('../services/sms.service');
const client = require('../helpers/redisClient');

module.exports = {
  sendOtp: async (req, res) => {
    try {
      const driver = await driverService.details(
        { 'STAFF NUMBER': parseInt(req.body.staffId) },
        { mobileNumber: '$Mobile', _id: 0, Mobile: 1 }
      );
      if (!driver)
        return res
          .status(404)
          .json({ msg: 'No Driver Found with this Staff Id' });
      let OTP = await client.get(config.REDIS_PRIFIX + req.body.staffId);
      if (!OTP) {
        OTP = _.random(9999, 99999);
        await client.set(
          config.REDIS_PRIFIX + req.body.staffId,
          OTP,
          'ex',
          300
        );
      }
      const toSend = _.template(config.otp.sms[req.language])({ OTP });
      const isSent = await smsService.send(driver.mobileNumber.toString(), toSend);
      if (isSent)
        return res.json({
          msg: _.template(config.otp.client[req.language])({
            mobileLast4digit: driver.mobileNumber.toString().slice(-4),
          }),
        });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  verifyOtp: async (req, res) => {
<<<<<<< HEAD
    const tokendata = { driverId: req.body.driverId };
    const { mobileNumber } = await driverService.details(req.body.driverId);
    let isVerified = true;
    let redisOTP = await client.get('DRIVER_BFF_' + req.body.driverId);
    isVerified = (req.body.OTP === redisOTP) ? true : false;
    if (!isVerified)
      return res.status(401).json({ msg: config.otp.wrongOtp[req.language] });
=======
    const tokendata = { staffId: req.body.staffId };
    const isVerified = await client.get(config.REDIS_PRIFIX + req.body.staffId) == req.body.OTP;
    if (!isVerified) return res.status(401).json({ msg: config.otp.wrongOtp[req.language] });
    client.del(config.REDIS_PRIFIX + req.body.staffId)
>>>>>>> fbb782d4fc021f19480d173fc84ff964573fb1b6
    return res.json({
      accestoken: jwt.sign(tokendata, config.JWT_SECRET, { expiresIn: '1d' }),
      refreshToken: jwt.sign(tokendata, config.JWT_SECRET, {
        expiresIn: '14d',
      })
    });
  },
};
