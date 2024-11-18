const express = require("express");

const {
  register,
  login,
  getUserByPolicyNumber,
} = require("../Controllers/userController.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("auth/user/:policyNumber", verifyToken, getUserByPolicyNumber);

module.exports = router;
