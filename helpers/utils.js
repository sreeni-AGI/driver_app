const _  = require('lodash');

module.exports = {
  formatError: err => err.message ? err.message : err,
  smsPayload: (mobileNumber, message) => ({
    mobileNumbers: {
      messageParams: [
        {
          mobileNumber,
        },
      ],
    },
    msgType: '1',
    priority: '0',
    message
  }),
  filterUndeletedMongooseHooks: (schema) =>
    ['find'].forEach((e) =>
      schema.pre(e, function () {
        this._conditions.isDeleted = false;
      })
    ),
  schemaDoc: function (schema) {
    schema = _.cloneDeep(schema);
    if (Array.isArray(schema)) return schema.map(this.schemaDoc);
    const toReturn = {};
    for (const key in schema) {
      if (['isDeleted'].includes(key)) continue;
      let val = schema[key];
      if (typeof val == 'function') val = { type: typeof val() };
      else if (Array.isArray(val)) val = val.map(this.schemaDoc);
      else {
        val.type = typeof val.type();
        if(typeof val.required == 'function') val.required = true
      }
      schema[key] = val;
    }
    return schema;
  },
  languageMapper: (langData, lang='EN') => langData[lang] || langData['EN'],
  formatQuery: payload => {
    let toReturn = '?';
    for (const key in payload) {
      toReturn += `${key}=${payload[key]}&`
    }
    return toReturn.slice(0, -1);
  }   
};
