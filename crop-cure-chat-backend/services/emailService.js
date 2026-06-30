const nodemailer = require("nodemailer");

async function sendOtpEmail(to, code) {
  const expiry = process.env.OTP_EXPIRY_MINUTES || 10;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "AgriLiv-T5 <shabari.meela@gmail.com>",
    to,
    subject: "Your AgriLiv-T5 Verification Code",
    text: `Your verification code is ${code}. It expires in ${expiry} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>AgriLiv-T5 Verification</h2>
        <p>Your verification code is:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</div>
        <p>This code will expire in <strong>${expiry} minutes</strong>.</p>
      </div>
    `,
  });

  console.log("OTP email sent to:", to);
}

module.exports = { sendOtpEmail };
