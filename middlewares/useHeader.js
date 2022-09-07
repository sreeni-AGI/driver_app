const jwt = require('jsonwebtoken');
const { config } = require('../config');
const driverService = require('../services/driver.service');

module.exports = (req, res, next) => {
  req.language = req.headers['accept-language']?.toUpperCase() || 'EN';
  const firstEndPoint = req.path.split('/')[1];
  if(firstEndPoint!='auth'){ 
    try {
      const token = req.headers['authorization']; 
    if(!token)
    return res
    .status(404)
    .json({ msg: 'authorization token is required' });
     const tokenData = jwt.verify(token, config.JWT_SECRET);
     if(!tokenData.staffId)
          return res
          .status(404)
          .json({ msg: 'Wrong token' });
     req.staffId = tokenData.staffId;   
    } catch(error){
      return res.status(400).send(formatError(error));
    }    
  }  
  next();
};

