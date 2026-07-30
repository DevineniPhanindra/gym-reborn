require("dotenv").config();

const express = require("express");


require("./jobs/membershipReminder");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gym-reborn.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());
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