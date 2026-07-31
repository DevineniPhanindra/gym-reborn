const cron = require("node-cron");
const Member = require("../models/memberModel");
const { sendEmail } = require("../utils/emailService");

// Runs every minute (for debugging)
cron.schedule("* * * * *", async () => {
  console.log("=======================================");
  console.log("CRON START");
  console.log("Server Time:", new Date().toString());
  console.log("Timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);

  try {
    const members = await Member.getReminderMembers();

    console.log("Members Found:", members.length);

    if (members.length > 0) {
      console.log("Members:", members);
    }

    if (members.length === 0) {
      console.log("No memberships expiring within 7 days.");
      console.log("CRON END");
      console.log("=======================================");
      return;
    }

    for (const member of members) {
      try {
        console.log(`Processing Member ID: ${member.id}`);

        if (!member.email) {
          console.log(`Skipping ${member.name}: No email.`);
          continue;
        }

        const expiryDate = new Date(member.membership_end_date);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);

        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        console.log(`Sending email to ${member.email}`);

        await sendEmail(
          member.email,
          "🏋️ Gym Reborn Membership Expiry Reminder",
          `<h2>Hello ${member.name}</h2>
           <p>Your membership will expire in <strong>${daysLeft} day(s)</strong>.</p>`
        );

        console.log("Email sent successfully.");

        await Member.markReminderSent(member.id);

        console.log("Database updated (reminder_sent = TRUE).");
      } catch (err) {
        console.error("Member Error:", err);
      }
    }

    console.log("Membership reminder job completed.");
  } catch (err) {
    console.error("Cron Job Error:", err);
  }

  console.log("CRON END");
  console.log("=======================================");
});
