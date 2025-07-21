import { sendMail } from "./sendEmail.js";

export const sendOtpEmail = async (to, otp) => {
  const subject = "🔐 Verify your Email";
  const html = 
    `<h2>Hello 👋</h2>
    <p>Your OTP code is:</p>
    <h1 style="color: purple;">${otp}</h1>
    <p>This code expires in <strong>10 minutes</strong>.</p>`
  ;

  await sendMail({ to, subject, html });
};