const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes.js");
const claimRoutes = require("./Routes/claimRoutes.js");
const reportRoutes = require("./Routes/reportRoutes.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/reports", reportRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
