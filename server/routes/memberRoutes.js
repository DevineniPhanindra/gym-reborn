const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMembers,
  getStats,
  getExpiringMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  renewMember,
} = require("../controllers/memberController");

// Protect all routes
router.use(authMiddleware);

// Dashboard Statistics
router.get("/stats", getStats);

// Members expiring within 7 days
router.get("/expiring", getExpiringMembers);

// Get all members
router.get("/", getMembers);

// Get member by ID
router.get("/:id", getMember);

// Add member
router.post("/", createMember);

// Update member
router.put("/:id", updateMember);

// Delete member
router.delete("/:id", deleteMember);

// Renew membership
router.put("/:id/renew", renewMember);

module.exports = router;