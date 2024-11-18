const Claim = require("../Models/claimModel");
const User = require("../Models/userModel");

exports.createClaim = async (req, res, next) => {
  try {
    const {
      policyNumber,
      hospitalName,
      email,
      name,
      claimAmount,
      description,
      accidental,
      kidneyRelated,
      heartRelated,
    } = req.body;

    console.log("Helllo");
    const user = await User.findOne({ email });
    console.log(user);
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
      name,
      description,
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
    // next(error);
    return res.status(201).json({
      status: false,
      msg: "An Error Occurred",
      error,
    });
  }
};

exports.getClaimById = async (req, res, next) => {
  try {
    const { claimId } = req.params;

    console.log("ClaimId from backend", claimId);
    // if (!claimId.match(/^[0-9a-fA-F]{24}$/)) {
    //   return res.status(400).json({ msg: "Invalid claim ID", status: false });
    // }

    const claim = await Claim.findById(claimId);
    console.log(claim);

    if (!claim) {
      return res.status(404).json({ msg: "Claim not found", status: false });
    }

    return res.status(200).json({
      status: true,
      msg: "Claim fetched successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "An error occurred while fetching the claim",
      error: error.message,
    });
    // next(error);
  }
};


// It'll fetch All Claims for particular User
exports.getClaims = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const claims = await Claim.find({ _id: { $in: user.referencedClaimId } }).sort({ _id: -1 });;
    res.status(200).json(claims);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// This is for Admin, will fetch All Claims irrespective of the user (Not Working)
exports.getAllClaims = async (req, res) => {
  try {
    console.log("Fetching all claims1...");
    const claims = await Claim.find();
    console.log("Fetching all claims2...");

    if (!claims || claims.length === 0) {
      return res
        .status(404)
        .json({ message: "No claims found", status: false });
    }

    return res.status(200).json({
      status: true,
      message: "Claims fetched successfully",
      claims,
    });
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching claims",
      error: error.message,
    });
  }
};
