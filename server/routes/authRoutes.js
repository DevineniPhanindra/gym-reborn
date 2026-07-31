const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
// Change Password
router.put("/change-password", authMiddleware, changePassword);

router.post("/login", login);

module.exports = router;
