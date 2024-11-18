const mongoose = require("mongoose");

const policyNumberSchema = new mongoose.Schema({
  lastUsed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("PolicyNumber", policyNumberSchema);
