import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://ayushchhipa-codes.onrender.com", 
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/api/contact", cors());

app.use(express.json());

// ✅ Route only for sending email
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message,token } = req.body;

     const secret = "ES_c19ee4bbd642454081502105356acf19";
  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `response=${token}&secret=${secret}`,
  });

  const captchaResult = await response.json();
  if (!captchaResult.success) {
    return res.status(400).json({ success: false, message: "Captcha verification failed ❌" });
  }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Request",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully ✅" });
  } catch (error) {
    console.error("❌ Email error:", error); // <-- yaha dikhega kya galti hai
    res.status(500).json({ success: false, message: "Error sending message ❌", error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
