const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');
const driverService = require("../services/driver.service")
const smsService = require("../services/sms.service")
const client = require('../helpers/redisClient');


module.exports = {
    send: async (req, res) => {
        try {
            console.log(req.body);
            const { mobileNumber } = await driverService.details(req.body.driverId);
            let OTP = await client.get("DRIVER_BFF_"+req.body.driverId);
            // console.log(OTP);
            if(!OTP){
                OTP = _.random(999, 9999);                
                await client.set("DRIVER_BFF_"+req.body.driverId, OTP, 'ex', config.OTP_EXPIRE*60);
            }            
            // console.log(config.otp.sms[req.language]);
            const toSend = _.template(config.appConfig.otp.sms[req.language])({ OTP });
            console.log(toSend);
            // const isSent = await smsService.send(mobileNumber, toSend);
            // if (isSent) return res.json({ msg: _.template(config.appConfig.otp.client[language])({ mobileLast4digit: mobileNumber.slice(-4) }) });
            res.json({ msg:"yes"});
        } catch (error) {
            return res.status(400).send(formatError(error))
        }

    },
    verify: async (req, res) => {
        const tokendata = { driverId: req.body.driverId};
        const isVerified = false;
        const { OTP } = req.body.OTP;
        let redisOTP = await client.get("DRIVER_BFF_"+req.body.driverId);       
        isVerified = (OTP===redisOTP)?true:false;               
        if (!isVerified) return res.status(401).json({ msg: config.otp.wrongOtp[req.language] })
        return res.json({ accestoken: jwt.sign(tokendata, 'JWTSECRET', { expiresIn: '1d' }), refreshToken: jwt.sign(tokendata, 'JWTSECRET', { expiresIn: '14d' }) })
    }
}