const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//transporter for sending emails
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Gym Reborn" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };