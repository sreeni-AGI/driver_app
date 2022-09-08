const mongoose = require('mongoose');
const driverSchema = mongoose.Schema({
  'STAFF NUMBER': {
    type: Number,
    required: true,
  },
  'RTA ID': {
    type: Number,
    required: true,
  },
  'CAREEM ID': {
    type: Number,
    required: true,
  },
  NAME: {
    type: String,
    required: true,
  },
  'HR STATUS': {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    required: true,
  },
  'RTA PERMIT NO': {
    type: Number,
    required: true,
  },
  'PERMIT ISSUE DATE': {
    type: String,
    required: true,
  },
  'PERMIT EXPIRY DATE': {
    type: String,
    required: true,
  },
  'Licence NO': {
    type: Number,
    required: true,
  },
  'LICENSE ISSUE DATE': {
    type: String,
    required: true,
  },
  'LICENCE EXPIRY DATE': {
    type: String,
    required: true,
  },
  LicIssueingAuthority: {
    type: String,
    required: true,
  },
  TrafficFileNumber: {
    type: Number,
    required: true,
  },
  Shifts: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  National: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  isDeleted : {
    type: Boolean,
    required: true,
    default: false
  }
});
module.exports = mongoose.model('driver', driverSchema);
