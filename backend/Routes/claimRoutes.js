const express = require("express");
const {
  createClaim,
  getClaimById,
  getClaims,
  getAllClaims,
} = require("../Controllers/claimsController.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");

const router = express.Router();

// router.post("/createClaim", verifyToken, createClaim);
router.post("/createClaim", createClaim);

router.get("/:userId/claims", getClaims);

router.get("/:claimId", getClaimById);


// router.get("/:claimId", verifyToken, getClaimById);
router.get("/allClaims", getAllClaims); // all claims for Admin

module.exports = router;
