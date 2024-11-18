const express = require("express");
const { verifyToken } = require("../Middlewares/verifyToken.js");
const {
  createReport,
  getReportByClaimId,
} = require("../Controllers/reportController.js");

const router = express.Router();

// router.post("/createReport", verifyToken, createReport);
router.post("/createReport", createReport);
// router.get("/:claimId", verifyToken, getReportByClaimId);
router.get("/:claimId",  getReportByClaimId);

module.exports = router;
