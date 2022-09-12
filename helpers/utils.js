module.exports = {
  formatError: (err) => ({ 
    status: err.code, 
    message: err.message ? err.message : err 
  }),
  smsPayload: (mobileNumber, message) => ({
    dlrUrl: '',
    mobileNumbers: {
      messageParams: [
        {
          mobileNumber,
          params: {
            message,
          },
        },
      ],
    },
    msgType: '1',
    userName: '',
    password: '',
    priority: '0',
    message: '{message}',
    referenceId: '23454567',
    senderId: '',
  }),
  filterUndeletedMongooseHooks: (schema) =>
    ['find'].forEach((e) =>
      schema.pre(e, function () {
        this._conditions.isDeleted = false;
      })
    ),
  schemaDoc: function (schema) {
    if (Array.isArray(schema)) return schema.map(this.schemaDoc);
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
  languageMapper: (langData, lang='EN') => langData[lang] || langData['EN']
};
