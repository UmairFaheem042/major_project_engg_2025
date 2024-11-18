const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  referencedClaimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Claim",
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Report", reportSchema);
