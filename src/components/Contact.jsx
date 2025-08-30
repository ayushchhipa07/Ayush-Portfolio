import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaChevronUp, FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
   const [token, setToken] = useState(null);
   const captchaRef = useRef(null);

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!token) {
      alert("⚠️ Please verify you are human!");
      return;
    }
    setStatus("Sending...");
     console.log("Form submitted:", formData, token);
    captchaRef.current.resetCaptcha();
    setToken(null);

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.data.success) {
        setStatus("✅ Submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
         setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
    }
  };

  const isSuccess = status.startsWith("✅");
  const isError = status.startsWith("❌");

  return (
  <div
    className="min-h-screen bg-dark-secondary pt-20 px-4"
    style={{ backgroundImage: "url('/assets/contact-bg.png')" }}
  >
    <div className="max-w-6xl mx-auto w-full">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-10 text-light-text">
        Contact Me
      </h2>

      {/* Centered Form */}
      <div className="flex justify-center">
  <motion.form
    onSubmit={handleSubmit}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="space-y-6 w-full max-w-2xl"
  >
    {/* Name + Email in 2 columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="sr-only">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-dark-bg border border-white/10 text-primary-text placeholder-secondary-text rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="sr-only">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-dark-bg border border-white/10 text-primary-text placeholder-secondary-text rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          required
        />
      </div>
    </div>

    {/* Message */}
    <div>
      <label htmlFor="message" className="sr-only">
        Your Message
      </label>
      <textarea
        id="message"
        rows="6"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-dark-bg border border-white/10 text-primary-text placeholder-secondary-text rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-brand-accent"
        required
      ></textarea>
    </div>

{/* hCaptcha */}
<div style={{ textAlign: "-webkit-center" }}>
  <HCaptcha
    sitekey="ES_c19ee4bbd642454081502105356acf19"
    onVerify={(token) => setToken(token)}
    ref={captchaRef}
  />
</div>

    {/* Button */}
<div style={{ textAlign: "-webkit-center" }}>
    <motion.button
      type="submit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full bg-brand-accent hover:brightness-110 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
     style={{width: "33%"}}>
      <FaPaperPlane />
      Send Message
    </motion.button>
</div>


    {/* Status */}
    {status && (
      <div
        className={`text-sm rounded-lg px-4 py-3 border mt-2 ${
          isSuccess
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : isError
            ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
            : "bg-white/5 border-white/10 text-secondary-text"
        }`}
      >
        {status}
      </div>
    )}
  </motion.form>
</div>
    </div>

    {/* Footer */}
    <br />
    <hr className="max-w-6xl FooterHr" />
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3 items-start">
        <div className="flex md:justify-start gap-4">
          <a
            href="mailto:ayushchhipa7@gmail.com"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-chhipa/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text"
          >
            <FaLinkedin />
          </a>
        </div>
        <span>Copyright © 2025 a portfolio website by Ayush.</span>
        <div className="flex md:justify-end gap-4">
          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:text-light-text"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default Contact;
