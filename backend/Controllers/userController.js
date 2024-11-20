const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const PolicyNumber = require("../Models/policyNumberModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.register = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, password, address, role } = req.body;
    const phoneCheck = await User.findOne({ phoneNumber });
    if (phoneCheck) {
      return res
        .status(400)
        .json({ msg: "Phone number already in use", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res
        .status(400)
        .json({ msg: "Email already in use", status: false });
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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration Successful",
      text: `Dear ${name},\n\nThank you for registering.\nYour Policy Number is: ${policyNumber}\n\nBest regards,\nVIGILANTMED TEAM`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res.status(201).json({ status: true, user: userResponse });
  } catch (ex) {
    next(ex);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, policyNumber } = req.body;

    const user = await User.findOne({ email, policyNumber });
    if (!user) {
      return res.status(400).json({
        msg: "Incorrect email, policy number, or password",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "Incorrect email, policy number, or password",
        status: false,
      });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        policyNumber: user.policyNumber,
        role: user.role,
      },
      process.env.JWT_SECRET,
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

exports.getUserByPolicyNumber = async (req, res, next) => {
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