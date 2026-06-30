async function sendOtpEmail(to, code) {
  console.log("==================================");
  console.log("OTP GENERATED");
  console.log("Email:", to);
  console.log("OTP:", code);
  console.log("==================================");

  return true;
}

module.exports = { sendOtpEmail };
