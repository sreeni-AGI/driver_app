const mongoLogger = require('../helpers/mongoLogger');
const mongoLogUri =
  'mongodb+srv://cluster0.eedgq8o.mongodb.net?retryWrites=true&w=majority';

module.exports = mongoLogger(
  mongoLogUri,
  {user:'agidev', pass:'agidev'},
  'driver'
);
