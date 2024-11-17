import express from "express";
import { verifyToken } from "./Middlewares/VerifyToken.js";
import {
  register,
  login,
  getUserByPolicyNumber,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("auth/user/:policyNumber", verifyToken, getUserByPolicyNumber);

export default router;
