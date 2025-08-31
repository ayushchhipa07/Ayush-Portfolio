import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaCheckCircle, FaChevronUp, FaEnvelope, FaExclamationTriangle, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const showToastNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      showToastNotification("⚠️ Please verify you are human!", "error");
      return;
    }
    
    setStatus("Sending...");
    console.log("Form submitted:", formData, token);
    captchaRef.current.resetCaptcha();
    setToken(null);

    try {
      const res = await axios.post("https://ayush-portfolio-1.onrender.com/api/contact", formData);
      if (res.data.success) {
        setStatus("✅ Submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
        showToastNotification("✅ Message sent successfully!", "success");
        setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
      showToastNotification("❌ Failed to send message. Please try again.", "error");
    }
  };

  const isSuccess = status.startsWith("✅");
  const isError = status.startsWith("❌");

  return (
    <div className="relative min-h-screen bg-dark-bg pt-14 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary-text"
        >
          <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Contact</span> Me
        </motion.h2>

        {/* Centered Form */}
        <div className="flex justify-center">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 w-full max-w-2xl"
          >
            {/* Form Container with Glassmorphism */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-8">
              {/* Name + Email in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-text mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-primary-text placeholder-secondary-text/60 rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition-all duration-300 group-hover:border-white/20"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/0 to-brand-secondary/0 group-hover:from-brand-accent/5 group-hover:to-brand-secondary/5 transition-all duration-300 pointer-events-none"></div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-primary-text placeholder-secondary-text/60 rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition-all duration-300 group-hover:border-white/20"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/0 to-brand-secondary/0 group-hover:from-brand-accent/5 group-hover:to-brand-secondary/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Message */}
              <div className="relative group mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-secondary-text mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-primary-text placeholder-secondary-text/60 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition-all duration-300 group-hover:border-white/20 resize-none"
                  required
                ></textarea>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/0 to-brand-secondary/0 group-hover:from-brand-accent/5 group-hover:to-brand-secondary/5 transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* hCaptcha */}
              <div className="flex justify-center mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <HCaptcha
                    sitekey="7c388a76-d286-486a-8860-96d643ee6464"
                    onVerify={(token) => setToken(token)}
                    ref={captchaRef}
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-brand-accent/25 transition-all duration-300"
                >
                  <FaPaperPlane className="text-sm" />
                  Send Message
                </motion.button>
              </div>
            </div>

            {/* Status */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm rounded-xl px-4 py-3 border ${
                  isSuccess
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : isError
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-white/5 border-white/10 text-secondary-text"
                }`}
              >
                {status}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
              toastType === "success"
                ? "bg-emerald-500/90 border-emerald-400/30 text-white"
                : "bg-rose-500/90 border-rose-400/30 text-white"
            }`}
          >
            {toastType === "success" ? (
              <FaCheckCircle className="text-lg" />
            ) : (
              <FaExclamationTriangle className="text-lg" />
            )}
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-10 mt-10">
        <hr className="max-w-6xl mx-auto border-white/10" />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="flex md:justify-start gap-4">
              <a
                href="mailto:ayushchhipa7@gmail.com"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://github.com/ayushchhipa07"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-chhipa/"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
            <span className="text-secondary-text text-center">Copyright © 2025 a portfolio website by Ayush.</span>
            <div className="flex md:justify-end gap-4">
              {/* Scroll to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
              >
                <FaChevronUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
