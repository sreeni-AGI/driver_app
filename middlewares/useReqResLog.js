const logger = require("../helpers/logger");

module.exports = function(req, res, next) {
    const logMsg = {
        Request: {
            'RequestQuery':req.query,
            'Method': req.method,
            'URL': req.originalUrl,
            'Headers': req.headers,
            'Body': req.body,
        },
        Response: {
            'Method': res.method,
            'URL': res.originalUrl,
            'Headers': res.headers,
            'Body': res.body,
            'StatusCode': res.statusCode,
            'Status': res.status,
            'StackTrace': res.stack
        }
    };
    logger.info(logMsg)
    next();
}