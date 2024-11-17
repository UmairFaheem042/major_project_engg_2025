import User from "../Models/userModel";
import PolicyNumber from "../models/PolicyNumber";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, password, address, role } = req.body;

    const phoneCheck = await User.findOne({ phoneNumber });
    if (phoneCheck) {
      return res.json({ msg: "Phone number already in use", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already in use", status: false });
    }

    let policyNumber;
    const policyDoc = await PolicyNumber.findOne();
    if (!policyDoc) {
      policyNumber = "POLICY00001";
      const newPolicy = new PolicyNumber({ lastUsed: 1 });
      await newPolicy.save();
    } else {
      const newPolicyNumber = policyDoc.lastUsed + 1;
      policyNumber = `POLICY${String(newPolicyNumber).padStart(5, "0")}`;

      policyDoc.lastUsed = newPolicyNumber;
      await policyDoc.save();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      address,
      role: role || "user",
      policyNumber,
    });

    const savedUser = await newUser.save();

    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res.status(201).json({ status: true, user: userResponse });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password, policyNumber } = req.body;

    const user = await User.findOne({ username, policyNumber });
    if (!user) {
      return res.status(400).json({
        msg: "Incorrect username, policy number, or password",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "Incorrect username, policy number, or password",
        status: false,
      });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        policyNumber: user.policyNumber,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: true,
      user: userResponse,
      token,
    });
  } catch (ex) {
    next(ex);
  }
};

export const getUserByPolicyNumber = async (req, res, next) => {
  try {
    const { policyNumber } = req.params;

    if (req.userRole !== "admin") {
      return res.status(403).json({
        msg: "Forbidden: You do not have permission to access this resource",
        status: false,
      });
    }

    const user = await User.findOne({ policyNumber }).populate(
      "referencedClaimId"
    );

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        status: false,
      });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      status: true,
      user: userResponse,
      claims: user.referencedClaimId,
    });
  } catch (ex) {
    next(ex);
  }
};
