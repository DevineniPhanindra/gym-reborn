const Member = require("../models/memberModel");
const { sendEmail } = require("../utils/emailService");

// Get all members
const getMembers = async (req, res) => {
  try {
    const members = await Member.getAll();

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Dashboard Statistics
const getStats = async (req, res) => {
  try {
    const stats = await Member.getStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// Get member by ID
const getMember = async (req, res) => {
  try {
    const member = await Member.getById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create member
const createMember = async (req, res) => {
  try {
    // Create member
    const member = await Member.create(req.body);

     res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });

    // Send welcome email (don't fail if email sending fails)
    if (member.email) {
      try {
        await sendEmail(
          member.email,
          "Welcome to Gym Reborn",
          `
          <h2>Welcome ${member.name}!</h2>

          <p>Your membership has been created successfully.</p>

          <table border="1" cellpadding="8" cellspacing="0">
            <tr>
              <td><b>Member ID</b></td>
              <td>${member.id}</td>
            </tr>

            <tr>
              <td><b>Name</b></td>
              <td>${member.name}</td>
            </tr>

            <tr>
              <td><b>Membership Start</b></td>
              <td>${member.membership_start_date}</td>
            </tr>

            <tr>
              <td><b>Membership End</b></td>
              <td>${member.membership_end_date}</td>
            </tr>
          </table>

          <br/>

          <p>Thank you for joining <b>Gym Reborn</b>.</p>
          <p>We wish you a healthy fitness journey!</p>
          `
        );

        console.log("✅ Welcome email sent successfully");

      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError.message);
        // Don't throw the error
      }
    }

   

  } catch (error) {
    console.error("❌ Create Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add member",
      error: error.message,
    });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const member = await Member.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    console.error("❌ Update Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update member",
      error: error.message,
    });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    await Member.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete member",
      error: error.message,
    });
  }
};

// Renew membership
const renewMember = async (req, res) => {
  try {
    const { membership_end_date } = req.body;

    const member = await Member.renew(
      req.params.id,
      membership_end_date
    );

    res.status(200).json({
      success: true,
      message: "Membership renewed successfully",
      data: member,
    });
  } catch (error) {
    console.error("❌ Renew Membership Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to renew membership",
      error: error.message,
    });
  }
};

// Get members expiring within 7 days
const getExpiringMembers = async (req, res) => {
  try {
    const members = await Member.getExpiringMembers();

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error("❌ Get Expiring Members Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch expiring members",
      error: error.message,
    });
  }
};

module.exports = {
  getMembers,
  getStats,
  getMember,
  getExpiringMembers,
  createMember,
  updateMember,
  deleteMember,
  renewMember,
};