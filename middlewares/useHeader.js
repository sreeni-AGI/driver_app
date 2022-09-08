const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { formatError } = require('../helpers/utils');

module.exports = (req, res, next) => {
  req.language = req.headers['accept-language']?.toUpperCase().slice(0, 2) || 'EN';
  const authIgnored = ['/api/auth'].find(e => req.path.startsWith(e));
  if (!authIgnored) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      if (!token)
        return res
          .status(401)
          .json({ msg: 'authorization token is required' });
      const tokenData = jwt.verify(token, config.JWT_SECRET);
      req.driverId = tokenData.staffId;
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
  next();
};

