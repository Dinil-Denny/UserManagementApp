import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendOtpEmail = async (otp: string, email: string) => {
  //configure mail transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  //Email details
  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: "Email OTP verification",
    html: `<p>Enter <strong>${otp}</strong> to verify your account(OTP expires in 5 mins)</p>`,
  };
  console.log("transporter ready to send mail");
  await transporter.sendMail(mailOptions);
  console.log("transporter send mail");
};

export default sendOtpEmail;
