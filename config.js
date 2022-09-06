const config = process.env;


module.exports = {
    appConfig: async () => {
        Object.assign(config, {
            otp: {
                sms:{
                    EN: 'OTP for car taxi app login is ${OTP}'
                },
                client:{
                    EN: 'Enter the OTP which is send to your registered mobile number *****${mobileLast4digit}'
                }
            },

        })
    },
    config
}