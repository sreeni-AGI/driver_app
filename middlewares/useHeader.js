const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = (req, res, next) => {
  req.language = req.headers['accept-language']?.toUpperCase().slice(0, 2) || 'EN';
  const authIgnored = ['/auth', '/driver'].find(e => req.path.startsWith(e));
  if (!authIgnored) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const tokenData = jwt.verify(token, config.JWT_SECRET);
      req.staffId = tokenData.staffId;
    } catch (error) {
      return res.status(401).json({msg:'Invalid Token'});
    }
  }
  next();
};

