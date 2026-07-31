const express = require("express");
const router = express.Router();

const { login, changePassword} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Change Password
router.put("/change-password", authMiddleware, changePassword);

router.post("/login", login);

module.exports = router;
