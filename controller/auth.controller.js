const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { formatError } = require("../helpers/utils");
const driverService = require("../services/driver.service");
const smsService = require("../services/sms.service");

module.exports = {
  sendOtp: async (req, res) => {
    try {
      const { mobileNumber } = await driverService.details(req.body.driverId);
      let OTP = _.random(999, 9999);
      const toSend = _.template(config.otp.sms[req.language])({ OTP });
      const isSent = await smsService.send(mobileNumber, toSend);
      if (isSent)
        return res.json({
          msg: _.template(config.otp.client[language])({
            mobileLast4digit: mobileNumber.slice(-4),
          }),
        });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  },
  verifyOtp: (req, res) => {
    const tokendata = { driverId: req.body.driverId };
    const isVerified = true;
    if (!isVerified)
      return res.status(401).json({ msg: config.otp.wrongOtp[req.language] });
    return res.json({
      accestoken: jwt.sign(tokendata, config.JWT_SECRET, { expiresIn: "1d" }),
      refreshToken: jwt.sign(tokendata, config.JWT_SECRET, { expiresIn: "14d" }),
    });
  },
};
