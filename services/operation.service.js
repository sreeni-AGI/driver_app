const axios = require('axios');
const { config } = require('../config');

module.exports = {
    checkLateLogin: (loginDateTime, driverId) => {
        const lastLoginPayload = {
            driver: {
                id: driverId,
                login: {
                    dateTime: loginDateTime
                }
            }
        }
        return axios.post(
            config.DRIVER_API_URL,
            lastLoginPayload,
            config.mgwConfig
        );
    }
}