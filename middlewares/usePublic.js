const { config } = require('../config');
const { formatError } = require('../helpers/utils');

module.exports = (req, res, next) => {
    try {
        if (config.DRIVER_X_API_KEY != req.headers['x-api-key']) {
            return res.status(401).json({ msg: 'Invalid API key' });
        }
    } catch (error) {
        return res.status(400).send(formatError(error));
    }
    next();
}