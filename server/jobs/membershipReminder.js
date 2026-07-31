const cron = require("node-cron");
const Member = require("../models/memberModel");
const { sendEmail } = require("../utils/emailService");

// Runs every day at 9:00 AM IST
cron.schedule(
  "0 9 * * *",
  async () => {
    console.log("Checking expiring memberships...");

    try {
      const members = await Member.getReminderMembers();

      if (members.length === 0) {
        console.log("No memberships expiring within 7 days.");
        return;
      }

      for (const member of members) {
        try {
          if (!member.email) {
            console.log(`Skipping Member ID ${member.id}: No email address.`);
            continue;
          }

          const expiryDate = new Date(member.membership_end_date);
          const today = new Date();

          today.setHours(0, 0, 0, 0);
          expiryDate.setHours(0, 0, 0, 0);

          const daysLeft = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
          );

          await sendEmail(
            member.email,
            "🏋️ Gym Reborn Membership Expiry Reminder",
            `<h2>Hello ${member.name}</h2>
             <p>Your membership will expire in <strong>${daysLeft} day(s)</strong>.</p>`
          );

          await Member.markReminderSent(member.id);
          console.log(`Reminder sent to ${member.email}`);
        } catch (err) {
          console.error(`Failed to send email: ${err.message}`);
        }
      }

      console.log("Membership reminder job completed.");
    } catch (err) {
      console.error("Cron Job Error:", err.message);
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);
