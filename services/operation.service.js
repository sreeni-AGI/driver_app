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
    },

    accidentList : function(driverId, category){
        const accidentPayload = {
            category:category
        }
        return accidentList = {          
                "date": "16-09-2022",  
                "time": "",
                "location":"sharjah",        
                "status":"active",
                "accidentCriticality":"minor"                
        }
        // return axios.get(
        //     config.DRIVER_API_URL,
        //     accidentPayload,
        //     config.mgwConfig
        // );
    }
}