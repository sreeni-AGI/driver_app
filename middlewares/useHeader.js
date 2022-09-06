module.exports = (req, res, next) => {
  req.language = req.headers['accept-language'].toUpperCase() || 'EN';
  next();
};
