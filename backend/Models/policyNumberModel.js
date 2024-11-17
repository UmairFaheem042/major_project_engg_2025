import mongoose from 'mongoose';

const policyNumberSchema = new mongoose.Schema({
  lastUsed: {
    type: Number,
    default: 0,
  }
});

const PolicyNumber = mongoose.model('PolicyNumber', policyNumberSchema);

export default PolicyNumber;
