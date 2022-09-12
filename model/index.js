const mongoose = require("mongoose");
const { driverSchema } = require("./driver.schema");

module.exports = {
  driverModel: mongoose.model("drivernew", driverSchema),
  configModel: mongoose.model("config",  { collection: "config", strict: false }),
};
