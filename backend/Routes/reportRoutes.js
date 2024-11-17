import express from "express";
import { verifyToken } from "./Middlewares/VerifyToken.js";
import {
  createReport,
  getReportByClaimId,
} from "../Controllers/reportController.js";

const router = express.Router();

router.post("/createReport", verifyToken, createReport);
router.get("/:claimId", verifyToken, getReportByClaimId);

export default router;
