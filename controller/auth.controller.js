const _ = require('lodash');
const config = require('../config');
const driverService = require("../services/driver.service")
const smsService = require("../services/sms.service")

module.exports = {
    send: async (req, res) => {
        const { mobileNumber } = await driverService.details(req.body.driver);
        const OTP = _.random(999, 9999);
        const toSend = _.template(config.otp.sms[req.headers['accept-language']])({ OTP });
        const isSent = await smsService.send(mobileNumber, toSend);
        if(isSent) return res.status(201).json({msg: _.template()})
    },
    verify: (req, res) => {

    }
}