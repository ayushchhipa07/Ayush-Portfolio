import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "https://ayushchhipa-codes.onrender.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  maxAge: 86400,
};

const requiredEnv = ["EMAIL_USER", "EMAIL_PASS", "HCAPTCHA_SECRET"];
const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);
const cleanText = (value, maxLength) =>
  String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, maxLength);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.use(cors(corsOptions));
app.options("/api/contact", cors(corsOptions));
app.use(express.json({ limit: "20kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const missingEnv = getMissingEnv();
    if (missingEnv.length > 0) {
      console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
      return res.status(500).json({ success: false, message: "Contact service is not configured." });
    }

    const name = cleanText(req.body.name, 80);
    const email = cleanText(req.body.email, 120).toLowerCase();
    const message = cleanText(req.body.message, 2000);
    const token = cleanText(req.body.token, 2000);

    if (!name || !isEmail(email) || message.length < 10 || !token) {
      return res.status(400).json({ success: false, message: "Please provide valid contact details." });
    }

    const captchaParams = new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET,
      response: token,
    });

    const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: captchaParams,
    });

    if (!captchaResponse.ok) {
      throw new Error("hCaptcha verification request failed.");
    }

    const captchaResult = await captchaResponse.json();
    if (!captchaResult.success) {
      return res.status(400).json({ success: false, message: "Captcha verification failed." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ayush Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({ success: false, message: "Error sending message." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
