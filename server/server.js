import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
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

    console.log("📩 Contact form data:", req.body); // debug

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Request",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("✅ Email sent:", info.response);

    res.status(200).json({ success: true, message: "Message sent successfully ✅" });
  } catch (error) {
    console.error("❌ Email error:", error); // <-- yaha dikhega kya galti hai
    res.status(500).json({ success: false, message: "Error sending message ❌", error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
