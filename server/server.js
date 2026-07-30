require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./jobs/membershipReminder");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("Gym Reborn API is Running 🚀");
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});