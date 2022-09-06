const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { formatError } = require('../helpers/utils');
const driverService = require("../services/driver.service")
const smsService = require("../services/sms.service")


module.exports = {
    send: async (req, res) => {
        const language = req.headers['accept-language'] || 'EN';
        try {
            const { mobileNumber } = await driverService.details(req.body.driver);
            let OTP = _.random(999, 9999);
            const toSend = _.template(config.otp.sms[language])({ OTP });
            const isSent = await smsService.send(mobileNumber, toSend);
            if (isSent) return res.json({ msg: _.template(config.otp.client[language])({ mobileLast4digit: mobileNumber.slice(-4) }) });
        } catch (error) {
            return res.status(400).send(formatError(error))
        }

    },
    verify: (req, res) => {
        const tokendata = { driverId: req.body.driverId };
        const isVerified = true
        return res.json({ accestoken: jwt.sign(tokendata, 'JWTSECRET', { expiresIn: '1d' }), refreshToken: jwt.sign(tokendata, 'JWTSECRET', { expiresIn: '14d' }) })
    }
}