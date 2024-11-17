import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  claimAmount: {
    type: Number,
    required: true
  },
  accidental: {
    type: Boolean,
    default: false
  },
  kidneyRelated: {
    type: Boolean,
    default: false
  },
  heartRelated: {
    type: Boolean,
    default: false
  },
  timeStamp: {
    type: Date,
    default: Date.now 
  }
});

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
