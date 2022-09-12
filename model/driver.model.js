const mongoose = require('mongoose');
const utils = require('../helpers/utils');
const driverSchemaRule = {
  staffId: {
    type: Number,
    unique: true,
    required: true,
  },
  rtaId: {
    type: Number,
    required: true,
  },
  careemId: Number,
  name: {
    type: String,
    required: true,
  },
  hrStatus: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    required: true,
  },
  rtaPermitNo: Number,
  permitIssueDate: {
    type: String,
    required: true,
  },
  permitExpiryDate: {
    type: String,
    required: true,
  },
  licenseNo: Number,
  licenseIssueDate: {
    type: String,
    required: true,
  },
  licenseExpiryDate: {
    type: String,
    required: true,
  },
  licIssuingAuthority: {
    type: String,
    required: true,
  },
  trafficFileNumber: Number,
  shifts: {
    type: String,
    enum:['Day', 'Night'],
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  national: {
    type: String,
    required: true,
  },
  location: String,
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
};
const driverSchema = mongoose.Schema(driverSchemaRule);
utils.filterUndeletedMongooseHooks(driverSchema);

module.exports = {
  driverSchemaRule,
  driverSchema,
  driverModel: mongoose.model('drivernew', driverSchema),
};
