import express from "express";
import { verifyToken } from "./Middlewares/VerifyToken.js";
import { createClaim, getClaimById } from "../Controllers/claimsController.js";

const router = express.Router();

router.post("/createClaim", verifyToken, createClaim);
router.get("/:claimId", verifyToken, getClaimById);

export default router;
