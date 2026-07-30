const axios = require("axios");

const sendEmail = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Gym Reborn",
          email: process.env.SENDER_EMAIL, // Verified sender email
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Email sent:", response.data);
  } catch (err) {
    console.error(
      "❌ Brevo Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = { sendEmail };
