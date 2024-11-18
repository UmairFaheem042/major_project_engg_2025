const Report = require("../Models/reportModel");
const Claim = require("../Models/claimModel");

const createReport = async (req, res, next) => {
  try {
    // const { claimId } = req.params;
    const { note, status, claimId } = req.body;

    if (!claimId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Invalid claim ID", status: false });
    }

    const claimExists = await Claim.findById(claimId);
    if (!claimExists) {
      return res.status(404).json({ msg: "Claim not found", status: false });
    }

    const newReport = new Report({
      referencedClaimId: claimId,
      note,
      status,
    });

    const savedReport = await newReport.save();

    return res.status(201).json({
      status: true,
      msg: "Report created successfully",
      report: savedReport,
    });
  } catch (error) {
    next(error);
  }
};

const getReportByClaimId = async (req, res, next) => {
  try {
    const { claimId } = req.params;
    console.log("ClaimId from backend", claimId);

    const report = await Report.findOne({
      referencedClaimId: claimId,
    }).populate("referencedClaimId");

    if (!report) {
      return res.status(404).json({ msg: "Report not found", status: false });
    }

    return res.status(200).json({
      status: true,
      msg: "Report fetched successfully",
      report,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({
      status: false,
      msg: "An error occurred while fetching the report",
      error: error.message,
    });
    // next(error);
  }
};

module.exports = { createReport, getReportByClaimId };
