const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const driverService = require("../services/driver.service")
const smsService = require("../services/sms.service")
const client = require('../helpers/redisClient');


module.exports = {
    sendOtp: async (req, res) => {
        try {
          const { mobileNumber } = await driverService.details(req.body.driverId);
          let OTP = await client.get("DRIVER_BFF_"+req.body.driverId);
            if(!OTP){
                OTP = _.random(999, 9999);                
                await client.set("DRIVER_BFF_"+req.body.driverId, OTP, 'ex', 300);
            } 

          const toSend = _.template(config.otp.sms[req.language])({ OTP });
          const isSent = await smsService.send(mobileNumber, toSend);
          if (isSent)
            return res.json({
              msg: _.template(config.otp.client[req.language])({
                mobileLast4digit: mobileNumber.slice(-4),
              }),
            });
        } catch (error) {
            console.log(error);
          return res.status(400).send(formatError(error));
        }
      },
      verifyOtp: async (req, res) => {
        const tokendata = { driverId: req.body.driverId };
        const isVerified = true;
        const { OTP } = req.body.OTP;
        let redisOTP = await client.get("DRIVER_BFF_"+req.body.driverId);       
        isVerified = (OTP===redisOTP)?true:false;               
        if (!isVerified)
          return res.status(401).json({ msg: config.otp.wrongOtp[req.language] });
        return res.json({
          accestoken: jwt.sign(tokendata, config.JWT_SECRET, { expiresIn: "1d" }),
          refreshToken: jwt.sign(tokendata, config.JWT_SECRET, { expiresIn: "14d" }),
        });
    }
}