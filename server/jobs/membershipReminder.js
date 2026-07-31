const cron = require("node-cron");
const Member = require("../models/memberModel");
const { sendEmail } = require("../utils/emailService");

console.log("✅ Membership reminder cron initialized.");

// Runs every day at 9:15 AM
cron.schedule("15 9 * * *", async () => {
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
          `
            <h2>Hello ${member.name},</h2>

            <p>Your Gym Reborn membership will expire in <strong>${daysLeft} day(s)</strong>.</p>

            <table border="1" cellpadding="8" cellspacing="0">
              <tr>
                <td><strong>Member ID</strong></td>
                <td>${member.id}</td>
              </tr>
              <tr>
                <td><strong>Member Name</strong></td>
                <td>${member.name}</td>
              </tr>
              <tr>
                <td><strong>Expiry Date</strong></td>
                <td>${member.membership_end_date}</td>
              </tr>
            </table>

            <br/>

            <p>Please renew your membership before the expiry date to continue enjoying uninterrupted access to our facilities.</p>

            <br/>

            <p>Thank you,</p>
            <h3>Gym Reborn Team</h3>
          `
        );

        // Mark reminder as sent
        await Member.markReminderSent(member.id);

        console.log(`Reminder sent to ${member.email}`);

      } catch (err) {
        console.error(
          `Failed to send email to Member ID ${member.id}:`,
          err.message
        );
      }
    }

    console.log("Membership reminder job completed.");

  } catch (err) {
    console.error("Cron Job Error:", err.message);
  }
});
