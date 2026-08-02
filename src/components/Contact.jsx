import { ArrowUp, CheckCircle2, Github, Linkedin, Mail, MapPin, Send, TriangleAlert } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";

const HCaptcha = lazy(() => import("@hcaptcha/react-hcaptcha"));

const contactLinks = [
  { icon: Mail, label: "Email", value: "ayushchhipa7@gmail.com", href: "mailto:ayushchhipa7@gmail.com" },
  { icon: Github, label: "GitHub", value: "ayushchhipa07", href: "https://github.com/ayushchhipa07" },
  { icon: Linkedin, label: "LinkedIn", value: "ayush-chhipa", href: "https://www.linkedin.com/in/ayush-chhipa/" },
  { icon: MapPin, label: "Location", value: "Jaipur, Rajasthan", href: "#contact" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [token, setToken] = useState(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState(null);
  const captchaRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const prepareCaptcha = () => setCaptchaReady(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaReady) {
      setCaptchaReady(true);
      showToast("Please complete the human verification before sending.", "error");
      return;
    }

    if (!token) {
      showToast("Please verify that you are human.", "error");
      return;
    }

    setStatus("Sending message...");

    try {
      const response = await fetch("https://ayush-portfolio-1.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("Message sent successfully.");
        setFormData({ name: "", email: "", message: "" });
        showToast("Message sent successfully.");
      } else {
        throw new Error("Contact API did not return success.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      captchaRef.current?.resetCaptcha();
      setToken(null);
      window.setTimeout(() => setStatus(""), 3500);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="section-shell pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Contact</div>
          <h2 id="contact-heading" className="section-title">Have a project idea? Let us build it properly.</h2>
          <p className="section-copy mx-auto">
            Send me a message for websites, dashboards, product improvements,
            backend features, or full-stack development work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">Let us connect</h3>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
              I usually respond with a clear next step, timeline idea, and the
              technical direction that fits your project.
            </p>

            <div className="mt-8 space-y-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-analytics={`contact-${item.label.toLowerCase()}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                    <item.icon size={19} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="block break-all font-black text-slate-950 dark:text-white">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-label="Contact Ayush Chhipa"
            className="glass-panel rounded-[2rem] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={prepareCaptcha}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={prepareCaptcha}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                onFocus={prepareCaptcha}
                placeholder="Tell me what you want to build..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                required
              />
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.04]">
              {captchaReady ? (
                <Suspense
                  fallback={
                    <p className="px-2 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      Loading verification...
                    </p>
                  }
                >
                  <HCaptcha
                    sitekey="7c388a76-d286-486a-8860-96d643ee6464"
                    onVerify={(captchaToken) => setToken(captchaToken)}
                    ref={captchaRef}
                  />
                </Suspense>
              ) : (
                <button
                  type="button"
                  onClick={prepareCaptcha}
                  className="w-full rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:text-slate-300 dark:hover:text-cyan-300"
                >
                  Load human verification
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                data-analytics="contact-submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-300 transition hover:bg-cyan-700 dark:bg-white dark:text-slate-950 dark:shadow-cyan-950/30"
              >
                <Send size={17} />
                Send Message
              </button>
              {status && (
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400" aria-live="polite">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white/60 px-4 py-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Copyright 2026 Ayush Chhipa. Built with React, Tailwind CSS, and care.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:-translate-y-1 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </footer>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${
            toast.type === "error" ? "bg-rose-600" : "bg-emerald-600"
          }`}
        >
          {toast.type === "error" ? <TriangleAlert size={18} /> : <CheckCircle2 size={18} />}
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Contact;
