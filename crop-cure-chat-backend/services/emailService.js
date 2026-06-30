async function sendOtpEmail(to, code) {
  const expiry = process.env.OTP_EXPIRY_MINUTES || 10;

  const rawFrom = process.env.EMAIL_FROM || "AgriLiv-T5 <shabari.meela@gmail.com>";
  const match = rawFrom.match(/^(?:"?([^"<]*)"?\s*)?<([^>]+)>$/);

  const senderName = match ? match[1].trim() : "AgriLiv-T5";
  const senderEmail = match ? match[2].trim() : rawFrom;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: "Your AgriLiv-T5 Verification Code",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>AgriLiv-T5 Verification</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</div>
          <p>This code will expire in <strong>${expiry} minutes</strong>.</p>
          <p>If you did not request this code, you can ignore this email.</p>
        </div>
      `,
      textContent: `Your verification code is ${code}. It expires in ${expiry} minutes.`,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Brevo email error:", data);
    throw new Error(data.message || "Failed to send OTP email");
  }

  console.log("OTP email sent to:", to);
  return data;
}

module.exports = { sendOtpEmail };
