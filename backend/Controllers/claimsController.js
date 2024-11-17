import Claim from "../Models/claimModel";
import User from "../Models/userModel";

export const createClaim = async (req, res, next) => {
  try {
    const {
      policyNumber,
      hospitalName,
      userName,
      claimAmount,
      accidental,
      kidneyRelated,
      heartRelated,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found", status: false });
    }

    if (user.policyNumber !== policyNumber) {
      return res
        .status(400)
        .json({ msg: "Invalid policy number", status: false });
    }

    const newClaim = new Claim({
      policyNumber,
      hospitalName,
      userName,
      claimAmount,
      accidental,
      kidneyRelated,
      heartRelated,
    });

    const savedClaim = await newClaim.save();

    user.referencedClaimId.push(savedClaim._id);
    await user.save();

    return res.status(201).json({
      status: true,
      msg: "Claim created successfully",
      claim: savedClaim,
    });
  } catch (error) {
    next(error);
  }
};

export const getClaimById = async (req, res, next) => {
  try {
    const { claimId } = req.params;

    if (!claimId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Invalid claim ID", status: false });
    }

    const claim = await Claim.findById(claimId);

    if (!claim) {
      return res.status(404).json({ msg: "Claim not found", status: false });
    }

    return res.status(200).json({
      status: true,
      msg: "Claim fetched successfully",
      claim,
    });
  } catch (error) {
    next(error);
  }
};
