import Report from "./models/reportModel";
import Claim from "./models/claimModel";

export const createReport = async (req, res, next) => {
  try {
    const { claimId } = req.params;
    const { note, status } = req.body;

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

export const getReportByClaimId = async (req, res, next) => {
    try {
      const { claimId } = req.params;

      if (!claimId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: "Invalid claim ID", status: false });
      }

      const report = await Report.findOne({ referencedClaimId: claimId });
  
      if (!report) {
        return res.status(404).json({ msg: "Report not found", status: false });
      }
  
      return res.status(200).json({
        status: true,
        msg: "Report fetched successfully",
        report,
      });
    } catch (error) {
      next(error);
    }
  };
  