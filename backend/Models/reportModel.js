import mongoose from "mongoose";

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

const Report = mongoose.model("Report", reportSchema);
export default Report;
