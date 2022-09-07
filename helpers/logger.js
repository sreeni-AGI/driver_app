const winston = require("winston");
require("winston-mongodb");
const { config } = require("../config");
const { createLogger, transports, format } = winston;
const { combine, timestamp } = format;

const myFormat = format.printf(
  ({ level, message, timestamp, label, stack }) => {
    return JSON.stringify({
      timestamp,
      label,
      level,
      message,
      stack
    });
  }
);

const ignorePrivate = format((info, opts) => {
  if (info.private) {
    return false;
  }
  return info;
});

const logger = createLogger({
    level: "info",
    format: combine(
      timestamp(),
      myFormat,
      ignorePrivate(),
    ),
    transports: [
      new (transports.Console)({
        level: "debug",
        handleExceptions: true,
        prettyPrint: true,
        format: combine(format.timestamp(), format.colorize(), format.simple()),
      }),
      new transports.MongoDB({
        level: "error",
        db: 'mongodb+srv://agidev:agidev@cluster0.eedgq8o.mongodb.net/driverappdb?retryWrites=true&w=majority',
        collection: "saveLog",
        options: { useUnifiedTopology: true },
        format: combine(format.timestamp(), format.json()),
      }),
    ],
    exitOnError: false
  });

module.exports = logger;

