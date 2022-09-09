module.exports = {
  formatError: (err) => (err.message ? err.message : err),
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
  filterUndeletedMongooseHooks: schema => ['find'].forEach(e => schema.pre(e, function(){this._conditions.isDeleted = false}))
};
